var path = require('path');
var webpack = require('webpack');
'use strict';
/* eslint-disable no-var, strict, prefer-arrow-callback */

var babelOptions = {
  "presets": ["latest"]
};

module.exports = {
  cache: true,
  entry: {
    main: './src/main.ts',
  },
  output: {
    path: path.resolve(__dirname, './dist/scripts'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        }
      ]
    }]
  },
  plugins: [
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
};