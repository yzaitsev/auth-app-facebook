const pug = require('pug');
const path = require('path');
const config = require('config');


module.exports.init = app => app.use(async (ctx, next) => {
  ctx.locals = {
    get user() {
      return ctx.state.user;
    },
    get flash() {
      return ctx.getFlashMessages()
    }
  }

  ctx.render = (templateFile, locals = {}) => {
    const templatePath = path.join(config.get('templateDir'),templateFile)
    return pug.renderFile(templatePath, {...locals, ...ctx.locals})
  }

  await next()
})