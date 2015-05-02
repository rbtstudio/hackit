var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

var jsSources = ['components/scripts/*.js'];
var sassSources = ['components/sass/*.scss'];
var htmlSources = ['builds/development/*.html'];

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: 'builds/development/images',
      style: 'expanded'
    })
    .on('error', gutil.log))
    .pipe(gulp.dest('builds/development/css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['compass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'builds/development/',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(connect.reload())
});


gulp.task('default', ['html', 'js', 'compass', 'connect', 'watch']);