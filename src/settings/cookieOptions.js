const config = require('../config');

const commonOptions = {
  domain: config.CookieDomain,
  secure: config.CookieSecure,
  samesite: config.CookieSamesite,
};

// 구글 로그인 토큰 옵션
const googleCookieOptions = {
  httpOnly: false,
  ...commonOptions,
  maxAge: 1000 * 10, // 10초
};

// 리프레시 토큰 옵션
const refreshCookieOptions = {
  httpOnly: true,
  ...commonOptions,
  maxAge: 1000 * 60 * 60 * 6, // 6시간
  // maxAge: 1000 * 30, // 30초 (개발 확인용)
};

const clearCookieOptions = {
  httpOnly: true,
  ...commonOptions,
  maxAge: -9999,
};

exports.googleCookieOptions = googleCookieOptions;
exports.refreshCookieOptions = refreshCookieOptions;
exports.clearCookieOptions = clearCookieOptions;
