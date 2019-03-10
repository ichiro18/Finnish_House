exports.config = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: "images/[name].[ext]",
          }
        }
      }
    ]
  }
};
