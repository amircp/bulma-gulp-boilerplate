/**
 * 
 * @author Amir Oswaldo Canto Palomo
 * @description Gulp Task Boiler Plate to Compile Bulma sass files and compress js files
 * 
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const bless = require('gulp-bless');
const clean = require('gulp-clean');
const $ = require('gulp-load-plugins')();
const uglify = require('gulp-uglify');

gulp.task('sass', () => {
    return gulp
        .src(`./src/assets/styles/*.scss`)
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

gulp.task('image-assets', () => {
    return gulp
        .src(`./src/assets/images/*`)
        .pipe(gulp.dest(`./dist/assets/images/*`));
});

gulp.task('js-assets', () => {
    return gulp.src('./src/assets/js/*')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('clean', function() {
    return gulp.src(['./dist'], {
        read: false,
        allowEmpty: true
    }).pipe(clean());
});

gulp.task(
    'setup',
    gulp.series(
        'clean',
        gulp.parallel('sass'),
        'html-templates',
        'image-assets',
        'js-assets'
    )
);
