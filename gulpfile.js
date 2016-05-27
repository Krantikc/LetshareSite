require('es6-promise').polyfill();

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var connect = require('gulp-connect');
var jsHint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var minimist = require('minimist');
var ngConfig = require('gulp-ng-config');
var plumber = require('gulp-plumber');
var karma = require('gulp-karma');
var clean = require('gulp-clean');
var jscs = require('gulp-jscs');
var jscsStylish = require('gulp-jscs-stylish');
var jshintXMLReporter = require('gulp-jshint-xml-file-reporter');
var gitRev = require('git-rev');
var gulpFile = require('gulp-file');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var _ = require('underscore');

var knownOptions = {
    string: 'env, showApps',
    default: {env: 'localhost', showApps: 'true'}
};

var options = minimist(process.argv.slice(2), knownOptions);
var multiselectStyles = 'bower_components/angular-multi-select/*.css';
var leafletStyles = 'bower_components/leaflet/dist/*.css';
var leafletMarkerStyles = 'bower_components/leaflet.markercluster/dist/*.css';
var leafletDrawStyles = 'bower_components/leaflet.draw/dist/*.css';

var scriptRoot = 'js';
var scriptFolder = scriptRoot + '/**/*.js';
var jsHintOutput = './jshint.xml';

gulp.task('scripts', function() {
    return gulp.src(scriptFolder)
        .pipe(plumber())

        .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
            //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function() {
    return gulp.src('css/ls-styles.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
            .pipe(sass({
                //outputStyle: 'compressed',
                includePaths: ['bower_components/bootstrap-sass/assets/stylesheets/']
            }))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function() {
    return gulp.src(['bower_components/bootstrap/fonts/*.*'])
        .pipe(gulp.dest('dist/fonts/bootstrap/'));
});

gulp.task('vendorCss', function() {
    return gulp.src([multiselectStyles, leafletStyles, leafletMarkerStyles, leafletDrawStyles])
        .pipe(plumber())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function() {
    return gulp.src(['bower_components/leaflet.draw/dist/images/*.*'])
        .pipe(gulp.dest('dist/css/images'));
});

gulp.task('vendorScripts', function() {
    return gulp.src([
            'bower_components/**/angular.js',
            'bower_components/**/angular-resource.js',
            'bower_components/**/dist/jquery.js',
            'bower_components/**/assets/javascripts/bootstrap.js',
            'bower_components/**/release/angular-ui-router.min.js',
            'bower_components/**/ui-bootstrap-tpls.js',
            'bower_components/**/angular-multi-select/isteven-multi-select.js',
            'bower_components/**/underscore.js',
            'bower_components/**/scrollglue.js',
            'bower_components/**/ng-file-upload-all.min.js',
            'bower_components/**/angular-idle.min.js',
            'bower_components/**/angucomplete-alt.min.js',
            'bower_components/**/jssor.slider.mini.js'
        ])
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('templates', function() {
    gulp.src('index.html').pipe(gulp.dest('dist'));
    gulp.src('partials/**/*.html').pipe(gulp.dest('dist/partials'));
    gulp.src('custom_policies/**/*.json').pipe(gulp.dest('dist/custom_policies'));
    return gulp.src('imgs/**/*').pipe(gulp.dest('dist/imgs'));
});

gulp.task('test', function() {
    //Returning fake file so as to run the karma.conf.js files instead
    return gulp.src('./fake')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        });
});

gulp.task('git-hash', function() {
    gitRev.long(function (str) {
        gulpFile('git-hash.txt', str, {src: true}).pipe(gulp.dest('dist'));
    });
});

gulp.task('watch', ['sass', 'scripts', 'templates', 'lint'], function() {
    gulp.watch('css/**/*.scss', ['sass']);
    gulp.watch(scriptFolder, ['scripts', 'lint']);
    gulp.watch('specs/*.js', ['scripts', 'lint']);
    gulp.watch([
            'index.html',
            'partials/**/*.html',
            'imgs/**/*',
            'custom_policies/**/*.json'
        ], ['templates']
    );
});

gulp.task('config', function() {
    var env = options.env || 'localhost';
    var showApps = options.showApps || 'true';

    gulp.src('config.json')
        .pipe(ngConfig('app.config', {
            environment: env,
            constants: {
                SHOW_APPS: showApps
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
    connect.server({
        root: 'dist',
        port: 8080,
        fallback: 'dist/index.html'
    });
});

gulp.task('lint', function() {
    return gulp.src(scriptFolder)
        .pipe(jsHint())
        .pipe(jscs())
        .on('error', function() {})
        .pipe(jscsStylish.combineWithHintResults())
        .pipe(jsHint.reporter(stylish));
});

gulp.task('clean', function() {

    gulp.src(jsHintOutput, {read: false})
        .pipe(clean());

    return gulp.src('dist', {read: false})
        .pipe(clean());
});


//Default Task
gulp.task('default', function() {

    gulp.start('config');
    gulp.start('lint');
    gulp.start('templates');
    gulp.start('sass');
    gulp.start('fonts');
    gulp.start('vendorCss');
    gulp.start('images');
    gulp.start('scripts');
    gulp.start('vendorScripts');
    gulp.start('git-hash');
    gulp.start('server');
    gulp.start('watch');
});

gulp.task('jenkins', function() {

    gulp.start('config');
    gulp.start('templates');
    gulp.start('sass');
    gulp.start('fonts');
    gulp.start('vendorCss');
    gulp.start('scripts');
    gulp.start('vendorScripts');
    gulp.start('git-hash');
});
