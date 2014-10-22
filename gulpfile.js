'use strict';

var gulp           = require('gulp'),   
    sass           = require('gulp-sass'),
    csscomb        = require('gulp-csscomb'),   
    autoprefixer   = require('gulp-autoprefixer'),
    jade           = require('gulp-jade'),
    imagemin       = require('gulp-imagemin'),
    browserSync    = require('browser-sync')
   
   


//
// TASKS
// -------------------------------------------------------------


gulp.task('jade', function() {
  return gulp.src('src/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('build/'))   
});

gulp.task('sass', function() {
   return gulp.src('src/assets/styles/*.scss')
    .pipe(sass())
    .pipe(autoprefixer([
      'Android 2.3',
      'Android >= 4',
      'Chrome >= 20',
      'Firefox >= 24', // Firefox 24 is the latest ESR
      'Explorer >= 8',
      'iOS >= 6',
      'Opera >= 12',
      'Safari >= 6']))
    .pipe(csscomb())
    .pipe(gulp.dest('build/assets/css')) 
  });


gulp.task('scripts', function() {
  return gulp.src('src/assets/scripts/**/*.js')
     .pipe(gulp.dest('build/assets/js'))    
});


// Некоректно работает
gulp.task('images', function() {
  return gulp.src('src/assets/images/**/*')
//    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))  
    .pipe(imagemin())  
    .pipe(gulp.dest('build/assets/img'))  
});




gulp.task('browser-sync', function () {
   var files = [     
      'build/*.html',      
      'build/assets/css/*.css',      
      'build/assets/js/*.js',      
      'build/assets/img/**/*',  
           
   ];

   browserSync.init(files, {
      server: {
         baseDir: './build'
      }      
   });
});


gulp.task('watch',['browser-sync'], function() { 
  gulp.watch('src/*.jade', ['jade']);
  gulp.watch('src/assets/styles/*.scss', ['sass']);
  gulp.watch('src/assets/scripts/*.js', ['js']);
  gulp.watch('src/assets/images/**/*', ['images']);  
});

gulp.task('default', ['watch','jade','sass','scripts','images','browser-sync']);

