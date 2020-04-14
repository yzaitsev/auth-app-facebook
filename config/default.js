const path = require('path');

module.exports = {
  port: 3000,
  root: process.cwd(),
  publicDir: path.join(process.cwd(), 'public'),
  templateDir: path.join(process.cwd(), 'templates'),
  auth: {
    secretKey: 'SOME_SECRET_KEY_FOR_TOKEN',
    expireEmail: '1d'
  },
  mongodb: {
    uri: null,
    debug: true,
    session_names: {
      collection: 'appSession',
      model: 'Session'
    }
  },
  passport: {
    facebook: {
      clientID: null,
      clientSecret: null,
      callbackURL: '/auth/login/facebook/callback'
    }
  },
  crypto: {
    length: 128,
    iterations: 10
  },
  email: {
    sender: null,
    auth: {
      username: null,
      password: null
    }
  }
}
