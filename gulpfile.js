

'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');
const changed = require("gulp-changed");
const rename = require("gulp-rename"); 
// const replace = require('gulp-replace');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/sass/styles.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./src'));
});

gulp.task("minifyImgs", function () {
  gulp.src("./src/assets/imgs/t/*.{jpg,png}")
  	// .pipe(changed("./src/assets/minified"))
  	.pipe(imagemin())
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
  gulp.src("./src/assets/imgs/products/uploads/*.{jpg,png}")
  	// .pipe(changed("./src/assets/imgs/products"))
    .pipe(imageResize({ width: 900, height : 800, crop : false }))
    .pipe(rename(function (path) { path.basename += "-900x800";}))
    .pipe(imagemin())
    .pipe(gulp.dest("./src/assets/imgs/products/uploads"))
    .pipe(imageResize({ width: 600, height : 600, crop : true }))
    .pipe(rename(function (path) { path.basename = path.basename.replace(/-900x800/g, "-600x600")}))
    .pipe(imagemin())
    .pipe(gulp.dest("./src/assets/imgs/products/uploads"))
});

gulp.task('watch', function () {
  gulp.watch('./src/sass/styles.scss', gulp.series('sass'));
});