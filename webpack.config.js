/* eslint-env node */

// import path from "path";
// import webpack from "webpack";
// import merge from "webpack-merge";
const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const srcDir = path.join(__dirname, "src");

let exportModule;

const common = {
  mode: "production",
  entry: {
    app: path.resolve(ROOT_PATH) + "/src/js/app.js"
  },
  // resolve: {
  //     modulesDirectories: ["node_modules", "bower_components"]
  // },
  resolve: {
    alias: {
      jquery: path.join(srcDir, "js/stubs/jquery-stub.js")
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "src/js")],
        loader: "babel-loader" // "babel-loader" is also a legal name to reference
        // query: {
        //   presets: ["react", "es2015"]
        // }
      }
    ]
  },
  devtool: "source-map"
};

/*
 optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
        },
      }),
    ],
  },
*/

if (TARGET === "buildDemowp") {
  exportModule = merge(common, {
    entry: {
      app: path.resolve(ROOT_PATH) + "/demosrc/js/appbuild.js"
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "initial",
            test: path.resolve(__dirname, "node_modules"),
            name: "vendor",
            enforce: true
          }
        }
      },
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true
        })
      ]
    },
    output: {
      path: path.resolve(ROOT_PATH, "demo/js/"),
      filename: "slider-bundle.min.js"
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: [path.resolve(__dirname, "demosrc/js")],
          loader: "babel-loader" // "babel-loader" is also a legal name to reference
          // query: {
          //   presets: ["react", "es2015"]
          // }
        }
      ]
    },
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.min.js", function(module) {
      //   return module.resource && module.resource.indexOf(srcDir) === -1;
      // })
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: "vendor",
      //   filename: "vendor.min.js",
      //   minChunks: module => {
      //     const userRequest = module.userRequest;
      //     // module.userRequest returns name of file, including path
      //     return (
      //       userRequest &&
      //       userRequest.match(/\.js$/) &&
      //       userRequest.indexOf("node_modules") >= 0
      //     );
      //   }
      // }),
      new webpack.DefinePlugin({
        "process.env": { NODE_ENV: '"production"' } // eslint-disable-line quotes
      }),
      // new webpack.optimize.UglifyJsPlugin({
      //   sourceMap: true,
      //   compress: {
      //     warnings: false
      //   }
      // }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })
    ]
  });
}

if (TARGET === "start" || !TARGET) {
  exportModule = merge(common, {
    mode: "development",
    output: {
      filename: "src/main.js"
    },
    devServer: {
      noInfo: false,
      historyApiFallback: true,
      // hot: true,
      inline: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  });
}

module.exports = exportModule;
