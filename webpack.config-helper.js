"use strict";

const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractSASS = new ExtractTextPlugin("styles/bundle.[hash].css");

module.exports = options => {
  const dest = path.join(__dirname, "dist");

  let webpackConfig = {
    devtool: options.devtool,
    entry: ["./src/scripts/index"],
    output: {
      path: dest,
      filename: "bundle.[hash].js"
    },
    plugins: [
      new Webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(
            options.isProduction ? "production" : "development"
          )
        }
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: options.isProduction && {
          collapseWhitespace: true,
          conservativeCollapse: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["env"]
            }
          }
        },
        // Makes enable loading of txt files
        // {
        //   test: /\.txt$/,
        //   use: "raw-loader"
        // }
        // Include reading of csv/tsv files in build
        {
          test: /\.(csv|tsv)$/,
          use: {
            loader: "csv-loader",
            options: {
              skipEmptyLines: true
            }
          }
        }
      ]
    },
    target: "web",
    node: {
      fs: "empty"
    }
  };

  if (options.isProduction) {
    webpackConfig.entry = ["./src/scripts/index"];

    webpackConfig.plugins.push(
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      ExtractSASS
    );

    webpackConfig.module.rules.push({
      test: /\.s?css/i,
      use: ExtractSASS.extract([
        "css-loader?sourceMap=true&minimize=true",
        "sass-loader"
      ])
    });
  } else {
    webpackConfig.plugins.push(new Webpack.HotModuleReplacementPlugin());

    webpackConfig.module.rules.push(
      {
        test: /\.s?css$/i,
        use: ["style-loader", "css-loader?sourceMap=true", "sass-loader"]
      },
      {
        test: /\.js$/,
        use: "eslint-loader",
        exclude: /node_modules/
      }
    );

    webpackConfig.devServer = {
      contentBase: dest,
      hot: true,
      port: options.port,
      inline: true
    };
  }

  return webpackConfig;
};
