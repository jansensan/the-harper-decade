var config = require('../gulp-config')().inject,
  gulp = require('gulp'),
  lazypipe = require('lazypipe'),
  wiredep = require('wiredep').stream,
  glp = require('gulp-load-plugins')({lazy: true});


// tasks
gulp.task('inject', injectHtml);


// method definitions
function injectHtml() {
  var appSources = gulp.src(config.js.app.sources);
  var cssSources = gulp.src(config.css.files);
  var templatesSources = gulp.src(config.js.templates.files);

  var buildHtml = lazypipe()
    // js libs
    .pipe(wiredep)

    // js src app
    .pipe(glp.inject, appSources)

    // css
    .pipe(glp.inject, cssSources, config.css.options)

    // templates
    .pipe(glp.inject,
      gulp.src(config.js.templates.files)
      .pipe(glp.minifyHtml({
        empty: true
      }))
      .pipe(glp.angularTemplatecache(
        config.js.templates.templateCache.file,
        config.js.templates.templateCache.options
      ))
      .pipe(gulp.dest(config.js.templates.templateCache.dest)),
      config.js.templates.options
    );

  return gulp.src(config.htmlSource)
    .pipe(buildHtml())
    .pipe(gulp.dest(config.tempDir));
}