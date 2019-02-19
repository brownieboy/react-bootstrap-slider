var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/react-bootstrap-slider.js",
  output: {
    path: path.resolve("dist"),
    filename: "react-bootstrap-slider.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      }
    ]
  }
};
