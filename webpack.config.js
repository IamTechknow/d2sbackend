var path = require('path');
var webpack = require('webpack')
var ROOT = path.resolve(__dirname, 'src/main/webapp');
var SRC = path.resolve(ROOT, 'js');
var DEST = path.resolve(__dirname, 'src/main/webapp/dist');

module.exports = {
  entry: {
    app: SRC + '/index.jsx',
  },
  devtool: 'source-map',
  mode: 'development',
  cache: true,
  output: {
      path: DEST,
      filename: 'bundle.js',
      publicPath: '/dist/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
      }
    ]
  },
};
