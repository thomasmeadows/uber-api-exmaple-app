const promise = require('bluebird');

const ensureAuthenticated = require('../policies/ensureAuthenticated');
const fakeHistoryData = require('../helpers/fake-history-data.json');

const { ROUTES } = require('../../config/constants');

module.exports = function(app) {
  app.get(ROUTES.API.FAKE_HISTORY, ensureAuthenticated, (req, res) => {
    return promise.each(fakeHistoryData.history, history => {
      return app.models.History.find({ request_id: history.request_id })
      .then(historyFound => {
        if (!historyFound.length) {
          history.user = req.user._id;
          return app.models.History.create(history);
        }
        return null;
      });
    })
    .then(() => res.send({ message: `${fakeHistoryData.history.length} fake history records created` }))
    .catch(err => {
      console.log('error', err);
    });
  });
};
