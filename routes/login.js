module.exports = function(app) {
  app.get('/login', (request, response) => {
    response.render('login');
  });
};
