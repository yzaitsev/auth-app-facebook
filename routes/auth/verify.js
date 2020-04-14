const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const config = require('config')


router.get('/verify/:token', async (ctx) => {
  const { token } = ctx.params;
  delete ctx.session.token;

  if (!token) return ctx.redirect('/auth/register');
  
  try {
    const decoded = jwt.verify(token, config.get('auth.secretKey')); 
    const user = await User.findOne({ _id: decoded._id, emailToken: token });

    if (!user) {
      ctx.flash('error', 'We were unable to find a user for this token.');
      return ctx.redirect('/auth/register');
    }


    if (user.isVerified) {
      ctx.flash('error', 'This user has already been verified.');
      return ctx.redirect('/auth/login');
    }


    user.isVerified = true;
    user.emailToken = null;
    await user.save();
    
    ctx.flash('success', 'The account has been verified. Please log in');
    return ctx.redirect('/auth/login');

  } catch (err) {    
    if (err.name === 'TokenExpiredError') {     
      ctx.flash('error', `Your verification email was expired`);
      return ctx.redirect('/auth/register'); // resend email verification - separate route and template
    }
    throw err;
  }
  
}) 

module.exports = router.routes();