var gulp = require('gulp'),
  plugin = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create(),
  htmlmin = require('gulp-htmlmin'),
  imagemin = require('gulp-imagemin');

// ############################## Development Environment #########################

// html task

// gulp.task('html-dev', function() {
//   return gulp.src('src/*.html').pipe(browserSync.stream());
// });

// css task
gulp.task('scss-dev', function() {
  return gulp
    .src([
      './node_modules/mdbootstrap/css/bootstrap.min.css',
      './node_modules/mdbootstrap/css/mdb.min.css',
      './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
      './src/scss/*.scss'
    ])
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass().on('error', plugin.sass.logError))
    .pipe(plugin.cssmin())
    .pipe(plugin.autoprefixer())
    .pipe(plugin.sourcemaps.write())
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
});

// js
gulp.task('js-dev', function() {
  return gulp
    .src([
      './node_modules/mdbootstrap/js/bootstrap.min.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/popper.js/dist/umd/popper.min.js',
      './node_modules/mdbootstrap/js/mdb.min.js',
      './node_modules/@fortawesome/fontawesome-free/js/all.min.js',
      './src/js/*.js'
    ])

    .pipe(plugin.uglify())
    .pipe(gulp.dest('./src/js'))
    .pipe(browserSync.stream());
});

//image
gulp.task('img-dev', function() {
  return gulp
    .src(['./src/img/*'])
    .pipe(plugin.imagemin())
    .pipe(gulp.dest('./src/img'));
});

//watch file for changes

gulp.task('watch', function() {
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/scss/*.scss'], ['scss']);
  gulp.watch(['./src/js/*.js'], ['js']);
  gulp.watch(['./src/img/*'], ['img']);
});

// serve task
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './src/' // This is the watch for change
    }
  });
  gulp.watch('./src/').on('change', browserSync.reload);
});

//default task for Devlopment

gulp.task('default', ['scss-dev', 'js-dev', 'img-dev', 'watch', 'serve']);

// ################################### Production Build ###############################

// Html task
gulp.task('html', function() {
  return gulp
    .src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// css task
gulp.task('scss', function() {
  return gulp
    .src([
      './node_modules/mdbootstrap/css/bootstrap.min.css',
      './node_modules/mdbootstrap/css/mdb.min.css',
      './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
      './src/scss/*.scss'
    ])
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.sass().on('error', plugin.sass.logError))
    .pipe(plugin.cssmin())
    .pipe(plugin.autoprefixer())
    .pipe(plugin.sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

// Js Task
gulp.task('js', function() {
  return gulp
    .src([
      './node_modules/mdbootstrap/js/bootstrap.min.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/popper.js/dist/umd/popper.min.js',
      './node_modules/mdbootstrap/js/mdb.min.js',
      './node_modules/@fortawesome/fontawesome-free/js/all.min.js',
      './src/js/*.js'
    ])

    .pipe(plugin.uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

// Image Task

gulp.task('img', function() {
  return gulp
    .src(['./src/img/*'])
    .pipe(plugin.imagemin())
    .pipe(gulp.dest('./dist/img'));
});
gulp.task('build', ['html', 'scss', 'js', 'img']);
