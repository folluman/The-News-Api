module.exports = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', 
  sameSite: 'strict', 
  maxAge: 36000000, 
  path: '/', 
  domain: process.env.COOKIE_DOMAIN || undefined };