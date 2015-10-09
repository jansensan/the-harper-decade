var _ = require('lodash'),
  bowerJson = require('./bower.json'),
  wiredep = require('wiredep');

module.exports = function () {
  var projectDir = process.env.PWD = process.cwd() + '/',
    srcDir = 'src/',
    scriptsSourceDir = 'src/scripts/'
    tempDir = '.tmp/',
    prodBuildDir = 'www/';

  var bowerFiles = {
    dev: wiredep({devDependencies: true}).js,
    depends: wiredep().js
  };

  var filesets = {
    appJS: [
      scriptsSourceDir + '*.js',
      scriptsSourceDir + '**/*.js'
    ]
  };

  var pipelines = {
    clean: {
      tempDir: tempDir
    },
    copy: {
      sources: [
        srcDir + 'assets/**/*'
      ],
      dest: tempDir + 'assets/',
    },
    inject: {
      htmlSource: srcDir + 'index.html',
      tempDir: tempDir,
      js: {
        app: {
          sources: filesets.appJS
        },
        templates: {
          files: [
            'src/**/*-tmpl.html'
          ],
          options: {
            read: false,
            starttag: '<!-- inject:templates:js -->',
            ignorePath: '/.tmp/'
          },
          templateCache: {
            file: bowerJson.name + '-tpls.js',
            dest: scriptsSourceDir,
            options: {
              module: 'net.jansensan.TheHarperDecadeTemplates',
              root: '/',
              standalone: true
            }
          }
        }
      }
    },
    serve: {
      host: 'local.the-harper-decade.com',
      port: 2015,
      urlToOpen: 'http://local.the-harper-decade.com:2015',
      fileToOpen: tempDir + 'index.html',
      webRoot: {
        dev: [tempDir, './', srcDir],
        prod: prodBuildDir
      }
    }
  };

  return pipelines;
};
