const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const promise = require('bluebird');
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const MongoDBStore = require('connect-mongodb-session')(session);

const setupMongoDBModels = require('../models');
const serverSetupPassportUber = require('./server-setup-passport-uber');

const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;

module.exports = function(app) {
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackConfig = require('../../webpack.config');
    const webpack = require('webpack');
    const webpackDevOptions = {
      contentBase: path.join('..', '..'),
      watchContentBase: true,
      inline: true,
      publicPath: '/',
      historyApiFallback: true
    };
    webpackConfig.watch = true;
    webpackConfig.entry.unshift('webpack-hot-middleware/client?reload=true');
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    const webpackCompiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(webpackCompiler, webpackDevOptions));
    app.use(require('webpack-hot-middleware')(webpackCompiler));
    /* eslint-enable */
  }

  const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'UberSessions'
  });

  const expressSessionOptions = {
    secret: EXPRESS_SESSION_SECRET,
    resave: false,
    store: sessionStore,
    saveUninitialized: true
  };

  app.use(session(expressSessionOptions));
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

  serverSetupPassportUber(app, passport);

  app.use((req, res, next) => {
    res.locals.onLoginScreen = false;
    next();
  });

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.mongooseDB = mongoose;
  app.mongooseDB.Promise = promise;
  app.mongooseDB.connect(process.env.MONGODB_URI, { useMongoClient: true });

  console.log('connection url', process.env.MONGODB_URI);

  setupMongoDBModels(app);
};
