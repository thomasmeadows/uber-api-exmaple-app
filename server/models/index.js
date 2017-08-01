const userModel = require('./user');
const historyModel = require('./history');
const promise = require('bluebird');
const mongoose = require('mongoose');

module.exports = function(app) {
  app.mongooseDB = mongoose;
  app.mongooseDB.Promise = promise;
  app.mongooseDB.connect(process.env.MONGODB_URI, { useMongoClient: true });

  app.models = {};
  app.models.User = userModel(app);
  app.models.History = historyModel(app);
};
