/* eslint-env node */

var gulp = require("gulp");
var rename = require("gulp-rename");
// var path = require("path");
var replace = require("gulp-replace");


var PATHS = {
    src: {
        root: "./src",
        js: "./src/js",
        css: "./src/css",
        sliderImportPath: "import ReactBootstrapSlider from \"./react-bootstrap-slider.jsx\"",
        htmlScriptPath: "<script src=\"main.js\"></script>"
    },
    demosrc: {
        js: "./demosrc/js",
        sliderImportPath: "import ReactBootstrapSlider from \"../../dist/react-bootstrap-slider.js\""
    },
    demo: {
        root: "./demo",
        css: "./demo/css",
        htmlScriptPath: "<script src=\"js/vendor.min.js\"></script>\n\t\t<script src=\"js/slider-bundle.min.js\"></script>"
    }
};


gulp.task("copySrcCSSToDemo", function() {
    gulp.src(PATHS.src.css + "/**/*")
        .pipe(gulp.dest(PATHS.demo.css));
});

gulp.task("copySrcHTMLToDemo", function() {
    gulp.src(PATHS.src.root + "/index.html")
        .pipe(replace(PATHS.src.htmlScriptPath, PATHS.demo.htmlScriptPath))
        .pipe(gulp.dest(PATHS.demo.root));
});

gulp.task("updateDemoSourceJS", function() {

    gulp.src(PATHS.src.js + "/app.jsx")
        .pipe(replace(PATHS.src.sliderImportPath, PATHS.demosrc.sliderImportPath))
        .pipe(rename("appbuild.jsx"))
        .pipe(gulp.dest(PATHS.demosrc.js));
});

gulp.task("buildDemoFiles", ["copySrcCSSToDemo", "copySrcHTMLToDemo", "updateDemoSourceJS"]);
