// include gulp and plugins
var config = require('../gulp-config')().serve,
  gulp = require('gulp'),
  glp = require('gulp-load-plugins')({lazy: true});


// allows self signed cert during dev
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// tasks
gulp.task('serve:dev', serveDev);
gulp.task('serve:prod', servProd);


// method definitions
function serveDev() {
  return serve('dev');
}

function servProd() {
  return serve('prod');
}

function serve(key) {
  return gulp
    .src(config.webRoot[key])
    .pipe(glp.webserver({
      host: config.host,
      port: config.port,
      fallback: 'index.html',
      open: config.fileToOpen,
    }));
}