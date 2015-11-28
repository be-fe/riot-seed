/**
 * @file gulpfile.js
 * @author xieyu03@baidu.com
 */

var gulp = require('gulp');
var riot = require('gulp-riot');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

gulp.task('riot', function () {
    return gulp.src(['example/tags/*.tag', 'example/tags/*/*.tag'])
        .pipe(riot())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('example/js'));
});


gulp.task('default', ['riot'], function () {
    return gulp.watch(['example/tags/*.tag', 'example/tags/*/*.tag', 'example/js/common.js', 'example/css/*.css'], ['riot']);
});

