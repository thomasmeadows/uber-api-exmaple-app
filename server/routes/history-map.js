const ensureAuthenticated = require('./policies/ensureAuthenticated');
const { ROUTES, VIEWS } = require('../config/constants');

module.exports = function(app) {
  app.get(ROUTES.HISTORY_MAP, ensureAuthenticated, (req, res) => {
    return res.render(VIEWS.HISTORY_MAP, {
      googleMapsToken: process.env.GOOGLE_MAPS_TOKEN,
      includeGoogleMapsScript: true
    });
  });
};
