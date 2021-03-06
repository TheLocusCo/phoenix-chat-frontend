var path = require('path')
var webpack = require('webpack')
var cssnext = require('postcss-cssnext')

module.exports = {
  devtool: 'eval',
  entry: [
    "whatwg-fetch",
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:3000',
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]!postcss',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js' ],
    fallback: path.join(__dirname, "node_modules")
  },
  resolveLoader: {
    fallback: path.join(__dirname, "node_modules")
  },
  postcss: function () {
    return [cssnext]
  }
}
