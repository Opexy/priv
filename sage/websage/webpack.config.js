const path = require('path');
//var webpack = require('webpack');

module.exports = {
  entry: './src/ddd.js',
//  target:'web',
  module: {
    rules: [
//      {
//        test: /\.js$/,
        //loader: '/usr/local/lib/node_modules/babel-loader',
//        exclude: /node_modules/
//      },
      {
        test: /\.tsx?$/,
        use: '/usr/local/lib/node_modules/ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    fallback: {
      fs:false,
      util:false,
      path:require.resolve("path-browserify")
    }
  },
  devtool: 'source-map',
  experiments:{
    topLevelAwait:true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build/javascript'),
  },
};
