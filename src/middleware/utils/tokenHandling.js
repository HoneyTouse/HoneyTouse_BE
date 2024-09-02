const AppError = require('../../misc/AppError');
const commonErrors = require('../../misc/commonErrors');

// 토큰 검증 중 발생한 오류에 대한 세부적인 에러 처리
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

module.exports = handleTokenError;
