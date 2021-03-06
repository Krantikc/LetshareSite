// Karma configuration
// Generated on Fri May 15 2015 09:46:14 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/**/dist/jquery.js',
            'bower_components/**/assets/javascripts/bootstrap.js',
            'bower_components/**/angular.js',
            'bower_components/**/angular-resource.js',
            'bower_components/**/highcharts.js',
            'bower_components/**/highcharts-more.js',
            'bower_components/**/modules/solid-gauge.js',
            'bower_components/**/modules/exporting.js',
            'bower_components/**/release/angular-ui-router.min.js',
            'bower_components/**/ui-bootstrap-tpls.js',
            'node_modules/**/angular-mocks.js',
            'bower_components/**/dist/jquery.min.js',
            'bower_components/**/underscore.js',
            'bower_components/angular-multi-select/isteven-multi-select.js',
            'specs/**/*.js',
            'js/**/*.js',
            '**/*.html'
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.html': ['ng-html2js'],
            'js/**/*.js': ['coverage']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',  // <-- change as needed for the project
            // include beforeEach(module('templates')) in unit tests
            moduleName: 'templates'
        },

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'junit', 'coverage'],

        // the default configuration
        junitReporter: {
            outputDir: 'test-results',
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome', 'Firefox', 'IE'],
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        coverageReporter: {
            dir: 'reports/coverage',
            reporters: [
                { type: 'cobertura', subdir: 'cobertura', file: 'cobertura.xml' },
                { type: 'html', subdir: 'html', file: 'coverage.html'},
                { type: 'lcovonly', subdir: 'lcov', file: 'coverage.lcov'}
            ]
        }
    });

};
