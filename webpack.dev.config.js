var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel?presets[]=react,presets[]=es2015']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      },
      {
        test: /\.svg/,
        loader: 'svg-url-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
