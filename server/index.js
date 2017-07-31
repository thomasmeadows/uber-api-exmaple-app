const express = require('express');
const path = require('path');

const configServer = require('./config/server-setup');
const configRoutes = require('./routes');

const app = express();

configServer(app);

configRoutes(app);

app.listen(Number(process.env.PORT), () => {
  console.log(`listening to port: ${process.env.PORT}`);
});
