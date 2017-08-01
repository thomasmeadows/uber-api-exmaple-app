const path = require('path');
const { VIEWS } = require('./constants');

module.exports = function(app) {
  app.set(VIEWS.VIEWS, path.join(__dirname, '..', '/views'));
  app.set(VIEWS.VIEW_ENGINE, VIEWS.EJS);

  // helps make sure navbar does not display on login screen
  app.use((req, res, next) => {
    res.locals.onLoginScreen = false;
    next();
  });
};
