var _ = require('lodash'),
  bowerJson = require('./bower.json'),
  wiredep = require('wiredep');

module.exports = function () {
  var projectDir = process.env.PWD = process.cwd() + '/',
    srcDir = 'src/',
    scriptsSourceDir = 'src/scripts/'
    stylesSourceDir = 'src/styles/'
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
      tempDir: tempDir,
      assets: {
        sources: [
          srcDir + 'assets/**/*'
        ],
        dest: tempDir + 'assets/'
      },
      css: {
        sources: [
          srcDir + 'styles/css/**/*'
        ],
        dest: tempDir + 'styles/'
      }
    },
    style: {
      sources: [
        stylesSourceDir + 'less/the-harper-decade.less'
      ],
      dest: srcDir + 'styles/css/'
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
              module: 'harperdecade.Templates',
              root: '/',
              standalone: true
            }
          }
        }
      },
      css: {
        files: [
          '.tmp/*.css',
          '.tmp/**/*.css'
        ],
        options: {
          ignorePath: [
            '/.tmp/'
          ]
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
