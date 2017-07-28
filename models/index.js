const setupUserModel = require('./user');
const setupHistoryModel = require('./history');

module.exports = function(app) {
  app.models = {};
  app.models.User = setupUserModel(app);
  app.models.History = setupHistoryModel(app);
};
