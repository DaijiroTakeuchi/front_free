const gulp = require('gulp');
const pug = require('gulp-pug');
const scss = require('gulp-sass');
const notify = require('gulp-notify');
const please = require('gulp-pleeease');
const plumber = require('gulp-plumber');

const SCSS_OPTION = {precision: 3};

const PLEEEASE_OPTION = {
    rem: false,
    import: false,
    filters: false,
    opacity: false,
    mqpacker: false,
    rebaseUrls: false,
    sourcemaps: false,
    pseudoElements: false,
    minifier: {preserveHacks: false},
    autoprefixer: {
        browsers: ['last 2 versions', 'Android >= 6']
    }
};

//pugをhtmlに変換
gulp.task('pug', () => {
    gulp.src(['./templates/**/*.pug', '!./templates/_includes/**/*.pug', '!./templates/_extends/**/*.pug'])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(pug({
            pretty: true,
            data: {
                meta: require('./data/meta')
            }
        }))
        .pipe(gulp.dest('./public/'))
});

//scss変換
gulp.task('scss', () => {
    return gulp.src(['./stylesheets/**/*.scss', '!./stylesheets/_imports/**/*.scss'])
        .pipe(plumber())
        .pipe(scss(SCSS_OPTION))
        .pipe(please(PLEEEASE_OPTION))
        .pipe(gulp.dest('./public/css/'));
});

// ビルド用
gulp.task('build', ['pug', 'scss']);

gulp.task('watch', ['build'], () => {
    gulp.watch(['./stylesheets/**/*.scss'], ['scss']);
    gulp.watch(['./templates/**/*.pug'], ['pug']);
});

gulp.task('default', ['build']);
