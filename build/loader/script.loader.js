exports.config = {
  module: {
    rules: [
      // Javascript
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
    ]
  },
};
