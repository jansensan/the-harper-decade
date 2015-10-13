var gulp = require('gulp'),
  requireDir = require('require-dir'),
  runSequence = require('run-sequence');

// require tasks directory
requireDir('./tasks', {recurse: true});

// tasks
gulp.task('dev', dev);


// method definitions
function dev() {
  runSequence(
    'clean:temp',
    'less',
    ['copy:assets', 'copy:css'],
    'inject',
    'serve:dev'
  );
}