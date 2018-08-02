// production config
const merge = require("webpack-merge");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./base");

module.exports = merge(baseConfig, {
  mode: "production",

  entry: {
    app: "./src/index.js",
    styles: ["./src/index.scss", "./semantic-theme/semantic.less"]
  },

  output: {
    path: path.resolve(__dirname, "./../priv/static/js"),
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
