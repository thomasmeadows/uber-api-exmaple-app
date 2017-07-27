const setupUserModel = require('./user');

module.exports = function(app) {
  app.models = {};
  app.models.User = setupUserModel(app);
};
