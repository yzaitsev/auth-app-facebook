const favicon = require('koa-favicon');
const path = require('path');
const config = require('config');

const faviconFile = path.join(config.get('publicDir'), 'images', 'favicon.ico')

exports.init = app => app.use(favicon(faviconFile));