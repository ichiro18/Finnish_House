exports.config = {
  module: {
    rules: [
      {
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "fonts/[name].[ext]",
              limit: 10000
            }
          }
        ]
      }
    ]
  }
};
