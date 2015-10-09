var gulp = require('gulp'),
  requireDir = require('require-dir');

// require tasks directory
requireDir('./tasks', {recurse: true});

// tasks
gulp.task('dev', [
  'clean:temp',
  'copy:assets',
  'inject',
  'serve:dev'
]);
