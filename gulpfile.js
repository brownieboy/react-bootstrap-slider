/* eslint-env node */

var gulp = require("gulp");
// var runSequence = require("run-sequence");
var path = require("path");
var replace = require("gulp-replace");


var PATHS = {
   src: {
      js: "./src/js",
      sliderImportPath: "import ReactBootstrapSlider from \"./react-bootstrap-slider.jsx\""
   },
   demosrc: {
      js: "./demosrc/js",
      sliderImportPath: "import ReactBootstrapSlider from \"../../dist/react-bootstrap-slider.js\""

   }
};


gulp.task("updateDemoSourceJS", function() {

    gulp.src(PATHS.src.js + "/app.jsx")
        .pipe(replace(/\?v=1.1/g, ""))
        .pipe(gulp.dest(PATHS.demosrc/js + "/app2.jsx"));
});