const { ROUTES, VIEWS } = require('../config/constants');

module.exports = function(app) {
  app.get(ROUTES.LOGIN, (request, response) => {
    response.render(VIEWS.LOGIN, { onLoginScreen: true });
  });
};
