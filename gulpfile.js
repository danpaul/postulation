var gulp = require('gulp');
var server = require('gulp-express');

var browserify = require('browserify');
var gulp = require('gulp');
var source = require("vinyl-source-stream");
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');

// build JS app
gulp.task('main-build', function(){
  var b = browserify();
  b.transform(reactify); // use the reactify transform
  b.add('./frontend_app/app/main.jsx');
  return b.bundle()
    .pipe(source('compiled.js'))
    .pipe(gulp.dest('./public/js'))
});

// minify js
gulp.task('minify', ['main-build'], function(){
  gulp
    .src('./public/js/compiled.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/min'))
})

// build and minify css
gulp.task('style-build', function(){
  gulp.src('./frontend_app/scss/main.scss')
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/css'))
})

// watch appropriate files and reload after
gulp.task('server', function () {

    // Start the server at the beginning of the task 
    server.run(['index.js']);

    gulp.watch(['./public/js/min/compiled.js'], server.notify);
    gulp.watch(['./public/css/main.css'], server.notify);

});

// do initial build, watch js and scss and rebuild on change
gulp.task('default', function() {
    gulp.start(['server', 'main-build', 'minify', 'style-build']);
    gulp.watch('./frontend_app/app/**/*.*', ['main-build', 'minify']);
    gulp.watch('./frontend_app/scss/**/*.*', ['style-build']);
});