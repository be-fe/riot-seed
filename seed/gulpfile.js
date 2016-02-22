/**
 * @file gulpfile.js
 * @author xieyu03@baidu.com
 */
var usemin = require('gulp-usemin');
var gulp = require('gulp');
var riot = require('gulp-riot');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var connect = require('gulp-connect');
var fs = require('fs');
var webpack = require('webpack-stream');
var del  = require('del');

if (!fs.existsSync('./dev/config.js')) {
    fs.writeFileSync('./dev/config.js', fs.readFileSync('./dev/config.example.js'));
}
var config = require('./dev/config');

gulp.task('riot', [], function() {
    return gulp.src(['src/js/tags-dep.js', 'src/tags/*.tag', 'src/tags/*/*.tag'])
        .pipe(riot())
        .pipe(concat('tags.js'))
        .pipe(gulp.dest('src/js'))
})

gulp.task('webpack', ['riot'], function() {
    return gulp.src('src/js/boot.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('src'))
        .pipe(connect.reload());
});

/*
 * 清空dist目录
 */
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('dist', ['clean', 'webpack'], function() {
    return gulp.src('./src/*.html')
        .pipe(usemin({
            css: [ minifyCSS, rev ],
            html: [ function () {return minifyHtml({ empty: true });} ],
            js: [ uglify, rev ],
            inlinejs: [ uglify ],
            inlinecss: [ minifyCSS, 'concat' ]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['dist'], function() {
    connect.server({
        root: 'src',
        livereload: {
            port: config.project.liveReloadPort,
            src: 'http://localhost:' + config.project.liveReloadPort + '/livereload.js?snipver=1'
        },
        port: config.project.port
    });
    return gulp.watch(['src/tags/*.tag', 'src/tags/*/*.tag', 'src/js/*.js'], ['webpack']);
});