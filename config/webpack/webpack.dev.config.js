// * Global
const path = require('path');
const merge = require('webpack-merge');
// * Project modules
const CommonConfig = require("./webpack.base.config");
// * Helpers
const isProduction = !!process.argv.find(v => v.indexOf('production') !== -1);
function resolve(dir) {
  return path.join(__dirname, '../..', dir);
}

const PATH = {
  source: resolve("src"),
  dist: resolve("app/content/themes/export-stroy-theme-main/assets")
};

const DevConfig = {
  mode: 'development',
  devtool: "eval-source-map",
  entry: path.join(PATH.source, 'main.js'),
  output: {
    path: PATH.dist,
    filename: "js/[name].js",
    chunkFilename: "js/[name].bundle.js"
  },
};

module.exports = merge(
  CommonConfig,
  DevConfig,
);
