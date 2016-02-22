var gulp = require('gulp');
var config = require('../config').libs;

gulp.task('libs', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
