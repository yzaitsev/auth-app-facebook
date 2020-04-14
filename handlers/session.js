const session = require('koa-session');
const config = require('config');

const mongoose = require('../libs/mongoose');
const MongooseStore = require("koa-session-mongoose");


module.exports.init = app => app.use(session({
  signed: false,
  store: new MongooseStore({
    collection: config.get('mongodb.session_names.collection'),
    connection: mongoose,
    expires: 3600 * 4, // 4 hours
    name: config.get('mongodb.session_names.model')
  })
}, app))