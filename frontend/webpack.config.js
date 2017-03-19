module.exports = {
    entry: {
      app: [
        "./content/scss/main.scss",
        "./app/app.js"
      ]
    },
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/},
          ]
        },

    devServer: {
      host : "0.0.0.0",
      port: 8080,
      inline: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
};
