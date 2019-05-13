exports.config = {
  module: {
    rules: [
      // Fonts
      {
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: "fonts/[name].[ext]",
            publicPath: "../",
          }
        }
      }
    ]
  }
};
