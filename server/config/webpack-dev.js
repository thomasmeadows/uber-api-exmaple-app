const path = require('path');

const { WEBPACK, SERVER, ROUTES } = require('./constants');

module.exports = function(app) {
  if (SERVER.ENV === SERVER.ENV_DEVELOPMENT) {
    /* eslint-disable */
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');

    const webpackConfig = require('../../webpack.config');

    const webpackDevOptions = {
      contentBase: path.join('..', '..'),
      watchContentBase: true,
      inline: true,
      publicPath: ROUTES.HOME,
      historyApiFallback: true
    };

    webpackConfig.watch = true;
    webpackConfig.entry.unshift(WEBPACK.HOT_MIDDLEWARE_CLIENT);
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    const webpackCompiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(webpackCompiler, webpackDevOptions));
    app.use(require('webpack-hot-middleware')(webpackCompiler));
    /* eslint-enable */
  }
};
