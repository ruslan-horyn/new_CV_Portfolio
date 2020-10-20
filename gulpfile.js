let project_folder = ".";
let source_folder = "#src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    doc: project_folder + "/doc/",
  },
  scr: {
    html: source_folder + "/*.html",
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    doc: source_folder + "/doc/*.pdf",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    doc: source_folder + "/doc/*pdf",
  },
};

let {
  src,
  dest
} = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  babel = require("gulp-babel"),
  sass = require("gulp-sass"),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer"),
  group_media = require("gulp-group-css-media-queries"),
  css_clean = require("gulp-clean-css"),
  uglify = require("gulp-uglify-es").default,
  rename = require("gulp-rename"),
  imagemin = require("gulp-imagemin"),
  concat = require("gulp-concat"),
  fileinclude = require("gulp-file-include");

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.scr.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.scr.css)
    .pipe(sass({
      outputStyle: "expanded",
    }))
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ["last 5 version"],
      cascade: false,
    }))
    .pipe(group_media())
    .pipe(dest(path.build.css))
    .pipe(css_clean())
    .pipe(rename({
      extname: ".min.css",
    }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.scr.js)
    .pipe(concat("script.js"))
    .pipe(dest(path.build.js))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.scr.img)
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 3,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function doc() {
  return src(path.scr.doc)
    .pipe(dest(path.build.doc))
    .pipe(browsersync.stream());
}

function watchFile() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

async function clean() {
  const deletedFilePaths = await del(['*.html']);
  const deletedDirectoryPaths = await del(['css', 'js','scss', 'doc']);
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images, doc));
let watch = gulp.parallel(build, browserSync, watchFile);

exports.doc = doc;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;