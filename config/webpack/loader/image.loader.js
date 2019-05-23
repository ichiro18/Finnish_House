const path = require('path')

exports.config = {
  module: {
    rules: [
      // Image
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            context: path.join('./src/images'),
            name: "images/[path][name].[ext]",
            publicPath: "../",
          }
        }
      },
    ]
  }
};
