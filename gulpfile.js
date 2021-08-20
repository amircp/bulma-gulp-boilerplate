
const gulp = require('gulp');
const sass = require('gulp-sass');
const bless = require('gulp-bless');
const clean = require('gulp-clean');

const $ = require('gulp-load-plugins')();



gulp.task('sass', () => {
    return gulp
      .src(`./src/assets/styles/styles.scss`)
      .pipe(
        $.sass({
          includePaths: [
            './node_modules/bulma/bulma'
          ],
          outputStyle: 'compressed'
        }).on('error', $.sass.logError)
      )
    .pipe(gulp.dest(`./dist/assets/styles/`));
  });

  gulp.task('html-templates', () => {
    return gulp
      .src(`./src/*.html`)
      .pipe(gulp.dest(`./dist/`));
  });


  gulp.task('clean', function() {
    return gulp.src(['./dist'], { read: false, allowEmpty: true }).pipe(clean());
  });

  gulp.task(
    'setup',
    gulp.series(
      'clean',
      gulp.parallel('sass'),
      'html-templates'
    )
  );
  