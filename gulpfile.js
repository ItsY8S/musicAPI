var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('build-css', function() {
  return gulp.src('./scss/*.scss') // Get source files with gulp.src
    .pipe(sass()) // Sends it through a gulp plugin
    .pipe(gulp.dest('./css')) // Outputs the file in the destination folder
})

gulp.task('watch', function() {
  gulp.watch('./scss/*.scss', ['scss'])
})
