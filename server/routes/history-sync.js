const { URLSearchParams } = require('url');
const promise = require('bluebird');

const ensureAuthenticated = require('./policies/ensureAuthenticated');
const uber = require('./helpers/uberapi');

module.exports = function(app) {
  app.get('/history-sync', ensureAuthenticated, (req, res) => {
    const searchParams = new URLSearchParams(req.query);

    return uber({
      method: 'GET',
      url: `/v1.2/history?${searchParams.toString()}`,
      token: req.user.accessToken
    })
    .then(results => {
      return promise.each(results.data.history, history => {
        return app.models.History.find({ request_id: history.request_id })
        .then(historyFound => {
          if (!historyFound.length) {
            history.user = req.user._id;
            return app.models.History.create(history);
          }
          return null;
        });
      })
      .then(() => res.send(results.data));
    })
    .catch(err => {
      console.log('error', err);
    });
  });
};
