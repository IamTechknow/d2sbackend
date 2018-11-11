const path = require('path');

const ROOT = path.resolve(__dirname, 'src/main/webapp');
const SRC = path.resolve(ROOT, 'js');
const DEST = path.resolve(__dirname, 'src/main/webapp/dist');

module.exports = {
  entry: {
    app: `${SRC}/index.jsx`,
  },
  devtool: 'source-map',
  mode: 'development',
  cache: true,
  output: {
    path: DEST,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
