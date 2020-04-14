const Router = require('koa-router');
const router = new Router();

const loginRoutes = require('./login');
const facebookRoutes = require('./facebook');
const registerRoutes = require('./register');
const verifyRoutes = require('./verify');


router.use(
  loginRoutes,
  facebookRoutes,
  registerRoutes,
  verifyRoutes
);

module.exports = router.routes();