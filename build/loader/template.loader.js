exports.config = {
  module: {
    rules: [
      // Template loader
      {
        test: /\.(pug|jade)$/,
        use: [
          {
            loader: 'pug-loader',
          },
        ],
      },
    ]
  }
};
