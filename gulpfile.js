

'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/sass/styles.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./src'));
});
 
gulp.task('watch', function () {
  gulp.watch('./src/sass/styles.scss', gulp.series('sass'));
});