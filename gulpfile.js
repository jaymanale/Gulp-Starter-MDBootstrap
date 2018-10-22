/////////////////////////////////////////
var gulp = require('gulp'),
  plugin = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create(),
  htmlmin = require('gulp-htmlmin'),
  imagemin = require('gulp-imagemin');
// html task

/*gulp.task('htmlmin', function() {
  return gulp
    .src('./src/index.html')
    .pipe(plugin.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/index.html'))
    .pipe(browserSync.stream());
}); */

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
// js
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
//image
gulp.task('img', function() {
  return gulp
    .src(['./src/img/*'])
    .pipe(plugin.imagemin())
    .pipe(gulp.dest('./dist/img'));
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
      baseDir: './dist/' // This is the watch for change
    }
  });
  gulp.watch('./src/').on('change', browserSync.reload);
});

//default task

gulp.task('default', ['html', 'scss', 'js', 'img', 'watch', 'serve']);
gulp.task('build', ['html', 'scss', 'js', 'img']);
