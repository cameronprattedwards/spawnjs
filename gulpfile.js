var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

gulp.task('build', function() {
	gulp.src(['src/index.js', 'src/Constructor.js'])
		.pipe(concat('spawn.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('spawn.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);