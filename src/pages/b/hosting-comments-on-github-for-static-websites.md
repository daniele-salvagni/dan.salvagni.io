---
layout: '../../layouts/BlogPost.astro'
title: Hosting comments on GitHub for static websites
publishDate: 2017-07-22
author: Daniele Salvagni
collection: blog
preview:
  How I'm hosting comments on GitHub for my static website with Vue.js and
  GitHub APIs
issue: 1
heroImage:
  src: '/assets/blog/introducing-astro.jpg'
  alt: 'Space shuttle leaving curved trail in the sky'
---

![Github Comments](/assets/img/content/001/github-comments.png)

I was in the middle of the development of my new website when I decided that I
wanted to allow comments on my posts. That's not an easy task if like me you
have decided to go for a static website as you would need some sort of backend
on a different server or to rely on a third party service. I started looking for
various options, from services like Disqus which didn't give me the flexibility
I wanted, to a combination of AWS services like Lambda + SNS + Google OAuth
which would have been way too complicated for something like this, until I
figured: why don't I use GitHub issues? I already have a repository for this
website hosted there, I'd just need to to fetch the comments in Javascript using
the GitHub APIs, plus almost everyone to whom this blog is addressed has a
GitHub account.

In this post I will show you how to host comments with GitHub issues, I will try
to give you a general idea and some examples so you will be able to implement it
for any static site.

## Analyzing GitHub's issue tracker

We will have to manually create a new issue for each post we make, this could be
automated but in my opinion it isn't quite worth the effort. If you haven't yet,
GitHub issues can be enabled in the repository settings and they will all share
the same **base URL**
(`https://github.com/daniele-salvagni/dan.salvagni.io/issues/` in my case)
followed by a **progressive ID** of the specific issue. As an example, the ID of
the issue relative this post is `1`.

[GitHub's API](https://developer.github.com/v3/issues/) give us a nice way to
get all the comments relative to an issue. Here is all we need to know:

- All API requests will be made to the `https://api.github.com` base URL
- Comments can be retrieved with a **GET** request to the
  `/repos/:owner/:repo/issues/:number/comments` endpoint:
  [Docs](https://developer.github.com/v3/issues/comments/)
- We need to set the `Accept` **header** to
  `application/vnd.github.VERSION.html+json` in order to get a rendered version
  of the comments (instead of plain Markdown):
  [Docs](https://developer.github.com/v3/media/#request-specific-version)

Here is an example of how the request should look like:

```
Request URL:
https://api.github.com/repos/daniele-salvagni/dan.salvagni.io/issues/1/comments
Request Method: GET
Accept: application/vnd.github.VERSION.html+json
```

And here is a gist containing the response:
[response.json](https://gist.github.com/daniele-salvagni/63275d66bce137d57a5c6c495dd5f877)  
as you can see, the comment is already rendered to HTML!

## Adding an issue ID to our posts

I'm using [Metalsmith](https://github.com/segmentio/metalsmith) to generate this
website _(edit: It's 2022, I'm now using Astro and this is all still valid)_ but
it won't matter too much as most static site generators will possess a way to
include arbitrary metadata in a specific page, we want to put our issue ID
there. In Metalsmith you tipically use markdown files to write the content of
the pages with some YAML-front-matter information. The header of this blog post
source looks something like this:

```yaml
---
title: Hosting comments on GitHub for static websites
collection: blog
layout: article.hbs
issue: 1
---
Lorem ipsum dolor sit...
```

We can now use this ID in our semantic template engine
([Handlebars](http://handlebarsjs.com/) in my case) to link the users to the
correct issue page:

```html
Want to leave a comment? Visit
<a href="https://github.com/daniele-salvagni/dan.salvagni.io/issues/{{issue}}">
  this post's issue page
</a>
on GitHub, it will show up here!
```

This will be shown in every post and will link the user to the correct Github
issue.

## Retrieving the comments with Javascript

This can be done in many ways, you could make an
[XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and
render it with just vanilla javascript or use
[jQuery.ajax()](http://api.jquery.com/jquery.ajax/) if you are already using
jQuery on your website. Loading jQuery just for this isn't probably worth it, I
suggest something like the [axios](https://github.com/mzabriskie/axios) library
instead (the one I'm using here) if you don't want to deal manually with
`XMLHttpRequest`.

> ### About the Same Origin Policy
>
> The [Same Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy) is
> a security mechanism to prevent a potentially malicious script loaded from one
> origin (domain) to interact with a resource from another origin (thus
> obtaining access to sensitive data).
>
> The most common way to "bypass" this mechanismF has always been to use
> [JSONP](http://en.wikipedia.org/wiki/JSONP) (and that's what I did try
> initially), the problem is that JSONP doesn't allow us to set a **custom
> header** to our requests. This is required by the GitHub APIs to set the HTML
> [media type](https://developer.github.com/v3/media/) as shown before in order
> to return the HTML rendered from the comments markdown instead of just the raw
> data (otherwise we would need to re-render the Markdown ourselves).
>
> However, GitHub supports the
> [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
> mechanism which enables cross-domain data transfers. Until some time ago you
> had to register your website as an OAuth application on GitHub (as I found out
> thanks to
> [this post](http://ivanzuzak.info/2011/02/18/github-hosted-comments-for-github-hosted-blogs.html)
> by Ivan), however **CORS is now enabled for any origin**.

<br>

After this little digression let's get back to Javascript! Here is how we would
get all the comments (for examples with the axios library):

```javascript
let issueNum = 1; // Retrieve the issue number for your post here

let instance = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  // Set the correct media type
  headers: { Accept: 'application/vnd.github.VERSION.html+json' }
});

instance
  .get(
    '/repos/daniele-salvagni/dan.salvagni.io/issues/' + issueNum + '/comments'
  )
  .then((response) => console.log(response.data))
  .catch(function (error) {
    console.log(error);
  });
```

This will print in our console a list of objects, each containing all the data
relative to a comment. Now we just need to iterate on `response.data` and render
the HTML. I'll give you a brief idea on how I'm doing this with Vue.js in a
moment. The following is a list of some properties you will most likely need,
`data` being the list of objects you received as a response:

```javascript
data[i].body_html: "The comment body rendered in HTML"
data[i].created_at: "The timestamp of the comment"
data[i].user.login: "The username of the comment author"
data[i].user.avatar_url: "The profile picture of the comment author"
data[i].user.html_url: "The GitHub profile URL of the comment author"
```

You can resize the avatar by appending `&s=[size]` to the URL (replace `[size]`
to a number of pixels like `100`).

## Rendering the HTML with Vue

I'm rendering the comments with [Vue.JS](https://vuejs.org/) (you don't need
to!) mainly because I was already familiar with Angular and I wanted to finally
try it out after all the hype, plus it makes for a faster development while
being easier to maintain than plain Javascript with a bunch of HTML in it thanks
to the Model-View separation, I also plan to use it more extensively in the
future.

In Vue I'm just adding the response from the axios call mentioned before as
property to the data object. Then it is easy to iterate over the comments with a
`v-for` directive.

```html
<!-- The VueJS app, notice the issue number stored in the data-issue attribute -->
<div id="comments-app" data-issue="{{issue}}">
  <!-- Render only if the post has an issue number in the metadata -->
  {{#if issue}}
  <!-- Prevent Handlebars from rendering this block (will be rendered by Vue) -->
  {{{{raw}}}}
  <div class="comment" v-for="comment in comments">
    <div class="comment-avatar">
      <img v-bind:src="comment.user.avatar_url + '&s=80'">
    </div>
    <div class="comment-meta">
      <a class="comment-user" v-bind:href="comment.user.html_url">
        {{comment.user.login}}</a
      >
      commented on {{ comment.created_at }}
    </div>
    <!--Render the raw html of the comment body -->
    <div class="comment-body" v-html="comment.body_html"></div>
  </div>
  {{{{/raw}}}}
  <div class="comment-write">
    <strong>Want to leave a comment?</strong> Visit
    <a href="{{site.issuePage}}{{issue}}">this post's issue page</a> on GitHub,
    it will show up here!
  </div>
  {{/if}}
</div>
```

That's it, GitHub's API are doing all the work and it should be fairly simple to
replicate this for any static site.
