// Dependencies ==========================================================================

// Common
var gulp = require('gulp'),
var path = require('path'),
var argv = require('minimist')(process.argv.slice(2));

// Metalsmith
var Metalsmith = require('metalsmith'); // Plugins are included from config.js

// Sass
var sass     = require('gulp-sass');
var bourbon  = require('node-bourbon'),
    neat     = require('node-neat');

// Template
var handlebars = require('handlebars'),
    layouts = require('handlebars-layouts');
handlebars.registerHelper(layouts(handlebars));

// Configuration
var args = {
  build: !!argv.build,
  production: !!argv.production
};


// Metalsmith task =======================================================================

function setupMetalsmith(callback) {
  var ms = new Metalsmith(process.cwd());
  var msconfig = site.metalsmith || {};
  var msplugins = msconfig.plugins || {};

  ms.source(msconfig.config.contentRoot);
  ms.destination(msconfig.config.destRoot);
  ms.metadata(msconfig.metadata);

  Object.keys(msplugins).forEach(function(key) {
    var plugin = require(key);
    var options = msplugins[key];

    // Some plugins can be enabled only in production by using:
    // "_metalsmith_if": "production",
    if (options._metalsmith_if !== undefined) {
      var condition = false;
      if (options._metalsmith_if === "production") {
        condition = argv.production;
      } else if (options._metalsmith_if === "build") {
        condition = argv.build;
      }

      if (condition) {
        options._metalsmith_if = undefined;
        delete options._metalsmith_if;
        ms.use(plugin(options));
      }
    } else {
      ms.use(plugin(options));
    }
  });

  ms.build(function(err) {
    if (err) {
      console.log(err);
      return callback(err);
    }

    callback();
  });
};

gulp.task('metalsmith', function(callback) {
  setupMetalsmith(callback);
});


// Styles task ===========================================================================

gulp.task('styles', function() {
  return gulp.src(path.join(__dirname, site.metalsmith.config.styleRoot, 'app.scss'))
    .pipe(sass({
      sourceComments: args.production ? false : true,
      outputStyle: args.production ? 'compressed' : 'expanded',
      includePaths: []
        .concat(site.styles.include)
        .concat(normalize.includePaths)
        .concat(bourbon.includePaths)
        .concat(neat.includePaths),
      errLogToConsole: true,
      onError: console.log
    }))
    //.pipe(autoprefixer({
    //  browsers: site.styles.prefix,
    //  cascade: false
    //}))
    .pipe(gulp.dest(path.join(__dirname, site.metalsmith.config.assetRoot, 'assets')));
});


// Default task ==========================================================================

gulp.task('default', ['styles', 'metalsmith']);
