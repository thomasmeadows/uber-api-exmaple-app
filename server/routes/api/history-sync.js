const { URLSearchParams } = require('url');
const promise = require('bluebird');

const ensureAuthenticated = require('../policies/ensureAuthenticated');
const uber = require('../helpers/uberapi');

const { ROUTES, METHODS, UBER } = require('../../config/constants');

function createHistory(app, user, results) {
  return promise.each(results.history, history => {
    return app.models.History.find({ request_id: history.request_id })
    .then(historyFound => {
      if (!historyFound.length) {
        history.user = user._id;
        return app.models.History.create(history);
      }
      return null;
    });
  });
}

module.exports = function(app) {
  app.get(ROUTES.API.HISTORY_SYNC, ensureAuthenticated, (req, res) => {
    const searchParams = new URLSearchParams(req.query);

    return uber({
      method: METHODS.GET,
      url: `${UBER.ROUTES.HISTORY}?${searchParams.toString()}`,
      token: req.user.accessToken
    })
    .then(results => {
      return createHistory(app, req.user, results.data)
      .then(() => res.send(results.data));
    })
    .catch(err => {
      console.log('error', err);
    });
  });
};
