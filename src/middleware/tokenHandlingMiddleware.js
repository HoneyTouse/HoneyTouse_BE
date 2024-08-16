const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const jwt = require('jsonwebtoken');
const config = require('../config');

const tokenHandlingMiddleware = (req, res, next) => {
  const token = req.token;

  if (!token) {
    return next();
  }

  const secretKey = config.jwtSecret || 'secretkey';

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return handleTokenError(err, next);
    }

    // 토큰이 유효할 경우, 사용자 정보를 req 객체에 저장
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.userRole = decoded.role;

    next();
  });
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

module.exports = tokenHandlingMiddleware;
