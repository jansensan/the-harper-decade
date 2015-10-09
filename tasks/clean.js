var config = require('../gulp-config')().clean,
  gulp = require('gulp'),
  del = require('del');


// tasks
gulp.task('clean:temp', cleanTempDir);


// method definitions
function cleanTempDir() {
  return del.sync(config.tempDir);
}