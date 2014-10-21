'use strict';

var gulp        = require('gulp'),   
    sass        = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jade        = require('gulp-jade'),    
    browserSync = require('browser-sync');


//
// TASKS
// -------------------------------------------------------------

gulp.task('sass', function() {
    gulp.src('src/assets/styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build/assets/css'))
  });


gulp.task('browser-sync', function () {
   var files = [     
      'build/assets/css/*.css',
      
   ];

   browserSync.init(files, {
      server: {
         baseDir: 'build/'
      }
   });
});

gulp.task('watch', function() { 
  gulp.watch('src/assets/styles/*.scss', ['sass']);
});

gulp.task('default', ['watch','sass','browser-sync']);

