const { ROUTES } = require('../config/constants');

module.exports = function(app) {
  app.get(ROUTES.LOGOUT, (request, response) => {
    request.logout();
    response.redirect(ROUTES.LOGIN);
  });
};
