import gulp from "gulp";
import concat from "gulp-concat";
import terser from "gulp-terser";
import rename from "gulp-rename";
import cssnano from "gulp-cssnano";
import autoprefixer from "gulp-autoprefixer";
import header from "gulp-header";
import replace from "gulp-replace";
import del from "del";
import eslint from "gulp-eslint";
import babel from "gulp-babel";

import pkg from "./package.json";

const banner = [
  "// ==================================================",
  "// fancyBox v${pkg.version}",
  "//",
  "// Licensed GPLv3 for open source use",
  "// or fancyBox Commercial License for commercial use",
  "//",
  "// http://github.com/zengde/fancybox.js/",
  "// Copyright ${new Date().getFullYear()} fancyApps",
  "//",
  "// ==================================================",
  ""
].join("\n");

const paths = {
  scripts: {
    full: [
      "src/js/default.js",
      "src/js/core.js",
      "src/js/media.js",
      "src/js/guestures.js",
      "src/js/slideshow.js",
      "src/js/fullscreen.js",
      "src/js/thumbs.js",
      "src/js/wheel.js",
      "src/js/share.js",
      "src/js/hash.js"
    ],
    dest: 'dist',
    dest5:'dist/libs'
  },
  styles: {
    src: 'src/css/*.css',
    dest: 'dist'
  }
};

// Concatenate & Minify JS
export function scripts () {
  return gulp
    .src(paths.scripts.full, { since: gulp.lastRun(scripts) })
    .pipe(concat("fancybox.es.js"))
    .pipe(replace(/({fancybox-version})/g, pkg.version))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(paths.scripts.dest))
  // .pipe(rename({ suffix: ".min" })) terser not support stage-3 yet
  // .pipe(terser())
  // .pipe(header(banner, { pkg: pkg }))
  // .pipe(gulp.dest(paths.scripts.dest));
};

// Compile CSS
export function css () {
  return gulp
    .src(paths.styles.src, { since: gulp.lastRun(css) })
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(concat("fancybox.css"))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cssnano({ zindex: false }))
    .pipe(gulp.dest(paths.styles.dest));
};

export const clean = () => del(['dist']);

export function lint () {
  return gulp.src(paths.scripts.full, { since: gulp.lastRun(lint) })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

export function watch () {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, css);
}

// es2015
export function scripts5 () {
  return gulp
    .src(paths.scripts.full, { since: gulp.lastRun(scripts5) })
    .pipe(babel())
    .pipe(concat("fancybox-umd.js"))
    .pipe(replace(/({fancybox-version})/g, pkg.version))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rename({ suffix: ".min" }))
    .pipe(terser())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(paths.scripts.dest));
}
export function scripts5S () {
  return gulp
    .src(paths.scripts.full, { since: gulp.lastRun(scripts5) })
    .pipe(babel())
    .pipe(replace(/({fancybox-version})/g, pkg.version))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(paths.scripts.dest5))
    .pipe(rename({ suffix: ".min" }))
    .pipe(terser())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest(paths.scripts.dest5));
}

export const build = gulp.series(clean, gulp.parallel(css, scripts, scripts5, scripts5S));

// Default Task
export default build;
