const Router = require('koa-router');
const mainRouter = new Router();

const homeRoutes = require('./home');
const authRoutes = require('./auth');
const dashboardRoutes = require('./dashboard');

mainRouter
  .use('/', homeRoutes)
  .use('/auth', authRoutes)
  .use('/dashboard', dashboardRoutes)


module.exports.init = app => app.use(mainRouter.routes())