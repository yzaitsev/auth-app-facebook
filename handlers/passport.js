const passport = require('../libs/passport');

module.exports.init = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
}