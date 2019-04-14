// * Global
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
// * Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// * Loaders
const scriptLoader = require('./loader/script.loader');
const styleLoader = require('./loader/style.loader');
const fontLoader = require('./loader/font.loader');
const imageLoader = require('./loader/image.loader');
const templateLoader = require('./loader/template.loader');

const PATH = {
  source: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
};

const isDevServer = !!process.argv.find(
  v => v.indexOf("webpack-dev-server") !== -1
);

// Config
let devServerConfig = function() {
  return {
    port: 3000,
    quiet: true,
    compress: true,
    overlay: true,
  };
};

const devConfig = {
  mode: 'development',
  entry: path.join(PATH.source, 'main.js'),
  output: {
    path: PATH.dist,
    filename: "main.js"
  },
  devServer: isDevServer ? devServerConfig() : {}
};

const devPlugins = {
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: 'index.html',
      template: path.join(PATH.source, 'template/index.pug')
    }),
    new FriendlyErrorsPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        message: [
          isDevServer
          ? "Your application is running here http://localhost:3000"
          : "Your application is build here " + PATH.dist
        ]
      }
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = merge(
  devConfig,
  devPlugins,
  scriptLoader.config,
  styleLoader.config,
  fontLoader.config,
  imageLoader.config,
  templateLoader.config,
);
