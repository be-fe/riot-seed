var fs = require('fs');
var path = require('path');
var usemin = require('gulp-usemin');
var gulp = require('gulp');
var riotCompile = require('gulp-riot');
var riot = require('riot');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');
var del  = require('del');
var named = require('vinyl-named');
var through = require('through2');
var rename = require("gulp-rename");
var less = require("gulp-less");

Array.prototype.delete = function(value) {
    var l = this.length;
    if (l) {
        for (var i = 0; i < l; i++) {
            if (this[i] === value) {
                this.splice(i, 1);
            }
        }
    }
    return this;
}

var pageList = fs.readdirSync('src/tags').delete('common').delete('layout');


gulp.task('js', [], function() {
    return pageList.forEach(function(page) {
        gulp.src(['src/js/common.js', 
            'src/tags/common/*.tag', 
            'src/tags/common/*/*.tag', 
            'src/tags/' + page + '/*.tag', 
            'src/tags/' + page + '/*/*.tag'])
            .pipe(riotCompile())
            .pipe(concat(page + '.js'))
            .pipe(gulp.dest('src/js/tmp'))
    });
});

gulp.task('auto-create', [], function() {
    // setTimeout(function() {
        pageList = fs.readdirSync('src/tags').delete('common').delete('layout');
        return pageList.forEach(function(page) {
            // console.log(fs.statSync('src/less'))
            fs.stat('src/less/' + page + '.less', function(err, stat) {
                if(err && err.code == 'ENOENT') {
                    fs.writeFileSync('src/less/' + page + '.less', '', 'utf8');
                }
            });
            fs.stat('src/tags/' + page + '/' + page + '.tag', function(err, stat) {
                if(err && err.code == 'ENOENT') {
                    fs.writeFileSync('src/tags/' + page + '/' + page + '.tag', 
                        '<'+ page + '></' + page +'>', 
                        'utf8');
                }
            });
            
        });
    // }, 200);
});

gulp.task('webpack', ['js'], function() {
    setTimeout(function() {
        return gulp.src(['src/js/tmp/*.js'])
                .pipe(named())
                .pipe(webpack(require('./webpack.config.js')))
                .pipe(gulp.dest('src/js/'))
    }, 100);
});

gulp.task('less', [], function() {
    return pageList.forEach(function(page) {
        gulp.src(['src/less/common.less', 
                'src/less/common/*.less', 
                'src/less/' + page + '.less', 
                'src/less/' + page + '/*.less'])
            .pipe(less())
            .pipe(concat(page + '.css'))
            .pipe(gulp.dest('src/css/'));
    });
})

gulp.task('html', [], function() {
    return pageList.forEach(function(page) {
        gulp.src(['src/layout.html'])
            .pipe(replace(page))
            .pipe(rename(page + '.html'))
            .pipe(gulp.dest('src/html/'));
    });
});

gulp.task('clean', function() {
    return del(['dist/imgs', 'dist']);
});

gulp.task('move', ['clean'], function() {
    return gulp.src('./src/imgs/*').pipe(gulp.dest('dist/imgs'));
});


gulp.task('dist', ['clean', 'html', 'less', 'webpack', 'move'], function() {
    return gulp.src('./src/html/*.html')
        .pipe(usemin({
            css: [ minifyCSS, rev ],
            html: [ function () {return minifyHtml({ empty: true });} ],
            js: [ uglify, rev ],
            inlinejs: [ uglify ],
            inlinecss: [ minifyCSS, 'concat' ]
        }))
        .pipe(gulp.dest('dist/html'));
});

gulp.task('default', ['html', 'less', 'webpack'], function() {
    gulp.watch(['./src/layout.html'], ['html'], function() {})
    gulp.watch(['./src/less/*'], ['less'], function() {})
    gulp.watch(['./src/tags/*'], ['auto-create', 'less', 'html', 'webpack'], function() {})
    gulp.watch(['./src/tags/*/*.tag', 
                './src/tags/*/*/*.tag',
                './src/js/common.js'], ['html', 'webpack'], function() {})
});

/*
 *  将md转码后的html套到模板中去
 */
function replace(page) {

    return through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            return cb();
        }

        var tpl = fs.readFileSync('src/layout.html', {encoding: 'utf-8'});
        var content = file.contents.toString();
        content = riot.util.tmpl(tpl, {
            cssName: page,
            cssLink: '../css/' + page + '.css',
            jsName: page,
            jsLink: '../js/' + page + '.js',
            content: '<' + page + '></' + page + '>',
        })
        // console.log(content);

        file.contents = new Buffer(content);
        this.push(file);

        cb();

    });

}

