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

if (!fs.existsSync('./dev/config.js')) {
    fs.writeFileSync('./dev/config.js', fs.readFileSync('./dev/config.example.js'));
}
var config = require('./dev/config');

/*
 * 执行example的riot编译
 */
gulp.task('example-riot', function () {
    return gulp.src(['example/tags/*.tag', 'example/tags/*/*.tag'])
        .pipe(riot())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('example/js'))
        .pipe(connect.reload());
});

/*
 * watch example的riot编译
 */
gulp.task('example', ['example-riot'], function () {
    connect.server({
        root: './',
        livereload: {
            port: config.example.liveReloadPort,
            src: 'http://localhost:' + config.example.liveReloadPort + '/livereload.js?snipver=1'
        },
        port: config.example.port
    });
    return gulp.watch(['example/tags/*.tag', 'example/tags/*/*.tag', 'example/js/common.js', 'example/css/*.css'], ['example-riot']);
});

/*
 * 执行src的riot编译
 */
gulp.task('riot',  function () {
    return gulp.src(['src/tags/*.tag', 'src/tags/*/*.tag'])
        .pipe(riot())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('src/js'))
        .pipe(connect.reload());
});

/*
 * watch src中tag文件的变化，如有变化则执行编译
 */
gulp.task('default', ['riot'], function () {
    connect.server({
        root: 'src',
        livereload: {
            port: config.project.liveReloadPort,
            src: 'http://localhost:' + config.project.liveReloadPort + '/livereload.js?snipver=1'
        },
        port: config.project.port
    });
    return gulp.watch(['src/tags/*.tag', 'src/tags/*/*.tag'], ['riot']);
});

/*
 * JS & CSS打包压缩
 */
gulp.task('usemin', function() {
  return gulp.src('./src/*.html')
    .pipe(usemin({
      css: [ rev ],
      html: [ function () {return minifyHtml({ empty: true });} ],
      js: [ uglify, rev ],
      inlinejs: [ uglify ],
      inlinecss: [ minifyCSS, 'concat' ]
    }))
    .pipe(gulp.dest('dist/'));
});

/*
 * 拷贝 src/imgs 中的图片到 dist/imgs
 */
gulp.task('moveImg', function() {
    return gulp.src('./src/imgs/*').pipe(gulp.dest('dist/imgs'));
});

/*
 * 编译打包
 */
gulp.task('dist', ['usemin', 'moveImg'], function () {});