const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const postRoute = require('./post.route');
const docsRoute = require('./docs.route');
const replyRoute = require('./reply.route');
const commentRoute = require('./comment.route');
const analysisRoute = require('./analysis.route');
const locationRoute = require('./location.route');
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
    path: '/posts',
    route: postRoute,
  },
  {
    path: '/comments',
    route: commentRoute,
  },
  {
    path: '/replyComments',
    route: replyRoute,
  },
  {
    path: '/analysis',
    route: analysisRoute,
  },
  {
    path: '/location',
    route: locationRoute,
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
