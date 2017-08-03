const path = require('path');
const { VIEWS } = require('./constants');
const CACHE_VERSION = require('./cache-version');

module.exports = function(app) {
  app.set(VIEWS.VIEWS, path.join(__dirname, '..', '/views'));
  app.set(VIEWS.VIEW_ENGINE, VIEWS.EJS);

  app.use((req, res, next) => {
    // helps make sure navbar does not display on login screen
    res.locals.onLoginScreen = false;
    // helps make sure google maps script does not load on every page
    res.locals.includeGoogleMapsScript = false;
    // add variable for cache busting
    res.locals.cacheVersion = CACHE_VERSION;
    next();
  });
};
