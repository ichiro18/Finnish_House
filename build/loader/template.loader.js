const path = require('path');
const pug = require('posthtml-pug');

let bemConfig = {
  elemPrefix: '__',
  modPrefix: '--',
  modDlmtr: '---'
};

exports.config = {
  module: {
    rules: [
      // Template loader
      {
        test: /\.(pug|jade)$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'posthtml-loader',
            options: {
              ident: 'posthtml',
              parser: pug(
                {
                  pretty: true,
                  filename: path.resolve(__dirname, "../../src/template/index.pug")
                }
              ),
              plugins: [
                // PostHTML Plugins
                require('posthtml-bem')(bemConfig),
              ]
            }
          },
        ],
      },
    ]
  }
};
