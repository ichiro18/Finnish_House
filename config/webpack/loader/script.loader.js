exports.config = {
  module: {
    rules: [
      // ES6
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
