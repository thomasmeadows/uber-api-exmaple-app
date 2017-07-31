const ensureAuthenticated = require('./policies/ensureAuthenticated');

module.exports = function(app) {
  app.get('/', ensureAuthenticated, (request, response) => {
    response.render('index');
  });
};
