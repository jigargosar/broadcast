/* eslint-env node */

const debug = require('debug')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const log = debug('app:webpack')
const pth = path.resolve
const srcPath = pth('src')

log('srcPath :', srcPath)

module.exports = {
  context: pth(__dirname),
  entry: './src/index.js',
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.elm$/,
        include: [srcPath],
        use: [
          // { loader: 'elm-hot-webpack-loader' },
          {
            loader: 'elm-webpack-loader',
            options: {
              // cwd: path.join(__dirname, '../'),
              debug: true,
            },
          },
        ],
      },
      {
        test: [
          //
          /\.jsx?$/,
          /\.tsx?$/,
        ],
        include: srcPath,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                //
                '@babel/react',
                // '@babel/typescript',
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Broadcast',
    }),
  ],
  // devtool: 'cheap-module-source-map',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    inline: true,
    stats: 'errors-only',
    hot: true,
    overlay: true,
  },
}
