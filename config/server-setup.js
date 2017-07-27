const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const UberStrategy = require('passport-uber');
const mongoose = require('mongoose');
const path = require('path');

const setupMongoDBModels = require('../models');

const UBER_CLIENT_ID = process.env.UBER_CLIENT_ID;
const UBER_CLIENT_SECRET = process.env.UBER_CLIENT_SECRET;
const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;
const UBER_CALLBACK_URL = process.env.UBER_CALLBACK_URL;

module.exports = function(app) {
  app.use(session({
    secret: EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.set('views', path.join(__dirname, '..', '/views'));
  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new UberStrategy({
    clientID: UBER_CLIENT_ID,
    clientSecret: UBER_CLIENT_SECRET,
    callbackURL: UBER_CALLBACK_URL,
  }, (accessToken, refreshToken, user, done) => {
    // save the user on login otherwise update the user if they already exist
    app.models.User.find({ rider_id: user.rider_id })
    .then(userFound => {
      if (userFound.length) {
        return app.models.User.update({ _id: userFound[0]._id }, user);
      }
      return app.models.User.create(user);
    });

    user.accessToken = accessToken;
    return done(null, user);
  }));

  app.get('/auth/uber',
    passport.authenticate('uber',
      { scope: [ 'profile', 'history', 'history_lite', 'request', 'request_receipt' ] }
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

  app.use((req, res, next) => {
    res.locals.onLoginScreen = false;
    next();
  });

  // serve bootstrap
  app.get('/bootstrap.js', (req, res) => res.sendFile(path.join(__dirname, '..', 'node_modules/bootstrap/dist/js/bootstrap.min.js')));

  // serve jquery
  app.get('/jquery.js', (req, res) => res.sendFile(path.join(__dirname, '..', 'node_modules/jquery/dist/jquery.min.js')));

  // serve bootstrap css
  app.get('/bootstrap.css', (req, res) => res.sendFile(path.join(__dirname, '..', 'node_modules/bootstrap/dist/css/bootstrap.css')));

  app.mongooseDB = mongoose;
  app.mongooseDB.connect(process.env.MONGO_CONNECTION_URL);

  setupMongoDBModels(app);
};
