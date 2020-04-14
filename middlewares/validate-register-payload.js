const { User, payloadSchema } = require('../models/user');
const _ = require('lodash');



const validateRegisterPayload = async (ctx, next) => {
  const body = _.pick(ctx.request.body, User.payloadFields);  
  const { error, value } = payloadSchema.validate(body);

  if (error) {
    const { message } = error.details[0];
    ctx.flash('error', message);
    return ctx.redirect('/auth/register');
  }

  ctx.payload = { ...value };

  await next();
} 



module.exports = validateRegisterPayload;