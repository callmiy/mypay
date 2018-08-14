const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");

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

    [paths.appEntries.commonsStyles.name]: paths.appEntries.commonsStyles.path,

    [paths.appEntries.indexRouteJs.name]: paths.appEntries.indexRouteJs.path,

    [paths.appEntries.indexRouteCss.name]: paths.appEntries.indexRouteCss.path,

    [paths.appEntries.shiftRouteJs.name]: paths.appEntries.shiftRouteJs.path,

    [paths.appEntries.shiftRouteCss.name]: paths.appEntries.shiftRouteCss.path,

    [paths.appEntries.newMetaFormComponentCss.name]:
      paths.appEntries.newMetaFormComponentCss.path
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
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),

    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),

    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),

    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],

  performance: {
    hints: false
  }
});
