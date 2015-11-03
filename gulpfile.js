var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('styles/general.scss')
        .pipe(sass())
        .pipe(gulp.dest('styles'));
});

gulp.task('watch', function () {
    gulp.watch('**/*.scss', ['sass']);
});