exports.config = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|svg|ico)(\?.*)$/,
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
