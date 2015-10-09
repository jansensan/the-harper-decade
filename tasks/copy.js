var config = require('../gulp-config')().copy,
  gulp = require('gulp');


// tasks
gulp.task('copy:assets', copyAssets);


// method definitions
function copyAssets() {
  return gulp
    .src(config.sources)
    .pipe(gulp.dest(config.dest));
}
