/* eslint-env node */


// import path from "path";
// import webpack from "webpack";
// import merge from "webpack-merge";
var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
const validate = require("webpack-validator");

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const srcDir = path.join(__dirname, "src");

var exportModule;


const common = {
    entry: {
        app: path.resolve(ROOT_PATH) + "/src/js/app.jsx"
    },
    // resolve: {
    //     modulesDirectories: ["node_modules", "bower_components"]
    // },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, "src/js")],
            loader: "babel", // "babel-loader" is also a legal name to reference
            query: {
                presets: ["react", "es2015"]
            }
        }]
    },
    devtool: "source-map"
};

if (TARGET === "buildDemowp") {
    exportModule = merge(common, {
        entry: {
            app: path.resolve(ROOT_PATH) + "/demosrc/js/appbuild.jsx"
        },
        output: {
            path: path.resolve(ROOT_PATH, "demo/js/"),
            filename: "slider-bundle.min.js"
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, "demosrc/js")],
                loader: "babel", // "babel-loader" is also a legal name to reference
                query: {
                    presets: ["react", "es2015"]
                }
            }]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.min.js", function(module) {
                return module.resource && module.resource.indexOf(srcDir) === -1;
            })
        ]
    });
}

if (TARGET === "start" || !TARGET) {
    exportModule = merge(common, {
        output: {
            filename: "src/main.js"
        },
        devServer: {
            noInfo: false,
            historyApiFallback: true,
            // hot: true,
            inline: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

module.exports = validate(exportModule);
