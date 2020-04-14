const Router = require('koa-router');
const router = new Router();
const passport = require('../../libs/passport');


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', 
  { 
    successRedirect: '/dashboard',
    successFlash: true,
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

module.exports = router.routes();