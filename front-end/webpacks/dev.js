const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./base");

module.exports = merge(baseConfig, {
  mode: "development",

  entry: {
    app: [
      "webpack-dev-server/client?http://localhost:8080", // bundle the client for webpack-dev-server and connect to the provided endpoint
      "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
      "./src/index.js" // the entry point of our app
    ],
    styles: ["./src/index.scss", "./semantic-theme/semantic.less"]
  },

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
    publicPath: "http://localhost:8080/"
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
  ]
});
