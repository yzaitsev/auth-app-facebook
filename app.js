const Koa = require('koa');
const app = new Koa();

require('./handlers').init(app);
require('./routes').init(app);

module.exports = app;