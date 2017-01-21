var gulp = require('gulp');
var livereload = require('gulp-livereload');
var less = require('gulp-less');

var HTML_PATH = '**/*.html';
var CSS_PATH = './client/assets/**/*.css';
var JS_PATH = './client/assets/**/*.js';
var LESS_PATH = './lib/**/*.less';
var CSS_DEST = './client/assets';

gulp.task('html', function() {
  return gulp.src(HTML_PATH).pipe(livereload());
});

gulp.task('css', function() {
  return gulp.src(CSS_PATH).pipe(livereload());
});

gulp.task('js', function() {
  return gulp.src(JS_PATH).pipe(livereload());
});

gulp.task('less', function() {
  gulp.src(LESS_PATH).pipe(less())
      .pipe(gulp.dest(CSS_DEST));
});

gulp.task('watch', function() {
  console.log("Starting watch task.");
  require('./server/app.js');
  livereload.listen(8888);
  gulp.watch(HTML_PATH, ['html']);
  gulp.watch(CSS_PATH, ['css']);
  gulp.watch(JS_PATH, ['js']);
  gulp.watch(LESS_PATH, ['less']);
});
