const loginRoute = require('./login');
const logoutRoute = require('./logout');
const homeRoute = require('./home');
const profileRoute = require('./profile');
const historyRoute = require('./history');
const historySyncRoute = require('./history-sync');
const fakeRideRoute = require('./fake-ride');

module.exports = function(app) {
  loginRoute(app);
  logoutRoute(app);

  historyRoute(app);
  historySyncRoute(app);
  homeRoute(app);
  profileRoute(app);

  if (process.env.UBER_API_URL.includes('sandbox')) {
    // only inclue this route on development mode
    fakeRideRoute(app);
  };
};
