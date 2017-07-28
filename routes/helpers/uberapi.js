const axios = require('axios');

module.exports = function(config) {
  const request = {
    method: config.method,
    baseURL: process.env.UBER_API_URL,
    url: config.url,
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Content-Type': 'application/json'
    }
  };

  if (config.data) {
    request.data = config.data;
  }

  return axios(request);
};
