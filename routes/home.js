const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = ctx.render('/pages/home.pug', { activePath: 'home' });
})


module.exports = router.routes();