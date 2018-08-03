const webpack = require("webpack");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const paths = require("./../paths");

module.exports = {
  module: {
    strictExportPresence: true,

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
        loader: "url-loader?limit=10000&mimetype=",
        options: {
          limit: 10000,
          mimetype: "application/font-woff",
          name: "fonts/[name].[ext]"
        }
      },

      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
      },

      {
        test: /\.(js|jsx|mjs)$/,
        include: paths.appSrc,
        loader: require.resolve("babel-loader"),
        options: {
          compact: true
        }
      },

      {
        test: /\.(ts|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true
            }
          }
        ]
      },

      {
        test: /\.otf(\?.*)?$/,
        use:
          "file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf"
      }
    ]
  },

  plugins: [
    // Perform type checking and linting in a separate process to speed up compilation
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: paths.appSrc,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint
    })
  ],

  resolve: {
    modules: ["node_modules", paths.appSrc],

    extensions: [
      ".mjs",
      ".web.ts",
      ".ts",
      ".web.tsx",
      ".tsx",
      ".web.js",
      ".js",
      ".json"
    ],

    alias: {
      "../../theme.config$": paths.semanticThemeConfig
    }
  }
};
