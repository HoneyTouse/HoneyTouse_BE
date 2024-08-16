// 로그인 유무를 확인하는 미들웨어
const loginStatusMiddleware = (req, res, next) => {
  const token = extractToken(req);

  // 토큰이 유효한 경우
  if (token !== null && token !== undefined) {
    req.token = token;
  }

  next();
};

const extractToken = (req) => {
  // 로컬스토리지의 토큰을 헤더에 담아서 보내는 경우
  if (req.headers.authorization) {
    return req.headers.authorization.split(' ')[1];
  }

  // 쿠키 안에 토큰이 있는 경우
  if (req.headers.cookie) {
    const tokenCookie = req.headers.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('token='));
    return tokenCookie ? tokenCookie.replace('token=', '') : null;
  }

  // 로그인을 하지 않은 경우
  return null;
};

module.exports = loginStatusMiddleware;
