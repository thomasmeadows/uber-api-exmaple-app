const ensureAuthenticated = require('./policies/ensureAuthenticated');
const { ROUTES, VIEWS } = require('../config/constants');

module.exports = function(app) {
  app.get(ROUTES.HISTORY, ensureAuthenticated, (req, res) => {
    return app.models.History.count({ user: req.user._id })
    .then(userHistoryCount => {
      const totalPages = Math.floor(userHistoryCount / 50) + 1;
      const currentPage = req.query.page || 1;

      return app.models.History.find({ user: req.user._id })
      .limit(50)
      .skip(currentPage * 50 - 50)
      .then(userHistoryFound => {
        return res.render(VIEWS.HISTORY, { userHistory: userHistoryFound, currentPage: currentPage, totalPages: totalPages, historyCount: userHistoryCount });
      });
    });
  });
};
