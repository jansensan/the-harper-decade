var config = require('../gulp-config')().copy,
  gulp = require('gulp');


// tasks
gulp.task('copy:assets', copyAssets);
gulp.task('copy:css', copyCSS);


// method definitions
function copyAssets() {
  return gulp
    .src(config.assets.sources)
    .pipe(gulp.dest(config.assets.dest));
}

function copyCSS() {
  return gulp
    .src(config.css.sources)
    .pipe(gulp.dest(config.css.dest));
}
