

'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');
const changed = require("gulp-changed");
const rename = require("gulp-rename"); 

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/sass/styles.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./src'));
});

gulp.task("minifyImgs", function () {
  gulp.src("./src/assets/imgs/*.{jpg,png}")
  	.pipe(changed("./src/assets/minified"))
  	.pipe(imagemin())
    .pipe(rename(function (path) { path.basename += "-compressed"; }))
    .pipe(gulp.dest("./src/assets/imgs/"));
});

gulp.task("minifyProductImg", function () {
  gulp.src("./src/assets/imgs/products/*.{jpg,png}")
  	.pipe(changed("./src/assets/imgs/products"))
  	.pipe(imagemin())
    .pipe(gulp.dest("./src/assets/imgs/products"))
  gulp.series('resizeProductImg');
});

gulp.task("resizeProductImg", function () {
  gulp.src("./src/assets/imgs/products/*.{jpg,png}")
  	// .pipe(changed("./src/assets/imgs/products"))
    .pipe(imageResize({ width: 600, height : 401, crop : true }))
    .pipe(rename(function (path) { path.basename += "-600x401"; }))
  	.pipe(imagemin())
    .pipe(gulp.dest("./src/assets/imgs/products"));
});
 
gulp.task('watch', function () {
  gulp.watch('./src/sass/styles.scss', gulp.series('sass'));
});