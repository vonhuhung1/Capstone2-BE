const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const eventRoute = require('./event.route');
const postRoute = require('./post.route');
const giveRoute = require('./give.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/events',
    route: eventRoute,
  },
  {
    path: '/posts',
    route: postRoute,
  },
  {
    path: '/gives',
    route: giveRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
