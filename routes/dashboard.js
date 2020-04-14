const Router = require('koa-router');
const router = new Router();
const authValidate = require('../middlewares/auth-validate');

router.get('/', authValidate, async (ctx) => {
  ctx.body = ctx.render('/pages/dashboard.pug', { activePath: 'dashboard' })
})

module.exports = router.routes()