const ensureAuthenticated = require('./policies/ensureAuthenticated');

module.exports = function(app) {
  app.get('/history', ensureAuthenticated, (request, response) => {
    return response.render('history', Object.assign({ googleMapsToken: process.env.GOOGLE_MAPS_TOKEN }));
  });
};
