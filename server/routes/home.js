const ensureAuthenticated = require('./policies/ensureAuthenticated');

const { ROUTES, VIEWS } = require('../config/constants');

module.exports = function(app) {
  app.get(ROUTES.HOME, ensureAuthenticated, (request, response) => {
    response.render(VIEWS.HOME);
  });
};
