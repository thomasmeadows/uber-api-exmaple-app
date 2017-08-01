const axios = require('axios');

const { UBER } = require('../../config/constants');

module.exports = function(config) {
  const request = {
    method: config.method,
    baseURL: UBER.API_URL,
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
