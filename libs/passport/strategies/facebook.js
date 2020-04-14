const { Strategy: FacebookStrategy } = require('passport-facebook');
const config = require('config');
const { User } = require('../../../models/user');
const _ = require('lodash');


module.exports = new FacebookStrategy({
  clientID: config.get('passport.facebook.clientID'),
  clientSecret: config.get('passport.facebook.clientSecret'),
  callbackURL: config.get('passport.facebook.callbackURL'),
  profileFields: ['id', 'displayName', 'email', 'photos']
},
async function(accessToken, refreshToken, profile, done) {
  try {
    const { _json, photos } = profile;
    let user = await User.findOne({ email: _json.email });
    let message = 'Sign in success';

    if (!user) {
      const userPhoto = photos[0].value || '';
      message = 'Register in success';
      user = await User.create({ displayName: _json.name, email: _json.email, photo: userPhoto })
    }
    return done(null, _.pick(user, ['_id', 'email', 'displayName', 'photo']), { message } )
  } catch(err) {
    return done(err)
  }
})