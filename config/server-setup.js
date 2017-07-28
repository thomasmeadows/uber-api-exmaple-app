const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const path = require('path');
const express = require('express');

const setupMongoDBModels = require('../models');
const serverSetupPassportUber = require('./server-setup-passport-uber');

const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;

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

  serverSetupPassportUber(app, passport);

  app.use((req, res, next) => {
    res.locals.onLoginScreen = false;
    next();
  });

  app.use(express.static(path.join(__dirname, '..', 'public')));

  // serve bootstrap
  app.get('/bootstrap.js', (req, res) => res.sendFile(path.join(__dirname, '..', 'node_modules/bootstrap/dist/js/bootstrap.min.js')));

  // serve jquery
  app.get('/jquery.js', (req, res) => res.sendFile(path.join(__dirname, '..', 'node_modules/jquery/dist/jquery.min.js')));

  // serve bootstrap css
  app.get('/bootstrap.css', (req, res) => res.sendFile(path.join(__dirname, '..', 'node_modules/bootstrap/dist/css/bootstrap.css')));

  app.mongooseDB = mongoose;
  app.mongooseDB.connect(process.env.MONGODB_URI);

  console.log('connection url', process.env.MONGODB_URI);

  setupMongoDBModels(app);
};
