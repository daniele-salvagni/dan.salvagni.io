---
title: Hosting comments on GitHub for static websites
date: 2017-07-22
author: Daniele Salvagni
collection: blog
excerpt: How I'm hosting comments on GitHub for my static website with Vue.js and GitHub APIs
layout: article.hbs
draft: false
issue: 1
---
I was in the middle of the development of my new website when I decided that I wanted to allow comments on my posts. That's not an easy task if like me you have decided to go for a static website as you would need some sort of backend on a different server or to rely on a third party service. I started looking for various options, from services like Disqus which didn't give me the flexibility I wanted to a combination of AWS services like Lambda + SNS + Google OAuth which would have been way too complicated for something like this, until I figured: why don't I use GitHub issues? I already have a repository for this website hosted there, I'd just need to to fetch the comments in Javascript using the GitHub APIs, plus almost everyone to whom this blog is addressed has a GitHub account.

In this post I will show you how to host comments with GitHub issues, I will try to give you a general idea and some examples so you will be able to implement it for any static site.

<p style="text-align:center;"><svg style="height: 6em;" xmlns="http://www.w3.org/2000/svg" viewBox="-0.2 -1 379 334">
 <path id="puddle" fill="#9CDAF1" d="m296.94 295.43c0 20.533-47.56 37.176-106.22 37.176-58.67 0-106.23-16.643-106.23-37.176s47.558-37.18 106.23-37.18c58.66 0 106.22 16.65 106.22 37.18z"/>
 <g id="shadow-legs" fill="#7DBBE6">
  <path d="m161.85 331.22v-26.5c0-3.422-.619-6.284-1.653-8.701 6.853 5.322 7.316 18.695 7.316 18.695v17.004c6.166.481 12.534.773 19.053.861l-.172-16.92c-.944-23.13-20.769-25.961-20.769-25.961-7.245-1.645-7.137 1.991-6.409 4.34-7.108-12.122-26.158-10.556-26.158-10.556-6.611 2.357-.475 6.607-.475 6.607 10.387 3.775 11.33 15.105 11.33 15.105v23.622c5.72.98 11.71 1.79 17.94 2.4z"/>
  <path d="m245.4 283.48s-19.053-1.566-26.16 10.559c.728-2.35.839-5.989-6.408-4.343 0 0-19.824 2.832-20.768 25.961l-.174 16.946c6.509-.025 12.876-.254 19.054-.671v-17.219s.465-13.373 7.316-18.695c-1.034 2.417-1.653 5.278-1.653 8.701v26.775c6.214-.544 12.211-1.279 17.937-2.188v-24.113s.944-11.33 11.33-15.105c0-.01 6.13-4.26-.48-6.62z"/>
 </g>
 <path id="cat" d="m378.18 141.32l.28-1.389c-31.162-6.231-63.141-6.294-82.487-5.49 3.178-11.451 4.134-24.627 4.134-39.32 0-21.073-7.917-37.931-20.77-50.759 2.246-7.25 5.246-23.351-2.996-43.963 0 0-14.541-4.617-47.431 17.396-12.884-3.22-26.596-4.81-40.328-4.81-15.109 0-30.376 1.924-44.615 5.83-33.94-23.154-48.923-18.411-48.923-18.411-9.78 24.457-3.733 42.566-1.896 47.063-11.495 12.406-18.513 28.243-18.513 47.659 0 14.658 1.669 27.808 5.745 39.237-19.511-.71-50.323-.437-80.373 5.572l.276 1.389c30.231-6.046 61.237-6.256 80.629-5.522.898 2.366 1.899 4.661 3.021 6.879-19.177.618-51.922 3.062-83.303 11.915l.387 1.36c31.629-8.918 64.658-11.301 83.649-11.882 11.458 21.358 34.048 35.152 74.236 39.484-5.704 3.833-11.523 10.349-13.881 21.374-7.773 3.718-32.379 12.793-47.142-12.599 0 0-8.264-15.109-24.082-16.292 0 0-15.344-.235-1.059 9.562 0 0 10.267 4.838 17.351 23.019 0 0 9.241 31.01 53.835 21.061v32.032s-.943 11.33-11.33 15.105c0 0-6.137 4.249.475 6.606 0 0 28.792 2.361 28.792-21.238v-34.929s-1.142-13.852 5.663-18.667v57.371s-.47 13.688-7.551 18.881c0 0-4.723 8.494 5.663 6.137 0 0 19.824-2.832 20.769-25.961l.449-58.06h4.765l.453 58.06c.943 23.129 20.768 25.961 20.768 25.961 10.383 2.357 5.663-6.137 5.663-6.137-7.08-5.193-7.551-18.881-7.551-18.881v-56.876c6.801 5.296 5.663 18.171 5.663 18.171v34.929c0 23.6 28.793 21.238 28.793 21.238 6.606-2.357.474-6.606.474-6.606-10.386-3.775-11.33-15.105-11.33-15.105v-45.786c0-17.854-7.518-27.309-14.87-32.3 42.859-4.25 63.426-18.089 72.903-39.591 18.773.516 52.557 2.803 84.873 11.919l.384-1.36c-32.131-9.063-65.692-11.408-84.655-11.96.898-2.172 1.682-4.431 2.378-6.755 19.25-.80 51.38-.79 82.66 5.46z"/>
 <path id="face" fill="#F4CBB2" d="m258.19 94.132c9.231 8.363 14.631 18.462 14.631 29.343 0 50.804-37.872 52.181-84.585 52.181-46.721 0-84.589-7.035-84.589-52.181 0-10.809 5.324-20.845 14.441-29.174 15.208-13.881 40.946-6.531 70.147-6.531 29.07-.004 54.72-7.429 69.95 6.357z"/>
 <path id="eyes" fill="#FFF" d="m160.1 126.06 c0 13.994-7.88 25.336-17.6 25.336-9.72 0-17.6-11.342-17.6-25.336 0-13.992 7.88-25.33 17.6-25.33 9.72.01 17.6 11.34 17.6 25.33z m94.43 0 c0 13.994-7.88 25.336-17.6 25.336-9.72 0-17.6-11.342-17.6-25.336 0-13.992 7.88-25.33 17.6-25.33 9.72.01 17.6 11.34 17.6 25.33z"/>
 <g fill="#AD5C51">
   <path id="pupils" d="m154.46 126.38 c0 9.328-5.26 16.887-11.734 16.887s-11.733-7.559-11.733-16.887c0-9.331 5.255-16.894 11.733-16.894 6.47 0 11.73 7.56 11.73 16.89z m94.42 0 c0 9.328-5.26 16.887-11.734 16.887s-11.733-7.559-11.733-16.887c0-9.331 5.255-16.894 11.733-16.894 6.47 0 11.73 7.56 11.73 16.89z"/>
   <circle id="nose" cx="188.5" cy="148.56" r="4.401"/>
   <path id="mouth" d="m178.23 159.69c-.26-.738.128-1.545.861-1.805.737-.26 1.546.128 1.805.861 1.134 3.198 4.167 5.346 7.551 5.346s6.417-2.147 7.551-5.346c.26-.738 1.067-1.121 1.805-.861s1.121 1.067.862 1.805c-1.529 4.324-5.639 7.229-10.218 7.229s-8.68-2.89-10.21-7.22z"/>
 </g>
 <path id="octo" fill="#C3E4D8" d="m80.641 179.82 c0 1.174-1.376 2.122-3.07 2.122-1.693 0-3.07-.948-3.07-2.122 0-1.175 1.377-2.127 3.07-2.127 1.694 0 3.07.95 3.07 2.13z m8.5 4.72 c0 1.174-1.376 2.122-3.07 2.122-1.693 0-3.07-.948-3.07-2.122 0-1.175 1.377-2.127 3.07-2.127 1.694 0 3.07.95 3.07 2.13z m5.193 6.14 c0 1.174-1.376 2.122-3.07 2.122-1.693 0-3.07-.948-3.07-2.122 0-1.175 1.377-2.127 3.07-2.127 1.694 0 3.07.95 3.07 2.13z m4.72 7.08 c0 1.174-1.376 2.122-3.07 2.122-1.693 0-3.07-.948-3.07-2.122 0-1.175 1.377-2.127 3.07-2.127 1.694 0 3.07.95 3.07 2.13z m5.188 6.61 c0 1.174-1.376 2.122-3.07 2.122-1.693 0-3.07-.948-3.07-2.122 0-1.175 1.377-2.127 3.07-2.127 1.694 0 3.07.95 3.07 2.13z m7.09 5.66 c0 1.174-1.376 2.122-3.07 2.122-1.693 0-3.07-.948-3.07-2.122 0-1.175 1.377-2.127 3.07-2.127 1.694 0 3.07.95 3.07 2.13z m9.91 3.78 c0 1.174-1.376 2.122-3.07 2.122-1.693 0-3.07-.948-3.07-2.122 0-1.175 1.377-2.127 3.07-2.127 1.694 0 3.07.95 3.07 2.13z m9.87 0 c0 1.174-1.376 2.122-3.07 2.122-1.693 0-3.07-.948-3.07-2.122 0-1.175 1.377-2.127 3.07-2.127 1.694 0 3.07.95 3.07 2.13z m10.01 -1.64 c0 1.174-1.376 2.122-3.07 2.122-1.693 0-3.07-.948-3.07-2.122 0-1.175 1.377-2.127 3.07-2.127 1.694 0 3.07.95 3.07 2.13z"/>
 <path id="drop" fill="#9CDAF1" d="m69.369 186.12l-3.066 10.683s-.8 3.861 2.84 4.546c3.8-.074 3.486-3.627 3.223-4.781z"/>
</svg></p>

## Analyzing GitHub's issue tracker

We will have to manually create a new issue for each post we make, this could be automated but in my opinion it isn't quite worth the effort. If you haven't yet, GitHub issues can be enabled in the repository settings and they will all share the same **base URL** (`https://github.com/daniele-salvagni/dan.salvagni.io/issues/` in my case) followed by a **progressive ID** of the specific issue. As an example, the ID of the issue relative this post is `1`.

[**GitHub's API**](https://developer.github.com/v3/issues/) give us a nice way to get all the comments relative to an issue. Here is all we need to know:

- All API requests will be made to the `https://api.github.com` base URL
- Comments can be retrieved with a **GET** request to the `/repos/:owner/:repo/issues/:number/comments` endpoint: https://developer.github.com/v3/issues/comments/
- We need to set the `Accept` **header** to `application/vnd.github.VERSION.html+json` in order to get a rendered version of the comments (instead of plain Markdown): https://developer.github.com/v3/media/#request-specific-version

Here is an example of how the request should look like:

```http
Request URL:
https://api.github.com/repos/daniele-salvagni/dan.salvagni.io/issues/1/comments
Request Method: GET
Accept: application/vnd.github.VERSION.html+json
```

Here is a gist containing the response: [response.json](https://gist.github.com/daniele-salvagni/63275d66bce137d57a5c6c495dd5f877)



## Adding an issue ID to our posts

I'm using [Metalsmith](https://github.com/segmentio/metalsmith) to generate this website but it won't matter too much as most static site generators will possess a way to include arbitrary metadata in a specific page, we want to put our issue ID there. In Metalsmith you tipically use markdown files to write the content of the pages with some YAML-front-matter information. The header of this blog post source looks something like this:

```yaml
---
title: Hosting comments on GitHub for static websites
collection: blog
layout: article.hbs
issue: 1
---
Lorem ipsum dolor sit...
```

We can now use this ID in our semantic template engine ([Handlebars](http://handlebarsjs.com/) in my case) to link the users to the correct issue page:

```html
Want to leave a comment? Visit
<a href="https://github.com/daniele-salvagni/dan.salvagni.io/issues/{{issue}}">
  this post's issue page
</a>
on GitHub, it will show up here!
```



## Retrieving the comments with Javascript

This can be done in many ways, you could make an [XHR](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and render it with just vanilla javascript or use [jQuery.ajax()](http://api.jquery.com/jquery.ajax/) if you are already using jQuery on your website. Loading jQuery just for this isn't probably worth it, I suggest something like the [axios](https://github.com/mzabriskie/axios) library instead (the one I'm using here) if you don't want to deal manually with `XMLHttpRequest`.


### About the Same Origin Policy

The [Same Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy) is a security mechanism to prevent a potentially malicious script loaded from one origin (domain) to interact with a resource from another origin (thus obtaining access to sensitive data).

The most common way to "bypass" this mechanism has always been to use [JSONP](http://en.wikipedia.org/wiki/JSONP) (and that's what I did try initially), the problem is that JSONP doesn't allow us to set a **custom header** to our requests. This is required by the GitHub APIs to set the HTML [media type](https://developer.github.com/v3/media/) (by using `application/vnd.github.VERSION.html+json`) in order to return the HTML rendered from the comments markdown instead of just the raw data (otherwise we would need to render the Markdown ourselves).

However, GitHub supports the [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) mechanism which enables cross-domain data transfers. Until some time ago you had to register your website as an OAuth application on GitHub (as I found out on [this post](http://ivanzuzak.info/2011/02/18/github-hosted-comments-for-github-hosted-blogs.html) by Ivan), however **CORS is now enabled for any origin**.

<br>

After this little digression let's get back to Javascript! Here is how we would get all the comments (for examples with the axios library):

```javascript
let issueNum = 1; // Retrieve the issue number for your post here

let instance = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 5000,
    // Set the correct media type
    headers: {'Accept': 'application/vnd.github.VERSION.html+json'}
});

instance.get('/repos/daniele-salvagni/dan.salvagni.io/issues/'
    + issueNum + '/comments')
.then(response => console.log(response.data))
.catch(function (error) {
  console.log(error);
});
```

This will print in our console a list of objects, each containing all the data relative to a comment. Now you just need to iterate on `response.data` and render the HTML. I'll give you a brief idea on how I'm doing this with Vue in a moment. The following is a list of some properties you will most likely need, `data` being the list of objects you received as a response:

```javascript
data[i].body_html: "The comment body rendered in HTML"
data[i].created_at: "The timestamp of the comment"
data[i].user.login: "The username of the comment author"
data[i].user.avatar_url: "The profile picture of the comment author"
data[i].user.html_url: "The GitHub profile URL of the comment author"
```

You can resize the avatar by appending `&s=[size]` to the URL (replace `[size]` to a number of pixels like `100`).



## Rendering the HTML with Vue

I'm rendering the comments with [Vue.JS](https://vuejs.org/) (you don't need to!) mainly because I was already familiar with Angular and I wanted to finally try it out after all the hype, plus it makes for a faster development while being easier to maintain than plain Javascript with a bunch of HTML in it thanks to the Model-View separation, I also plan to use it more extensively in the future.

In Vue I'm just adding the response from the axios call mentioned before as property to the data object. Then it is easy to iterate over the comments with a `v-for` directive.

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
            {{comment.user.login}}</a> commented on {{ comment.created_at }}
        </div>
        <!--Render the raw html of the comment body -->
        <div class="comment-body" v-html="comment.body_html"></div>
    </div>
{{{{/raw}}}}
    <div class="comment-write"><strong>Want to leave a comment?</strong>
    Visit <a href="{{site.issuePage}}{{issue}}">this post's issue page</a>
    on GitHub, it will show up here!</div>
{{/if}}
</div>
```

That's it, GitHub's API are doing all the work and it should be fairly simple to replicate this for any static site.
