const express = require('express');
const setting = require('./setting.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: setting,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
