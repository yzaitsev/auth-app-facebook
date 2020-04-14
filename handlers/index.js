exports.init = (app) => {
  require('./favicon').init(app);
  require('./static').init(app);
  require('./logger').init(app);
  require('./templates').init(app);
  require('./errors').init(app);
  require('./session').init(app);
  require('./body-parser').init(app);
  require('./passport').init(app);
  require('./flash').init(app);
}