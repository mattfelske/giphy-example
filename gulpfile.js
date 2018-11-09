var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

var del = require('del');

var webpack = require('webpack');
var webpackConfig = require('./webpack');

const DEST = 'public/dist';
const DEST_LIB = 'public/dist/lib';
const DEST_FONTS = 'public/dist/fonts';
const DEST_ICONS = 'public/dist/icons';

// Sets up for a clean build
gulp.task('build', [
  'delete-dist',
  // 'bundle-css-libs',
  // 'bundle-js-libs',
  // 'add-fonts',
  // 'add-icons',
  'add-lib',
  'webpack'
]);

// Deletes the contents of a previously generated distributed GULP build.
gulp.task('delete-dist', () => {
  return del([`${DEST}/*`], {dot: true});
});

// Concatenate third party css library files together
gulp.task('add-lib', ['delete-dist'], () => {
  return gulp.src([
    'src/lib/**/*'
  ])
    .pipe(gulp.dest(DEST_LIB));
});

// Concatenate third party css library files together
// gulp.task('bundle-css-libs', ['delete-dist'], () => {
//   return gulp.src([
//     'src/lib/**/*.min.css'
//   ])
//     .pipe(concat('lib.min.css'))
//     .pipe(gulp.dest(DEST));
// });

// Concatenate third party js library files together
// gulp.task('bundle-js-libs', ['bundle-css-libs', 'delete-dist'], () => {
//   return gulp.src([
//     'src/lib/**/*.min.js'
//   ])
//     .pipe(concat('lib.min.js'))
//     .pipe(gulp.dest(DEST));
// });

// Add third party library files
// gulp.task('add-fonts', ['bundle-js-libs', 'bundle-css-libs', 'delete-dist'], () => {
//   return gulp.src([
//     'src/lib/fonts/orkney-bold/*',
//     'src/lib/fonts/fontawesome/*',
//     '!src/lib/fonts/fontawesome/*.min.css'
//   ])
//     .pipe(gulp.dest(DEST_FONTS));
// });

// gulp.task('add-icons', ['add-fonts', 'bundle-js-libs', 'bundle-css-libs', 'delete-dist'], () => {
//   return gulp.src([
//     'src/lib/web-icons/*',
//     '!src/lib/web-icons/*.min.css'
//   ])
//     .pipe(gulp.dest(DEST_ICONS));
// });

// Execute the webpack functionality
// gulp.task('webpack', ['add-icons', 'add-fonts', 'bundle-js-libs', 'bundle-css-libs', 'delete-dist'], () => {
gulp.task('webpack', ['add-lib', 'delete-dist'], () => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  })
    .then((stats) => {
      gutil.log('[webpack]', stats.toString({
        version:      true,
        colors:       gutil.colors.supportsColor,
        children:     false,
        chunks:       false,
        chunkModules: false,
        modules:      false,
        cached:       false,
        cachedAssets: false,
        hash:         true,
        timings:      true,
        reasons:      false,
        source:       false,
        errorDetails: true
      }));
    })
    .catch((err) => {
      throw new gutil.PluginError('webpack', err);
    });
});
