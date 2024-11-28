const config = require('../config');

// 개발 환경에서 쿠키 옵션
const cookieOptions = {
  httpOnly: false, // 클라이언트에서 삭제하도록 함
  domain: config.CookieDomain,
  secure: config.CookieSecure,
  samesite: config.CookieSamesite,
  maxAge: 1000 * 20, // 20초
};

module.exports = cookieOptions;
