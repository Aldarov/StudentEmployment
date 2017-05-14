const merge = require('webpack-merge');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const devserver = require('./webpack/devserver');

const PATHS = {
  source: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build')
};

const common = {
  entry: PATHS.source + '/index.js',
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'react-hot-loader' }, //убрать в продакшене
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-2']
            }
          }
        ]
    }]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: PATHS.source + '/index.html'
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  }
};

module.exports = function(env) {
  if (env === 'production') {
    return merge([
      common
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      devserver(),
      {devtool: 'cheap-module-eval-source-map'}
    ]);
  }
};
