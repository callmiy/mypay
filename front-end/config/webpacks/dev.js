const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./base");
const paths = require("./../paths");

module.exports = merge(baseConfig, {
  mode: "development",

  entry: {
    [paths.appEntries.commons.name]: [
      "webpack-dev-server/client?http://localhost:8080", // bundle the client for webpack-dev-server and connect to the provided endpoint
      "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
      paths.appEntries.commons.path // the entry point of our app
    ],

    [paths.appEntries.commonsStyles.name]:
      paths.appEntries.commonsStyles.styles,

    [paths.appEntries.indexRouteJs.name]: paths.appEntries.indexRouteJs.path,

    [paths.appEntries.indexRouteCss.name]: paths.appEntries.indexRouteCss.styles
  },

  output: {
    path: paths.appPublic,
    filename: "[name].js",
    publicPath: "http://localhost:8080/",
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },

  devServer: {
    hot: true, // enable HMR on the server
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },

  devtool: "cheap-module-eval-source-map",

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updates
  ],

  performance: {
    hints: false
  }
});
