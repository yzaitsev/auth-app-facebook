const Router = require('koa-router');
const router = new Router();
const { User } = require('../../models/user');
const validateRegisterPayload = require('../../middlewares/validate-register-payload');
const sendMail = require('../../libs/email');



router.get('/register', async (ctx) => {
  ctx.body = ctx.render('/pages/register.pug', { activePath: 'register' })
})


router.post('/register', validateRegisterPayload, async (ctx) => {
  const { email } = ctx.payload;

  let user = await User.findOne({ email });
  if (user) {
    ctx.flash('error', 'The email address you have entered is already associated with another account.');
    return ctx.redirect('/auth/register');
  }

  

  user = new User({ ...ctx.payload });
  await user.generateVerificationToken(true);

  await user.createPassword(ctx.payload.password);
  user = await user.save();

  await sendVerificationEmail(user, ctx);
})


async function sendVerificationEmail(user, ctx) {
  const link = `<a href='http://${ctx.header.host}/auth/verify/${user.emailToken}'>link</a>`;

  const msgPayload = {
    to: user.email,
    subject: 'Api application - verification account',
    html: `<p>Hello ${user.displayName}</p><br /><p>Please click on the following ${link} to verify you account</p>`
  } 
  const detailMsg = await sendMail(msgPayload);

  ctx.flash('success', `A verification email has been set to ${user.email}`);
  return ctx.redirect('/auth/register');
}




module.exports = router.routes()