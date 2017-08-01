const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const helmet = require('helmet');
const { EXPRESS, SERVER, DB } = require('./constants');

module.exports = function(app, passport) {
  const sessionStore = new MongoDBStore({
    uri: DB.MONGO_URI,
    collection: DB.SESSION_COLLECTION_NAME
  });

  const expressSessionOptions = {
    secret: EXPRESS.SESSION_SECRET,
    name: EXPRESS.SESSION_NAME,
    resave: false,
    store: sessionStore,
    saveUninitialized: true
  };

  if(SERVER.ENV === SERVER.ENV_PRODUCTION) {
    const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

    app.set(SERVER.TRUST_PROXY, 1);
    expressSessionOptions.cookie = {
      secure: true,
      expires: expiryDate
    };
  }

  app.use(session(expressSessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.use(helmet());
};
