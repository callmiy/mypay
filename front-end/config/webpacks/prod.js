// production config
const merge = require("webpack-merge");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob-all");
const baseConfig = require("./base");
const paths = require("./../paths");

module.exports = merge(baseConfig, {
  mode: "production",

  entry: {
    [paths.appEntries.commons.name]: paths.appEntries.commons.path,

    [paths.appEntries.commonsStyles.name]: paths.appEntries.commonsStyles.path,

    [paths.appEntries.indexRouteJs.name]: paths.appEntries.indexRouteJs.path,

    [paths.appEntries.indexRouteCss.name]: paths.appEntries.indexRouteCss.path,

    [paths.appEntries.shiftRouteJs.name]: paths.appEntries.shiftRouteJs.path,

    [paths.appEntries.shiftRouteCss.name]: paths.appEntries.shiftRouteCss.path,

    [paths.appEntries.newMetaFormComponentCss.name]:
      paths.appEntries.newMetaFormComponentCss.path
  },

  output: {
    path: paths.appBuild,
    filename: "[name].js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: true
            }
          },

          "postcss-loader"
        ]
      },

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
      paths: glob.sync([
        `${paths.phoenixTemplatePath}/**/*.html.eex`,
        `${paths.appSrc}/**/*.ts`
      ])
    }),

    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,

      filename: "service-worker.js",

      logger(message) {
        if (message.indexOf("Total precache size is") === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf("Skipping static resource") === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },

      minify: true,

      // For unknown URLs, fallback to the index page
      navigateFallback: "/",

      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],

      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),

      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } }
      })
    ]
  }
});
