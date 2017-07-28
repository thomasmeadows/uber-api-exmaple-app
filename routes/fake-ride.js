const ensureAuthenticated = require('./policies/ensureAuthenticated');
const uber = require('./helpers/uberapi');
const { URLSearchParams } = require('url');

const FAKE_START_LATITUDE = 40.730610;
const FAKE_START_LONGITUDE = -73.935242;

const FAKE_END_LATITUDE = 40.710610;
const FAKE_END_LONGITUDE = -73.935242;

module.exports = function(app) {
  app.get('/fake-ride', ensureAuthenticated, (req, res) => {
    const productParams = new URLSearchParams({
      latitude: FAKE_START_LATITUDE,
      longitude: FAKE_START_LONGITUDE
    });
    return uber({
      method: 'GET',
      url: `/v1.2/products?${productParams.toString()}`,
      token: req.user.accessToken
    })
    .then(productResults => {
      if (!productResults.data.products.length) {
        throw 'failed to find products';
      }
      const product_id = productResults.data.products[0].product_id;
      return uber({
        method: 'POST',
        url: '/v1.2/requests/estimate',
        token: req.user.accessToken,
        data: {
          product_id: product_id,
          start_latitude: FAKE_START_LATITUDE,
          start_longitude: FAKE_START_LONGITUDE,
          end_latitude: FAKE_END_LATITUDE,
          end_longitude: FAKE_END_LONGITUDE
        }
      })
      .then(estimateResults => {
        const fare_id = estimateResults.data.fare.fare_id;
        console.log('product_id', product_id, 'fare_id', fare_id);
        return uber({
          method: 'POST',
          url: '/v1.2/requests',
          token: req.user.accessToken,
          data: {
            fare_id: fare_id,
            product_id: product_id,
            start_latitude: FAKE_START_LATITUDE,
            start_longitude: FAKE_START_LONGITUDE,
            end_latitude: FAKE_END_LATITUDE,
            end_longitude: FAKE_END_LONGITUDE
          }
        })
        .catch(err => {
          console.log('error 1', err.response ? err.response.data : err);
          return uber({
            method: 'GET',
            url: '/v1/requests/current',
            token: req.user.accessToken
          });
        });
      })
      .then(results => {
        const statuses = [ 'accepted', 'arriving', 'in_progress', 'completed' ];

        function recursiveStatusChange(requestId, statusArray) {
          return uber({
            method: 'PUT',
            url: `/v1.2/sandbox/requests/${requestId}`,
            token: req.user.accessToken,
            data: {
              status: statusArray[0]
            }
          })
          .then(statusResults => {
            if(statusArray.length > 1) {
              statusArray.shift();
              return recursiveStatusChange(requestId, statusArray);
            }
            return statusResults;
          });
        };

        return recursiveStatusChange(results.data.request_id, statuses)
        .then(results3 => {
          return res.json(results3.data);
        });
      });
    })
    .catch(err => {
      console.log('error 2', err.response ? err.response.data : err);
    });
  });
};
