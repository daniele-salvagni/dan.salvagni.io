<p align="center"><img src="https://user-images.githubusercontent.com/6751621/28732267-8cbce218-73d7-11e7-865b-7693b35adf99.png"></p>

-----

# dan.salvagni.io [![Build Status](https://travis-ci.org/daniele-salvagni/dan.salvagni.io.svg?branch=master)](https://travis-ci.org/daniele-salvagni/dan.salvagni.io)

Source code of my personal website http://dan.salvagni.io

[Gulp](http://gulpjs.com/) is used to automatize the build process.
The base of the site generator is [Metalsmith](http://www.metalsmith.io/), the stylesheets are compiled from SASS using the [Bourbon](http://bourbon.io/) library and [Neat](https://neat.bourbon.io/) for the responsive grid.
Templates are written with [Handlebars](http://handlebarsjs.com/) and the content in Markdown with YAML metadata.
Comments to the blog posts are retrieved from this repository's issue page using GitHub's API and rendered using [Vue.js](https://vuejs.org).

After a succesful build the website is automatically deployed by [Travis](https://travis-ci.org/) on an [AWS S3 Bucket](https://aws.amazon.com/s3/).
