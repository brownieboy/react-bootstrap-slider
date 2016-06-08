/* global require, __dirname */
// Note: I tried renaming this file to gulpfile.babel.js in order to use
// ES6 syntax here, but it was way too slow in operation.  So we're stuck
// with Node-style CommonJS require statments for now

var gulp = require("gulp");
var runSequence = require("run-sequence");
var path = require("path");
// var domSrc = require("gulp-dom-src");
var del = require("del");
var open = require("open");
var print = require("gulp-print");
var inject = require("gulp-inject");
var htmlreplace = require("gulp-html-replace");
var replace = require("gulp-replace");
var gulpConcat = require("gulp-concat");
var cleanCSS = require("gulp-clean-css");
// var webpack = require("webpack");
// var gutil = require("gulp-util");
// var webpackConfig = require("./webpack.config.babel.js");

var sublimeServerPort = "8082";

var ROOT_PATH = path.resolve(__dirname);
var CURRENT_FOLDER = path.basename(ROOT_PATH);

var PATHS = {
    src: {
        root: "./src",
        css: "./src/css",
        fonts: "./src/fonts",
        jslibsArray: ["bower_components/jquery/dist/jquery.min.js"],
        images: "./src/images",
        localApis: "./src/js/localapis"
    },
    build: {
        root: "./build",
        css: "./build/css",
        targetCSSFileName: "reinsurance.css",
        fonts: "./build/fonts",
        js: "./build/js",
        jslibs: "./build/js/libs",
        images: "./build/images",
        localApis: "./build/js/localapis"
    },
    vendor: {
        targetCSSFileName: "vendor.css",
        bootstrap: {
            source: {
                css: "./node_modules/bootstrap/dist/css"
            }
        },
        kendo: {
            source: {
                css: "./bower_components/kendo-ui/styles",
                images: "./bower_components/kendo-ui/styles/images",
                default: {
                    images: "./bower_components/kendo-ui/styles/Default"
                }
            },
            build: {
                images: "./build/css/images",
                default: {
                    images: "./build/css/Default"
                }
            }
        }
    },
    screenshots: "./screenshots",
    devServer: "m:/html/mike/replace/table-test",
    buildURL: CURRENT_FOLDER + "/build/index.html",
    doco: CURRENT_FOLDER + "/docs/esdoc/index.html"
};

// var SELECTORS = {
//     vendorCSSSelector: "link[data-copyvendorcss='true']"
// };

var htmlFilesArray = ["alltables", "singleadmintable", "manytomanylinkage", "onetomany", "index", "index-ui"];
var bootstrapCSSArray = ["bootstrap.min.css"];
var kendoCSSArray = ["kendo.common.min.css", "kendo.default.min.css", "kendo.mobile.all.min.css", "kendo.rtl.min.css"];
var localCSSArray = ["site.css", "kendo.overrides.css", "tables.css", "main.css"];

// Copy assets from src to build folder, cleaning that folder out first
gulp.task("cleanBuild", function() {
    return del(PATHS.build.root + "/**/*");
});

// gulp.task("copyLocalCSS", function() {
//     gulp.src(PATHS.src.css + "/**/*")
//         .pipe(print())
//         .pipe(gulp.dest(PATHS.build.css));
// });

gulp.task("copyLocalCSSAndConcat", function() {

    var localCSSRefsArray = localCSSArray.map(function(element) {
        return PATHS.src.css + "/" + element;
    });

    gulp.src(localCSSRefsArray)
        .pipe(gulpConcat(PATHS.build.targetCSSFileName))
        .pipe(print())
        .pipe(cleanCSS())
        .pipe(gulp.dest(PATHS.build.css));
});



gulp.task("copyVendorCSSToLocal", function() {
    // Copy CSS files from vendor paths  (in node_modules or bower_components) to local build/css folder
    var bootstrapCSSPathsArray = bootstrapCSSArray.map(function(element) {
        return PATHS.vendor.bootstrap.source.css + "/" + element;
    });

    var kendoCSSPathsArray = kendoCSSArray.map(function(element) {
        return PATHS.vendor.kendo.source.css + "/" + element;
    });

    var allCSSPathsArray = bootstrapCSSPathsArray.concat(kendoCSSPathsArray);

    // gulp.src(bootstrapCSSPathsArray)
    //     .pipe(print())
    //     .pipe(gulp.dest(PATHS.build.css));

    // gulp.src(kendoCSSPathsArray)
    //     .pipe(print())
    //     .pipe(replace(/\?v=1.1/g, ""))
    //     .pipe(gulp.dest(PATHS.build.css));
    gulp.src(allCSSPathsArray)
        .pipe(print())
        .pipe(replace(/\?v=1.1/g, ""))
        .pipe(gulpConcat(PATHS.vendor.targetCSSFileName))
        .pipe(gulp.dest(PATHS.build.css));
});


// gulp.task("copyFonts", function() {
//     gulp.src(PATHS.src.fonts + '/**/*")
//         .pipe(gulp.dest(PATHS.build.fonts));
// });


gulp.task("copyLocalImages", function() {
    gulp.src(PATHS.src.images + "/**/*")
        .pipe(print())
        .pipe(gulp.dest(PATHS.build.images));
});

gulp.task("copyLocalAPIs", function() {
    gulp.src(PATHS.src.localApis + "/**/*")
        .pipe(print())
        .pipe(gulp.dest(PATHS.build.localApis));
});

gulp.task("copyKendoImages", function() {
    gulp.src(PATHS.vendor.kendo.source.images + "/**/*")
        .pipe(print())
        .pipe(gulp.dest(PATHS.vendor.kendo.build.images));
});

gulp.task("copyKendoDefaultImages", function() {
    gulp.src(PATHS.vendor.kendo.source.default.images + "/**/*")
        .pipe(print())
        .pipe(gulp.dest(PATHS.vendor.kendo.build.default.images));
});

gulp.task("copyImages", ["copyLocalImages", "copyKendoImages", "copyKendoDefaultImages"]);



// Need to get these out of the /src folder, otherwise doco tools and maybe
// even Webpack will try to operate over them.  We grab the .map files too.
gulp.task("copyJsLibs", function() {
    var libsMapsArray = PATHS.src.jslibsArray.map(function(jsPath) {
        return jsPath.replace(".js", ".map");
    });
    var libsWithMapsArray = PATHS.src.jslibsArray.concat(libsMapsArray);
    for (var x = 0; x < libsWithMapsArray.length; x++) {
        gulp.src(libsWithMapsArray[x])
            .pipe(print())
            .pipe(gulp.dest(PATHS.build.jslibs));
    }
});

gulp.task("copyMisc", function() {
    gulp.src([PATHS.src.root + "/favicon.ico"])
        .pipe(gulp.dest(PATHS.build.root));
});


gulp.task("copyHTMLAndInjectBuildRefs", function() {
    // Copy all the HTML files over and inject the correct JS script tags, consisting of:
    //    * any JS files in the /build/js/libs folder
    //    * the file /build/js/vendor.js
    //    * a page specific JS file, which has the same name as its corresponding value in htmlFilesArray

    var jsRefsArray, jsRefsToInject;
    var jsFixedRefsArray = [PATHS.build.jslibs + "/*.js", PATHS.build.js + "/vendor.js"]; // These libs added to every HTML file.


    // var bootstrapCSSRefsArray = bootstrapCSSArray.map(function(element) {
    //     return PATHS.build.css + "/" + element;
    // });

    // var kendoCSSRefsArray = kendoCSSArray.map(function(element) {
    //     return PATHS.build.css + "/" + element;
    // });

    var vendorCSSRefsArray = [PATHS.build.css + "/" + PATHS.vendor.targetCSSFileName];
    var localCSSRefsArray = [PATHS.build.css + "/" + PATHS.build.targetCSSFileName];

    // var allCSSRefsArray = bootstrapCSSRefsArray.concat(kendoCSSRefsArray, localCSSRefsArray);
    var allCSSRefsArray = vendorCSSRefsArray.concat(localCSSRefsArray);

    var cssRefsToInject = gulp.src(allCSSRefsArray, {
        read: false
    });

    // Loop through the list of html files...
    for (var x = 0; x <= htmlFilesArray.length; x++) {
        // Work out which script tags will be injected into this html file
        jsRefsArray = jsFixedRefsArray.concat(PATHS.build.js + "/" + htmlFilesArray[x] + ".js"); // Also add in page specific JS file.

        jsRefsToInject = gulp.src(jsRefsArray, {
            read: false
        });

        gulp.src([PATHS.src.root + "/" + htmlFilesArray[x] + ".html"])
            .pipe(gulp.dest(PATHS.build.root))
            .pipe(htmlreplace()) // Remove dev script tags
            .pipe(inject(jsRefsToInject, { // Inject prod script tags
                name: "injectjs",
                relative: true
            }))
            .pipe(inject(cssRefsToInject, { // Inject prod script tags
                name: "injectcss",
                relative: true
            }))
            .pipe(gulp.dest("./build"));
    }
});


gulp.task("buildAssets", ["copyMisc", "copyImages", "copyLocalAPIs", "copyHTMLAndInjectBuildRefs"]);

gulp.task("buildAll", function() {
    runSequence("cleanBuild", "copyJsLibs", "webpack", "buildAssets", "openBuildSublimeServerIE");

    // "gulp cleanBuild && gulp copyJsLibs && npm run build && gulp buildAssets && gulp openBuildSublimeServerIE",
});

gulp.task("openBuildSublimeServerIE", function() {
    // gulp.src(__filename)
    // .pipe(open({uri: "http://localhost:' + sublimeServerPort + "/" + PATHS.buildURL}));
    open("http://localhost:" + sublimeServerPort + "/" + PATHS.buildURL, "iexplore");
});

gulp.task("buildAssetsAndOpenBuild", ["buildAssets", "openBuildSublimeServer"]);

gulp.task("openDoco", function() {
    // gulp.src(__filename)
    // .pipe(open({uri: "http://localhost:' + sublimeServerPort + "/" + PATHS.buildURL}));
    open("http://localhost:" + sublimeServerPort + "/" + PATHS.doco);
});

gulp.task("cleanScreenshotsFolder", function() {
    return del(PATHS.screenshots + "/**/*");
});

// gulp.task("misc", function() {
//     console.log("ROOT_PATH=" + ROOT_PATH, "_dirname = " + __dirname);
//     console.log("base=" + path.basename(ROOT_PATH));
// });
