'use strict';
var gulp = require('gulp'),
  rimraf = require('rimraf'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less'),
  mainBowerFiles = require('main-bower-files'),
  watch = require('gulp-watch'),
  project = require('./project.json');

var paths = {
  webroot: './',
  concatJsDest: './public/production/home.min.js',
  concatCssDest: './public/production/style.min.css',
  
  jqueryJs: './public/lib/jquery/dist/jquery.js',
  bootstrapJs: './public/lib/bootstrap/dist/js/bootstrap.js',
  wowJs: './public/lib/wow/dist/wow.js',
  scrollMagicJs: './public/lib/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
  owlJs: './public/lib/owl-carousel/owl.carousel.js',
  homeJs: './public/javascripts/home/home.js',
  
  
  bootstrapCss: './public/lib/bootstrap/dist/css/bootstrap.min.css',
  wowCss: './public/lib/wow/css/libs/animate.css',
  owlCss: './public/lib/owl-carousel/owl.carousel.css',
  owlThemeCss: './public/lib/owl-carousel/owl.theme.css',
  owlTransitionCss: './public/lib/owl-carousel/owl.transitions.css',
  styleCss: './public/stylesheets/style.css'
  
};

gulp.task('bower', function(){
    return gulp.src(mainBowerFiles(), {base: './bower_components'})
        .pipe(gulp.dest(paths.webroot + 'public/lib/')); 
});

gulp.task('less', function (){
    return gulp.src(paths.webroot + 'public/stylesheets/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(paths.webroot + 'public/stylesheets'));
});

gulp.task('clean:js', function(cb) {
  rimraf(paths.concatJsDest, cb);
});

gulp.task('clean:css', function(cb) {
  rimraf(paths.concatCssDest, cb);
});

gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task('min:js', function() {
    gulp.src(
        [   paths.jqueryJs,
            paths.bootstrapJs,
            paths.wowJs,
            paths.scrollMagicJs,
            paths.owlJs,
            paths.homeJs,
        ])
    .pipe(concat(paths.concatJsDest))
    //.pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('min:css', function() {
    gulp.src(
        [   paths.bootstrapCss,
            paths.wowCss,
            paths.owlCss,
            paths.owlThemeCss,
            paths.owlTransitionCss,
            paths.styleCss,
        ])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest('.'));
});

gulp.task('prod', ['clean:css', 'less', 'min:css', 'clean:js', 'min:js']);

gulp.task('watch', function(){
    gulp.watch(
        [
            paths.webroot + "public/javascripts/**/*.js", 
            paths.webroot + "public/stylesheets/**/*.less", 
        ],
        ["prod"]
    );
});