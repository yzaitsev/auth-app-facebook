const Router = require('koa-router');
const router = new Router();
const { User } = require('../../models/user');


router.get('/login', async (ctx) => {
  ctx.body = ctx.render('/pages/login.pug', { activePath: 'login' })
})

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await User.findOne({ email });

  if (!user) {
    ctx.flash('error', `The email address ${email} is not associated with any account. Double-check your email address and try again.`);
    return ctx.redirect('/auth/register');
  }
  
  if (!user.isVerified) {
    ctx.flash('error', `The email address ${email} is not verified.`);
    return ctx.redirect('/auth/register');
  }

  const validPassword = await user.checkPassword(password);
  if (!validPassword) {
    ctx.flash('error', `Invalid email or password`);
    return ctx.redirect('/auth/register');
  }
  ctx.login(user)
  return ctx.redirect('/dashboard');
})



module.exports = router.routes()