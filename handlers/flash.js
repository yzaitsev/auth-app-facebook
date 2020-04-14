module.exports.init = app => app.use(async (ctx, next) => {
  const messages = ctx.session.messages || {};
  delete ctx.session.messages;

  ctx.getFlashMessages = function() {
    return messages;
  }


  ctx.flash = function(type, messageValue) {
    if (!ctx.session.messages) ctx.session.messages = {}
    ctx.session.messages[type] = messageValue;
  }
  
  await next()
})