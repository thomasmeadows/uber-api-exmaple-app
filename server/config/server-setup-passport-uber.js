const UberStrategy = require('passport-uber');
const promise = require('bluebird');

const uber = require('../routes/helpers/uberapi');

const UBER_CLIENT_ID = process.env.UBER_CLIENT_ID;
const UBER_CLIENT_SECRET = process.env.UBER_CLIENT_SECRET;
const UBER_CALLBACK_URL = process.env.UBER_CALLBACK_URL;

module.exports = function(app, passport) {
  passport.use(new UberStrategy({
    clientID: UBER_CLIENT_ID,
    clientSecret: UBER_CLIENT_SECRET,
    callbackURL: UBER_CALLBACK_URL,
  }, (accessToken, refreshToken, user, done) => {
    // save the user on login otherwise update the user if they already exist
    return app.models.User.find({ rider_id: user.rider_id })
    .then(userFound => {
      if (userFound.length) {
        user._id = userFound[0]._id;
        return app.models.User.update({ _id: userFound[0]._id }, user);
      }
      return app.models.User.create(user)
      .then(userCreated => {
        user._id = userCreated._id;
      });
    })
    .then(() => {
      // sync the first 50 history items
      return uber({
        method: 'GET',
        url: '/v1.2/history?limit=50&offset=0',
        token: accessToken
      })
      .then(results => {
        return promise.each(results.data.history, history => {
          return app.models.History.find({ request_id: history.request_id })
          .then(historyFound => {
            if (!historyFound.length) {
              history.user = user._id;
              return app.models.History.create(history);
            }
            return null;
          });
        });
      });
    })
    .then(() => {
      user.accessToken = accessToken;
      return done(null, user);
    })
    .catch(err => {
      console.log('error', err);
    });
  }));

  app.get('/auth/uber',
    passport.authenticate('uber',
      { scope: [ 'profile', 'history', 'history_lite', 'places' ] }
    )
  );

  // authentication callback redirects to /login if authentication failed or home if successful
  app.get('/auth/uber/callback',
    passport.authenticate('uber', {
      failureRedirect: '/login'
    }), (req, res) => {
      res.redirect('/');
    }
  );
};
