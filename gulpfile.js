var gulp        = require('gulp');
var browserSync = require('browser-sync');
var useref      = require('gulp-useref');
var sass        = require('gulp-sass');
var notify      = require('gulp-notify');
var reload      = browserSync.reload;


// Errors helper
var handleErrors = function () {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: "Compile error",
    message: "<%= error.message %>"
  }).apply(this, args);

  this.emit('end');
};


// Build JavaScripts
gulp.task('useref', function () {
  var assets = useref.assets();

  return gulp.src('*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('build'))
    .pipe(reload({stream: true, once: true}));
});


// Build Styles
gulp.task('sass', function () {
  return gulp.src('scss/**')
    .pipe(sass({includePaths: ['scss']}))
    .on('error', handleErrors)
    .pipe(gulp.dest('build'))
    .pipe(reload({stream: true}));
});


// Start development server
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'build'
    }
  });
});


// gulp.task('default', ['sass', 'javascript', 'watch']);
gulp.task('default', ['browserSync'], function () {
  // watch for file changes
  gulp.watch('javascript/**', ['useref']);
  gulp.watch('scss/**', ['sass']);
  gulp.watch('*.html', ['useref', reload]);
});
