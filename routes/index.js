const loginRoute = require('./login');
const logoutRoute = require('./logout');
const profileRoute = require('./profile');
const historyRoute = require('./history');
const homeRoute = require('./home');

module.exports = function(app) {
  // pages
  loginRoute(app);
  homeRoute(app);

  // api logic
  logoutRoute(app);
  profileRoute(app);
  historyRoute(app);
};
