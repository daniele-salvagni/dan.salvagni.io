// Dependencies --------------------------------------------------------------------------

// Common
let argv = require('minimist')(process.argv.slice(2));
let path = require('path');
let gulp = require('gulp');

// Metalsmith
let Metalsmith = require('metalsmith'); // Plugins are included from config.js

// Configuration
let config = require('./config');

// Sass
let sass      = require('gulp-sass');
let normalize = require('node-normalize-scss'),
    bourbon   = require('bourbon'),
    neat      = require('bourbon-neat');

// Template
let handlebars = require('handlebars'),
    layouts = require('handlebars-layouts');
handlebars.registerHelper(layouts(handlebars));

// Configuration
let args = {
  build: !!argv.build,
  production: !!argv.production
};


// Metalsmith task -----------------------------------------------------------------------

function setupMetalsmith(callback) {
  let ms = new Metalsmith(process.cwd());
  let msconfig = config.metalsmith || {};
  let msplugins = msconfig.plugins || {};

  ms.source(msconfig.config.contentRoot);
  ms.destination(msconfig.config.destRoot);
  ms.metadata(msconfig.metadata);

  // Load all plugins with the respective configuration
  Object.keys(msplugins).forEach(function(key) {
    let plugin = require(key);
    let options = msplugins[key];

    // Some plugins can be enabled only in production by using:
    // '_metalsmith_if': 'production',
    if (options._metalsmith_if !== undefined) {
      let condition = false;
      if (options._metalsmith_if === 'production') {
        condition = argv.production;
      } else if (options._metalsmith_if === 'build') {
        condition = argv.build;
      }

      if (condition) {
        options._metalsmith_if = undefined;
        delete options._metalsmith_if;
        ms.use(plugin(options));
      }
    } else {
      // '_metalsmith_if' is not set
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


// Styles task ---------------------------------------------------------------------------

gulp.task('styles', function() {
  return gulp.src(path.join(__dirname, config.metalsmith.config.styleRoot, 'main.scss'))
    .pipe(sass({
      sourceComments: args.production ? false : true,
      outputStyle: args.production ? 'compressed' : 'expanded',
      includePaths: []
        .concat(config.styles.include)
        .concat(normalize.includePaths)
        .concat(bourbon.includePaths)
        .concat(neat.includePaths),
      errLogToConsole: true,
      onError: console.log
    }))
    //.pipe(autoprefixer({
    //  browsers: config.styles.prefix,
    //  cascade: false
    //}))
    .pipe(gulp.dest(path.join(__dirname, config.metalsmith.config.destRoot, 'assets')));
});


// Default task --------------------------------------------------------------------------

gulp.task('default', ['styles', 'metalsmith']);


// Server task ---------------------------------------------------------------------------

gulp.task('server', ['default'], function(callback) {
  let http = require('http');
  let serveStatic = require('serve-static');
  let finalhandler = require('finalhandler');

  let serve = serveStatic(config.metalsmith.config.destRoot, {
    "index": ['index.html', 'index.htm'],
    "maxAge": 0
  });

  let server = http.createServer(function(req, res){
    let done = finalhandler(req, res);
    serve(req, res, done);
  })

  let serverPort = 5555;
  if (argv.port) {
    serverPort = parseInt(argv.port);
  }

  server.listen(serverPort, function() {
    console.log('Server: http://localhost:%s', serverPort);
    callback();
  });
});
