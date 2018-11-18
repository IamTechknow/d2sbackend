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
      {
        test: /\.css$/,
        use: [ { loader: 'style-loader' }, { loader: 'css-loader' }, {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer'),
              require('cssnano')
            ]
          }
        }],
        include: SRC
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
                require('cssnano')
              ]
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ],
  },
};
