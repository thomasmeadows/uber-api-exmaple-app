const ensureAuthenticated = require('./policies/ensureAuthenticated');
const uber = require('./helpers/uberapi');
const { UBER, METHODS, VIEWS, ROUTES } = require('../config/constants');

module.exports = function(app) {
  app.get(ROUTES.PROFILE, ensureAuthenticated, (req, res) => {
    return uber({
      method: METHODS.GET,
      url: UBER.ROUTES.PROFILE,
      token: req.user.accessToken
    })
    .then(results => {
      return res.render(VIEWS.PROFILE, { uberProfile: results.data });
    })
    .catch(err => {
      console.log('error', err);
    });
  });
};
