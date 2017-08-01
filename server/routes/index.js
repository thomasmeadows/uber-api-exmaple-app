const login = require('./login');
const logout = require('./logout');
const home = require('./home');
const profile = require('./profile');
const history = require('./history');
const api = require('./api');

module.exports = function(app) {
  login(app);
  logout(app);

  history(app);
  home(app);
  profile(app);

  // set up api for ajax calls
  api(app);
};
