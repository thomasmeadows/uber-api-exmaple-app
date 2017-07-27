const ensureAuthenticated = require('./policies/ensureAuthenticated');
const getAuthorizedRequest = require('./helpers/getAuthorizedRequest');

module.exports = function(app) {
  app.get('/history-sync', ensureAuthenticated, (request, response) => {
    getAuthorizedRequest('/v1.2/history', request.user.accessToken, (error, res) => {
      if (error) {
        console.log('err', error);
      }
      return response.send(res.data);
    });
  });
};
