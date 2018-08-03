// production config
const merge = require("webpack-merge");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./base");
const paths = require("./../paths");

module.exports = merge(baseConfig, {
  mode: "production",

  entry: {
    [paths.appEntries.commons.name]: paths.appEntries.commons.path,

    [paths.appEntries.commonsStyles.name]:
      paths.appEntries.commonsStyles.styles,

    [paths.appEntries.indexRouteJs.name]: paths.appEntries.indexRouteJs.path
  },

  output: {
    path: paths.appBuild,
    filename: "[name].js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },

      {
        test: /\.s(css|ass)$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },

  devtool: "source-map",

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
