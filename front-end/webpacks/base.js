const webpack = require("webpack");
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },

      {
        test: /\.s(css|ass)$/,
        loaders: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false"
        ]
      },

      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },

      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },

      {
        test: /\.otf(\?.*)?$/,
        use:
          "file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf"
      }
    ]
  },

  plugins: [],

  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "../src")],
    extensions: [".js"],
    alias: {
      "../../theme.config$": path.resolve(
        __dirname,
        "../semantic-theme/theme.config"
      )
    }
  },

  performance: {
    hints: false
  }
};
