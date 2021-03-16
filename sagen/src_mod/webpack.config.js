const path = require('path');
//var webpack = require('webpack');

module.exports = {
  entry: './src/src_mod.js',
  mode:"development",
  target:'node',
  module: {
    rules: [
//      {
//        test: /\.js$/,
        //loader: '/usr/local/lib/node_modules/babel-loader',
//        exclude: /node_modules/
//      },

    ],
  },
  resolve: {
    extensions: ['.js' ],
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
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
