var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
      gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css/'))
        .pipe(reload({stream:true}));
});

gulp.task('copy', function() {
    gulp.src(['node_modules/webcomponentsjs/lite.js',
        'node_modules/polymer/polymer.html',
        'node_modules/polymer/polymer-mini.html',
        'node_modules/polymer/polymer-micro.html'
        ]
    ).pipe(gulp.dest('./dist'));
});

// reload server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch("*.html", ['bs-reload']);
});

// deploys
gulp.task('default',  ['styles','copy','browser-sync','watch']);
