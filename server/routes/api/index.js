const fakeRide = require('./fake-ride');
const historySync = require('./history-sync');
const { SERVER } = require('../../config/constants');

module.exports = function(app) {
  historySync(app);
  if (SERVER.ENV === SERVER.ENV_DEVELOPMENT) {
    // only inclue this route on development mode
    fakeRide(app);
  };
};
