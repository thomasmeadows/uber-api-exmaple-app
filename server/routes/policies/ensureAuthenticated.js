const { ROUTES } = require('../../config/constants');

module.exports = function(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  return response.redirect(ROUTES.LOGIN);
};
