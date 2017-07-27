module.exports = function(app) {
  return app.mongooseDB.model('User', {
    picture: String,
    first_name: String,
    last_name: String,
    promo_code: String,
    rider_id: String,
    email: String,
    mobile_verified: Boolean,
    uuid: String,
    provider: String
  });
};
