const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'styles.css'
});

const plugins = [
  extractSass,
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Tether: 'tether'
  })
];

module.exports = {
  entry: [
    path.join(__dirname, 'app', 'app.js'),
    path.join(__dirname, 'app', 'styles.scss')
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'env' ]
          }
        }
      }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.scss'
    ],
  },
  output: {
    path: path.join(__dirname, 'server', 'public'),
    filename: 'browser.js'
  }
};
