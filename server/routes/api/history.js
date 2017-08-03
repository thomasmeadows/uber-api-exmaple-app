const ensureAuthenticated = require('../policies/ensureAuthenticated');
const { ROUTES } = require('../../config/constants');

module.exports = function(app) {
  app.get(ROUTES.API.HISTORY, ensureAuthenticated, (req, res) => {
    return app.models.History.find({ user: req.user._id })
    .limit(50)
    .skip(Number(req.query.skip))
    .then(userHistoryFound => {
      return res.send(userHistoryFound);
    })
    .catch(err => {
      console.log('error', err);
    });
  });
};
