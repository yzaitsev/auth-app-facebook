const passport = require('koa-passport');
const strategyFacebook = require('./strategies/facebook');
const { User } = require('../../models/user');



passport.use(strategyFacebook)

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user)
  } catch(err) {
    console.error(`catch in deserialize: `, err)
    done(err)
  }
});

module.exports = passport;