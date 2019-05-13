// * Global
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const packageConfig = require("../../package.json");
// * Plugins
const ManifestWebpackPlugin = require("webpack-manifest-plugin");
const DuplicateWebpackPlugin = require("duplicate-package-checker-webpack-plugin");
const DotEnvWebpackPlugin = require("dotenv-webpack");
const CaseSensetivePathsWebpackPlugin = require("case-sensitive-paths-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// * Loaders
const scriptLoader = require('./loader/script.loader');
const styleLoader = require('./loader/style.loader');
const fontLoader = require('./loader/font.loader');
const imageLoader = require('./loader/image.loader');

// * Helpers
const isProduction = !!process.argv.find(v => v.indexOf('production') !== -1);
function resolve(dir) {
  return path.join(__dirname, '../..', dir);
}

const PATH = {
  source: resolve("src"),
  dist: resolve("app/content/themes/export-stroy-theme-main/assets")
};


const CommonConfig = {
  resolve: {
    modules: ["node_modules", PATH.source],
    alias: {
      "@project_src": resolve("src"),
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          enforce: true
        },
        commons: {
          chunks: "all",
          name: "common",
          minChunks: 2,
          enforce: true
        }
      }
    },
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
  }
};

const CommonPlugins = {
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    // Env
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isProduction ? '"production"' : '"development"',
        version: packageConfig.version,
      }
    }),
    new DotEnvWebpackPlugin({
      path: path.join(resolve(""), ".env"),
      safe: false
    }),
    // manifest
    new ManifestWebpackPlugin(),
    // dublicate packages
    new DuplicateWebpackPlugin({
      // Also show module that is requiring each duplicate package (default: false)
      verbose: true,
      // Emit errors instead of warnings (default: false)
      emitError: false,
      // Show help message if duplicate packages are found (default: true)
      showHelp: true,
      // Warn also if major versions differ (default: true)
      strict: false,
      /**
       * Exclude instances of packages from the results.
       * If all instances of a package are excluded, or all instances except one,
       * then the package is no longer considered duplicated and won't be emitted as a warning/error.
       * @param {Object} instance
       * @param {string} instance.name The name of the package
       * @param {string} instance.version The version of the package
       * @param {string} instance.path Absolute path to the package
       * @param {?string} instance.issuer Absolute path to the module that requested the package
       * @returns {boolean} true to exclude the instance, false otherwise
       */
      exclude(instance) {
        return instance.name === "fbjs";
      }
    }),
    // correct paths
    new CaseSensetivePathsWebpackPlugin(),
    // progress
    new webpack.ProgressPlugin(),
    new FriendlyErrorsPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        message: [
          !isProduction
          ? "Your application is running here http://export-stroy.local"
          : "Your application is build here " + PATH.dist
        ]
      }
    }),
    // new CleanWebpackPlugin({
    //   dry: false,
    //   verbose: true,
    //   cleanOnceBeforeBuildPatterns: [PATH.dist]
    // }),
  ]
};

module.exports = merge(
  CommonConfig,
  CommonPlugins,
  // loaders
  scriptLoader.config,
  styleLoader.config,
  fontLoader.config,
  imageLoader.config,
);
