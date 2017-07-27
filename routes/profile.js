const ensureAuthenticated = require('./policies/ensureAuthenticated');
const getAuthorizedRequest = require('./helpers/getAuthorizedRequest');

module.exports = function(app) {
  app.get('/profile', ensureAuthenticated, (request, response) => {
    getAuthorizedRequest('/v1/me', request.user.accessToken, (error, res) => {
      if (error) {
        console.log('err', error);
      }
      response.json(res);
    });
  });
};
