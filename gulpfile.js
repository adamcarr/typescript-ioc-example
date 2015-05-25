var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        noImplicitAny: false,
        outDir: 'dist',
		module: 'commonjs',
		target: 'ES5',
		emitDecoratorMetadata: true,
		typescript: require('typescript')
      }));
  return tsResult.js.pipe(gulp.dest('dist'));
});