// production config
const merge = require("webpack-merge");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob-all");
const baseConfig = require("./base");
const paths = require("./../paths");

module.exports = merge(baseConfig, {
  mode: "production",

  entry: {
    [paths.appEntries.commons.name]: paths.appEntries.commons.path,

    [paths.appEntries.commonsStyles.name]:
      paths.appEntries.commonsStyles.styles,

    [paths.appEntries.indexRouteJs.name]: paths.appEntries.indexRouteJs.path,

    [paths.appEntries.indexRouteCss.name]:
      paths.appEntries.indexRouteCss.styles,

    [paths.appEntries.shiftRouteJs.name]: paths.appEntries.shiftRouteJs.path,

    [paths.appEntries.shiftRouteCss.name]:
      paths.appEntries.shiftRouteCss.styles,

    [paths.appEntries.newMetaFormComponentCss.name]:
      paths.appEntries.newMetaFormComponentCss.styles,

    [paths.appEntries.newMetaFormComponentJs.name]:
      paths.appEntries.newMetaFormComponentJs.path
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
    }),

    new PurifyCSSPlugin({
      paths: glob.sync([`${paths.phoenixTemplatePath}/**/*.html.eex`])
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
