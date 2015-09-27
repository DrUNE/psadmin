'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');  //Runs a local dev server
var open = require('gulp-open');        //Opens a URL in a browser
var browserify = require('browserify'); //Bundle ES
var reactify = require('reactify');     //Transform JSx to ES
var source = require('vinyl-source-stream'); //Text streams for Gulp
var concat = require('gulp-concat');    //Concatenates files
var eslint = require('gulp-eslint');      //Lint ES and JSX files

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*js',
        css:[
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        main: './src/main.js',
        dist: './dist'
    }
};

//Start local dev server
gulp.task('connect', function(){
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    })
});

gulp.task('open', ['connect'], function(){
    gulp.src('dist/index.html')
        .pipe(open({uri: config.devBaseUrl + ':' + config.port+'/'}));
});

gulp.task('html', function(){
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    browserify(config.paths.main)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function(){
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('lint', function(){
    return gulp.src(config.paths.js)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('default', ['html', 'js', 'lint', 'css', 'open', 'watch']);
