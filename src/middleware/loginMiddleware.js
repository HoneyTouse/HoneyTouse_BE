const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const jwt = require('jsonwebtoken');
const config = require('../config');

// 관리자 여부를 확인해야 할 때는 requireAdmin을 true로 설정
const checkAuthentication =
  (requireAdmin = false) =>
  (req, res, next) => {
    try {
      // req.token에서 토큰을 가져옵니다.
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
        if (err) {
          return handleTokenError(err, next);
        }

        // 토큰에서 사용자 정보 추출
        const { id, email, role } = jwtDecoded;

        // req 객체에 사용자 정보 저장
        req.userId = id;
        req.userEmail = email;
        req.userRole = role;

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

const extractToken = (req) => {
  if (req.headers.authorization) {
    return req.headers.authorization.split(' ')[1];
  }

  if (req.headers.cookie) {
    const tokenCookie = req.headers.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('token='));
    return tokenCookie ? tokenCookie.replace('token=', '') : null;
  }

  return null;
};

const handleTokenError = (err, next) => {
  let errorMessage = '토큰 검증 중 오류가 발생했습니다.';
  let statusCode = 401;

  switch (err.name) {
    case 'TokenExpiredError':
      errorMessage = '토큰이 만료되었습니다.';
      break;
    case 'JsonWebTokenError':
      errorMessage = '유효하지 않은 토큰입니다.';
      break;
    case 'NotBeforeError':
      errorMessage = '토큰이 아직 활성화되지 않았습니다.';
      break;
  }

  next(new AppError(commonErrors.authorizationError, errorMessage, statusCode));
};

module.exports = checkAuthentication;
