// route middleware to make sure the request is from an authenticated user
module.exports = function(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  return response.redirect('/login');
};
