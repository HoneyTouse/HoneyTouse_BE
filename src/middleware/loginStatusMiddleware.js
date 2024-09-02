const extractToken = require('./utils/extractToken');

// 로그인 유무를 확인하는 미들웨어
// 유효한 토큰이 있을 때에만 해당 토큰을 request 객체에 넣어줌.
const loginStatusMiddleware = (req, res, next) => {
  const token = extractToken(req);

  // 토큰이 유효한 경우
  if (token !== null && token !== undefined) {
    req.token = token;
  }

  next();
};

module.exports = loginStatusMiddleware;
