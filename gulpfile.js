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
