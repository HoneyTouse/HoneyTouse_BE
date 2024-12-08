// 토큰을 추출하는 함수
const extractToken = (req) => {
  // 헤더의 authorization에 토큰이 있을 때
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      return token;
    }
  }

  // 서버가 보낸 쿠키에 토큰이 있을 때
  if (req.headers.cookie) {
    const tokenCookie = req.headers.cookie
      .split('; ')
      .find(
        (cookie) =>
          cookie.startsWith('refreshToken=') || cookie.startsWith('token='),
      );

    if (tokenCookie) {
      return tokenCookie.replace('refreshToken=', '');
    }
  }

  return null;
};

module.exports = extractToken;
