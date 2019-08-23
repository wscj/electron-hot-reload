const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, '/dist/index.html'),
      template: path.join(__dirname, '/index.html'),
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/react', '@babel/env']
        }
      }
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }]
    }]
  },
  target: 'electron-renderer',
  devServer: {
    port: 3000,
    publicPath: 'http://localhost:3000/static/',
    hot: true,
    historyApiFallback: true,
    host: 'localhost',
  }
}
