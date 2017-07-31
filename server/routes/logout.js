module.exports = function(app) {
  app.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/login');
  });
};
