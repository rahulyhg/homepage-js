var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
      app: [
        "./src/content/scss/main.scss",
        "./src/app/app.js"
      ]
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.html$/, loader: "html-loader?minimize=false" },
            { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
            { test: /\.(png|jpg|jpeg)$/,
              loader: "url-loader?limit=10000!image-webpack-loader",
              query: {
                optipng: {
                  optimizationLevel: 1,
                },
              },
            },
          ],
        // rules: [
        //   {
        //     test: /\.html$/,
        //     use: "html-loader"
        //   },
        //   {
        //     test: /\.css$/,
        //     use: ExtractTextPlugin.extract([ "css-loader" ])
        //   },
        //   {
        //     test: /\.scss$/,
        //     use: ExtractTextPlugin.extract([ "css-loader", "sass-loader" ])
        //   },
        // ],
    },
    devServer: {
      host : "0.0.0.0",
      port: 8080,
      inline: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    plugins: [
      new ExtractTextPlugin("[name].css"),
      new HtmlWebpackPlugin({
        template: "src/index.html",
        inject: "head"
      }),
      new CopyWebpackPlugin([
        { from: "src/content/static", to: "static" }
      ])
    ]
};
