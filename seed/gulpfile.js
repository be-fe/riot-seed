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
var less = require('gulp-less');


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

gulp.task('less', [], function() {
    return gulp.src(['src/less/*.less', 'src/less/*/*.less', 'src/css/*/*/*.less'])
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('src'))
});


/*
 * 清空dist目录
 */
gulp.task('clean', function() {
    return del(['dist/imgs', 'dist']);
});

/*
 * 拷贝 src/imgs 中的图片到 dist/imgs
 */
gulp.task('move', ['clean'], function() {
    return gulp.src('./src/imgs/*').pipe(gulp.dest('dist/imgs'));
});

gulp.task('dist', ['clean', 'webpack', 'less', 'move'], function() {
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
    gulp.watch(['src/css/*', 'src/css/*/*','src/css/*/*/*'], ['less']);
    return gulp.watch(['src/tags/*.tag', 'src/tags/*/*.tag', 'src/js/*.js'], ['webpack']);
});