const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

const configModels = require('./models');
const configPassportUber = require('./config/passport-uber');
const configSessionsSecurity = require('./config/sessions-security');
const configRoutes = require('./routes');
const configViews = require('./config/views');
const configWebpackDev = require('./config/webpack-dev');

const { SERVER } = require('./config/constants');

const app = express();

configWebpackDev(app);

configSessionsSecurity(app, passport);

configPassportUber(app, passport);

configModels(app);

configViews(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, SERVER.PUBLIC_FOLDER_NAME)));

configRoutes(app);

app.listen(Number(SERVER.PORT), () => {
  console.log(`listening to port: ${SERVER.PORT}`);
});
