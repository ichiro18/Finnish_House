const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = !!process.argv.find(v => v.indexOf('production') !== -1);

exports.config = {
  module: {
    rules: [
      // SASS
      {
        test: /\.s([a|c])ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].bundle.css',
    })
  ]
};
