import { src, dest, series, watch } from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cssMinify from 'gulp-clean-css';
import jsMinify from 'gulp-terser';


import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
const sass = gulpSass( dartSass );


function styles() {
  return src('./assets/src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssMinify())
    .pipe(dest('./assets/css/base/'));
}

function scripts() {
  return src('./assets/src/scripts/**/*.js')
    .pipe(jsMinify())
    .pipe(dest('./assets/js/'));
}

function watchTask() {
  watch(
    ['./spcb/assets/src/styles/**/*.scss', './spcb/assets/src/scripts/**/*.js'],
    series(styles, scripts)
  );
}

export default series(styles, scripts, watchTask);