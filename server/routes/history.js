const ensureAuthenticated = require('./policies/ensureAuthenticated');

module.exports = function(app) {
  app.get('/history', ensureAuthenticated, (req, res) => {
    return app.models.History.find({ user: req.user._id })
    .then(userHistoryFound => {
      return res.render('history-table', Object.assign({ googleMapsToken: process.env.GOOGLE_MAPS_TOKEN }, { userHistory: userHistoryFound }));
    });
  });

  app.get('/history-map', ensureAuthenticated, (req, res) => {
    return app.models.History.find({ user: req.user._id })
    .then(userHistoryFound => {
      return res.render('history-map', Object.assign({ googleMapsToken: process.env.GOOGLE_MAPS_TOKEN }, { userHistory: userHistoryFound }));
    });
  });
};
