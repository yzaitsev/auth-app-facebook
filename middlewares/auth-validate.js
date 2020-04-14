module.exports = async (ctx, next) => {
  if (!ctx.isAuthenticated()) ctx.redirect('/auth/register');
  await next()
}