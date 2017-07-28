const ensureAuthenticated = require('./policies/ensureAuthenticated');
const uber = require('./helpers/uberapi');

module.exports = function(app) {
  app.get('/profile', ensureAuthenticated, (req, res) => {
    return uber({
      method: 'GET',
      url: '/v1/me',
      token: req.user.accessToken
    })
    .then(results => {
      return res.render('profile', { uberProfile: results.data });
    })
    .catch(err => {
      console.log('error', err);
    });
  });
};
