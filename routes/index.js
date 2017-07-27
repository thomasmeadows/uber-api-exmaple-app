const loginRoute = require('./login');
const logoutRoute = require('./logout');
const homeRoute = require('./home');
const profileRoute = require('./profile');
const historyRoute = require('./history');

module.exports = function(app) {
  loginRoute(app);
  logoutRoute(app);

  historyRoute(app);
  homeRoute(app);
  profileRoute(app);
};
