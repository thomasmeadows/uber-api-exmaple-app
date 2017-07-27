const https = require('https');

module.exports = function(endpoint, accessToken, callback) {
  const options = {
    hostname: 'sandbox-api.uber.com',
    path: endpoint,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const req = https.request(options, (res) => {
    res.on('data', (data) => {
      callback(null, JSON.parse(data));
    });
  });
  req.end();
  req.on('error', (err) => {
    callback(err, null);
  });
};
