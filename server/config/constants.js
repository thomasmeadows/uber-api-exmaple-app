const CONSTANTS = {};

CONSTANTS.DB = {
  MONGO_URI: process.env.MONGODB_URI,
  SESSION_COLLECTION_NAME: 'UberSessions'
};

CONSTANTS.EXPRESS = {
  SESSION_NAME: process.env.EXPRESS_SESSION_NAME,
  SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
};

CONSTANTS.METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DEL: 'DEL'
};

CONSTANTS.ROUTES = {
  API: {
    FAKE_RIDE: '/api/fake-ride',
    FAKE_HISTORY: '/api/fake-history',
    HISTORY_SYNC: '/api/history-sync',
    HISTORY: '/api/history'
  },
  HISTORY: '/history',
  HISTORY_MAP: '/history-map',
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  PROFILE: '/profile',
  UBER_PASSPORT_AUTH_PATH: '/auth/uber',
  UBER_CALLBACK_PATH: process.env.UBER_CALLBACK_PATH,
  UBER_CALLBACK_URL: process.env.UBER_CALLBACK_URL,
};

CONSTANTS.SERVER = {
  ENV: process.env.NODE_ENV,
  ENV_PRODUCTION: 'production',
  ENV_DEVELOPMENT: 'development',
  PORT: process.env.PORT,
  PUBLIC_FOLDER_NAME: 'public',
  TRUST_PROXY: 'trust proxy'
};

CONSTANTS.UBER = {
  API_URL: process.env.UBER_API_URL,
  CLIENT_ID: process.env.UBER_CLIENT_ID,
  CLIENT_SECRET: process.env.UBER_CLIENT_SECRET,
  PASSPORT_AUTH_NAME: 'uber',
  ROUTES: {
    ESTIMATE: '/v1.2/requests/estimate',
    HISTORY: '/v1.2/history',
    PROFILE: '/v1/me',
    PRODUCTS: '/v1.2/products',
    REQUESTS: '/v1.2/requests',
    REQUESTS_CURRENT: '/v1/requests/current',
    SANDBOX_REQUESTS: '/v1.2/sandbox/requests',
  },
  ROUTE_STATUS: {
    ACCEPTED: 'accepted',
    ARRIVING: 'arriving',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
  },
  SCOPE: {
    PROFILE: 'profile',
    HISTORY: 'history',
    HISTORY_LITE: 'history_lite',
    PLACES: 'places'
  }
};

CONSTANTS.VIEWS = {
  EJS: 'ejs',
  HISTORY: 'history',
  HISTORY_MAP: 'history-map',
  HOME: 'home',
  LOGIN: 'login',
  PROFILE: 'profile',
  VIEWS: 'views',
  VIEW_ENGINE: 'view engine'
};

CONSTANTS.WEBPACK = {
  HOT_MIDDLEWARE_CLIENT: 'webpack-hot-middleware/client?reload=true'
};

module.exports = CONSTANTS;
