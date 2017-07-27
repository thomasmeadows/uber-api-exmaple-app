const https = require('https');

module.exports = function(endpoint, accessToken, parameters, callback) {
  const options = {
    hostname: 'sandbox-api.uber.com',
    path: endpoint,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    res.on('data', (data) => {
      callback(null, JSON.parse(data));
    });
  });

  req.write(JSON.stringify(parameters));
  req.end();
  req.on('error', (err) => {
    callback(err, null);
  });
};
