const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = !!process.argv.find(v => v.indexOf('production') !== -1);

exports.config = {
  module: {
    rules: [
      // Sass
      {
        test: /\.s(a|c)ss$/,
        use: [
          !isProduction
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePath: ['/node_modules/']
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
};
