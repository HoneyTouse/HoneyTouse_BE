const config = require('../config');

// 개발 환경에서 쿠키 옵션
const cookieOptions = {
  httpOnly: true,
  domain: config.CookieDomain,
  secure: config.CookieSecure,
  samesite: config.CookieSamesite,
  maxAge: 60 * 60 * 1000 * 6, // 6시간
};

module.exports = cookieOptions;
