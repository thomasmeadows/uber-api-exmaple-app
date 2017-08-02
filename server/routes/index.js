const login = require('./login');
const logout = require('./logout');
const home = require('./home');
const profile = require('./profile');
const history = require('./history');
const historyMap = require('./history-map');
const api = require('./api');
const notFound = require('./404');

module.exports = function(app) {
  login(app);
  logout(app);

  history(app);
  historyMap(app);
  home(app);
  profile(app);

  // set up api for ajax calls
  api(app);

  // add 404 fallback for all routes
  notFound(app);
};
