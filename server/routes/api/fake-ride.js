const { URLSearchParams } = require('url');

const ensureAuthenticated = require('../policies/ensureAuthenticated');
const uber = require('../helpers/uberapi');
const { ROUTES, METHODS, UBER } = require('../../config/constants');

const FAKE_START_LATITUDE = 40.730610;
const FAKE_START_LONGITUDE = -73.935242;

const FAKE_END_LATITUDE = 40.710610;
const FAKE_END_LONGITUDE = -73.935242;

module.exports = function(app) {
  app.get(ROUTES.API.FAKE_RIDE, ensureAuthenticated, (req, res) => {
    const productParams = new URLSearchParams({
      latitude: FAKE_START_LATITUDE,
      longitude: FAKE_START_LONGITUDE
    });
    return uber({
      method: METHODS.GET,
      url: `${UBER.ROUTES.PRODUCTS}?${productParams.toString()}`,
      token: req.user.accessToken
    })
    .then(productResults => {
      if (!productResults.data.products.length) {
        throw 'failed to find products';
      }
      const product_id = productResults.data.products[0].product_id;
      return uber({
        method: METHODS.POST,
        url: UBER.ROUTES.ESTIMATE,
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
        return uber({
          method: METHODS.POST,
          url: UBER.ROUTES.REQUESTS,
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
          console.log('error', err.response ? err.response.data : err);
          return uber({
            method: METHODS.GET,
            url: UBER.ROUTES.REQUESTS_CURRENT,
            token: req.user.accessToken
          });
        });
      })
      .then(results => {
        const { ACCEPTED, ARRIVING, IN_PROGRESS, COMPLETED } = UBER.ROUTE_STATUS;
        const statuses = [ ACCEPTED, ARRIVING, IN_PROGRESS, COMPLETED ];

        function recursiveStatusChange(requestId, statusArray) {
          return uber({
            method: METHODS.PUT,
            url: `${UBER.ROUTES.SANDBOX_REQUESTS}/${requestId}`,
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
      console.log('_error', err.response ? err.response.data : err);
    });
  });
};
