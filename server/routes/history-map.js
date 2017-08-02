const ensureAuthenticated = require('./policies/ensureAuthenticated');
const { ROUTES, VIEWS } = require('../config/constants');

module.exports = function(app) {
  app.get(ROUTES.HISTORY_MAP, ensureAuthenticated, (req, res) => {
    return app.models.History.find({ user: req.user._id })
    .then(userHistoryFound => {
      return res.render(VIEWS.HISTORY_MAP, Object.assign({ googleMapsToken: process.env.GOOGLE_MAPS_TOKEN }, { userHistory: userHistoryFound }));
    });
  });
};
