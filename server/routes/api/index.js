const fakeRide = require('./fake-ride');
const fakeHistory = require('./fake-history');
const historySync = require('./history-sync');
const history = require('./history');
const { SERVER } = require('../../config/constants');

module.exports = function(app) {
  historySync(app);
  history(app);

  if (SERVER.ENV === SERVER.ENV_DEVELOPMENT) {
    // only inclue this route on development mode
    fakeRide(app);
    fakeHistory(app);
  };
};
