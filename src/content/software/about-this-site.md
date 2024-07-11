---
title: 'About this site'
emoji: 🚧
order: 99

description: |
  Statically generated with Astro, deployed to AWS.
---

This website is statically generated and using **[Astro](https://astro.build/)**
since its 1.0.0-rc.1 version.

```sh
.
├── public/
└── src/
    ├── components/  # components to re-use inside pages
    ├── content/     # collections of content
    ├── layouts/     # page layouts
    ├── pages/       # pages exposed as routes (dynamic routes with [brackets])
    └── style/       # global styles
```

Every time a commit is pushed,
[GitHub Actions](https://github.com/features/actions) will build and deploy this
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
