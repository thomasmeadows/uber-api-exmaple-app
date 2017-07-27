const express = require('express');

const configServer = require('./config/server-setup');
const configRoutes = require('./routes');

const app = express();

configServer(app);

configRoutes(app);

app.listen(8000, () => {
  console.log('listening to port: 8000');
});
