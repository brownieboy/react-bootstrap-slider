/* eslint-env node */
// gulp.task(name, deps, func) was replaced by gulp.task(name, gulp.{series|parallel}(deps, func))

const gulp = require("gulp");
const rename = require("gulp-rename");
// const path = require("path");
const replace = require("gulp-replace");

const PATHS = {
  src: {
    root: "./src",
    js: "./src/js",
    css: "./src/css",
    sliderImportPath:
      'import ReactBootstrapSlider from "./react-bootstrap-slider.js"',
    htmlScriptPath: '<script src="main.js"></script>'
  },
  demosrc: {
    js: "./demosrc/js",
    sliderImportPath:
      'import ReactBootstrapSlider from "../../dist/react-bootstrap-slider.js"'
  },
  demo: {
    root: "./demo",
    css: "./demo/css",
    htmlScriptPath:
      '<script src="js/vendor.min.js"></script>\n\t\t<script src="js/slider-bundle.min.js"></script>'
  }
};

gulp.task("copySrcCSSToDemo", function() {
  gulp.src(PATHS.src.css + "/**/*").pipe(gulp.dest(PATHS.demo.css));
});

gulp.task("copySrcHTMLToDemo", function() {
  gulp
    .src(PATHS.src.root + "/index.html")
    .pipe(replace(PATHS.src.htmlScriptPath, PATHS.demo.htmlScriptPath))
    .pipe(gulp.dest(PATHS.demo.root));
});

gulp.task("updateDemoSourceJS", function() {
  gulp
    .src(PATHS.src.js + "/app.js")
    .pipe(replace(PATHS.src.sliderImportPath, PATHS.demosrc.sliderImportPath))
    .pipe(rename("appbuild.js"))
    .pipe(gulp.dest(PATHS.demosrc.js));
});

gulp.task("buildDemoFiles", function(done) {
  gulp.series(["copySrcCSSToDemo", "copySrcHTMLToDemo", "updateDemoSourceJS"]);
  done();
});
