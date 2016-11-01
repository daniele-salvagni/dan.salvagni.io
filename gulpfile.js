// Common
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');
var Metalsmith = require('metalsmith');

// Assets
var sass     = require('gulp-sass');
var bourbon  = require('node-bourbon'),
    neat     = require('node-neat');

// Template
var handlebars = require('handlebars'),
    layouts = require('handlebars-layouts');
handlebars.registerHelper(layouts(handlebars));
