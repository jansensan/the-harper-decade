var config = require('../gulp-config')().style,
  gulp = require('gulp'),
  glp = require('gulp-load-plugins')({lazy: true});

// tasks
gulp.task('less', compileLESS);

// method definitions
function compileLESS() {
  return gulp
    .src(config.sources)
    .pipe(glp.plumber())
    .pipe(glp.less())
    .pipe(gulp.dest(config.dest));
}