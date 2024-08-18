const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const jwt = require('jsonwebtoken');
const handleTokenError = require('./tokenHandling');
const config = require('../config');

// 관리자 여부를 확인해야 할 때는 requireAdmin을 true로 설정
const checkAuthentication =
  (requireAdmin = false) =>
  (req, res, next) => {
    try {
      // req.token에서 토큰 가져오기
      const token = req.token || extractToken(req);

      // 토큰이 없을 경우
      if (!token) {
        return next(
          new AppError(
            commonErrors.authenticationError,
            '토큰이 비어있습니다.',
            401,
          ),
        );
      }

      // 토큰이 유효한지 확인
      const secretKey = config.jwtSecret || 'secretkey';

      jwt.verify(token, secretKey, function (err, jwtDecoded) {
        if (err) handleTokenError(err, next);

        // 토큰에서 사용자 정보 추출
        const { id, email, role } = jwtDecoded;

        // req 객체에 사용자 정보 저장
        req.userId = id;
        req.userEmail = email;
        req.userRole = role;
        req.token = token;

        // 관리자인지 확인
        if (requireAdmin && role !== 'admin') {
          return next(
            new AppError(
              commonErrors.authorizationError,
              '접근 권한이 없습니다.',
              403,
            ),
          );
        }

        next();
      });
    } catch (error) {
      console.log('error: ', error);
      next(
        new AppError(
          commonErrors.authorizationError,
          '접근 권한이 없습니다.',
          403,
        ),
      );
    }
  };

  // 토큰을 추출하는 함수
const extractToken = (req) => {
  // 헤더의 authorization에 토큰이 있을 때
  if (req.headers.authorization) {
    return req.headers.authorization.split(' ')[1];
  }

  // 서버가 보낸 쿠키에 토큰이 있을 때
  if (req.headers.cookie) {
    const tokenCookie = req.headers.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('token='));
    return tokenCookie ? tokenCookie.replace('token=', '') : null;
  }

  return null;
};

module.exports = checkAuthentication;
