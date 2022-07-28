---
layout: '../../layouts/SoftPost.astro'
collection: soft
order: 2

author: Daniele Salvagni
title: About this Website
description: Statically generated with Astro.js.
publishDate: 2022-07-28

excerpt:
  ColorGoggles is an extremely lightweight application that automatically
  manages your digital saturation when playing games to enhance visibility. This
  is an alternative to VibranceGUI for Intel HD Graphics or dual-graphics
  laptops.
---

This website is statically generated thanks to **Astro**, a new (1.0.0-rc.1 at
the moment) all-in-one web framework for building fast, content-focused
websites. Here are some of its features:

- **Component Islands**: Interactive UI component on an otherwise static page of
  HTML.
- **Server-first API design**: Astro renders directly to HTML & CSS, eliminating
  heavy JavaScript automatically.
- **Zero JS, by default**: No JavaScript runtime overhead.
- **Edge-ready**: Deploy anywhere, even a global edge runtime like Deno or
  Cloudflare.
- **UI-agnostic**: Supports React, Preact, Svelte, Vue, Solid, Lit and more.

The folder structure of this website looks something like this:

```
.
├── public/
│   └── assets
└── src/
    ├── components/
    ├── layouts/
    ├── pages/
    ├── scripts/
    └── style/
```

[Astro](https://astro.build/) looks for `.astro` or `.md` files in the
`/src/pages/` directory. Each page is exposed as a route based on its file name.
If the page has brackets in it's name it's a
[dynamic route](https://docs.astro.build/en/core-concepts/routing/).

`src/components/` is where I put anything that I want to re-use inside pages.
All client side JS is put into the `/scripts/` folder.

All global styles are in `/styles/` and written with
[SASS](https://sass-lang.com/). Individual page or component styles are in each
page or component file inside the `<style>` tags.

Every time a commit is pushed,
[GitHub Actions](https://github.com/features/actions) will build and deploy the
website to an [AWS S3](https://aws.amazon.com/s3/) bucket.

Source code: https://github.com/daniele-salvagni/dan.salvagni.io

## Old stack

The stack mentioned above is replacing the following one:

> [Gulp](http://gulpjs.com/) is used to automate the build process. The base of
> the site generator is [Metalsmith](http://www.metalsmith.io/), the stylesheets
> are compiled from SASS using the [Bourbon](http://bourbon.io/) library and
> [Neat](https://neat.bourbon.io/) for the responsive grid. Templates are
> written with [Handlebars](http://handlebarsjs.com/) and the content in
> Markdown with YAML frontmatter. Comments to the blog posts are retrieved from
> this repository's issue page using GitHub's API and rendered using
> [Vue.js](https://vuejs.org).
>
> After a succesful build the website is automatically deployed by
> [Travis](https://travis-ci.org/) on an [AWS S3](https://aws.amazon.com/s3/)
> bucket.
>
> Last commit with the old stack on Github:
> [49d02f4](https://github.com/daniele-salvagni/dan.salvagni.io/tree/8683abe17b23604994093feea37b9d0b1656da4d)

<style>
.badges {
    text-align: center;
    margin: 1em 0;
}

.badges img {
    display:inline-block;
}
</style>
