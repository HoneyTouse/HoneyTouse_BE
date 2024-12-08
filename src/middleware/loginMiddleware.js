const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const jwt = require('jsonwebtoken');
const handleTokenError = require('./utils/tokenHandling');
const extractToken = require('./utils/extractToken');
const config = require('../config');
const { userDAO } = require('../data-access');

// 관리자 여부를 확인해야 할 때는 requireAdmin을 true로 설정
const checkAuthentication =
  (requireAdmin = false) =>
  async (req, res, next) => {
    try {
      // 1) 액세스 토큰 확인 (헤더 혹은 쿠키에서 가져오기)
      const accessToken = extractToken(req);

      if (!accessToken) {
        return next(
          new AppError(
            commonErrors.authenticationError,
            '엑세스 토큰이 없습니다.',
            401,
          ),
        );
      }

      // 액세스 토큰 유효성 검사
      const secretKey = config.jwtSecret || 'secretkey';

      try {
        const jwtDecoded = jwt.verify(accessToken, secretKey);

        // 토큰에서 사용자 ID 추출
        const { id } = jwtDecoded;

        const user = await userDAO.findById(id);

        // req 객체에 사용자 정보 저장
        req.userId = id;
        req.token = accessToken;

        // 관리자인지 확인
        if (requireAdmin && user.role !== 'admin') {
          return next(
            new AppError(
              commonErrors.authorizationError,
              '관리자 권한이 없습니다.',
              403,
            ),
          );
        }

        return next();
      } catch (err) {
        // 2) 액세스 토큰이 만료된 경우, 리프레시 토큰을 확인
        if (err.name === 'TokenExpiredError') {
          const refreshToken = req.headers.cookie
            .split('; ')
            .find((cookie) => cookie.startsWith('refreshToken='))
            .replace('refreshToken=', '');

          if (!refreshToken) {
            return next(
              new AppError(
                commonErrors.authenticationError,
                '리프레시 토큰이 없습니다.',
                401,
              ),
            );
          }

          // 리프레시 토큰 유효성 검사
          try {
            jwt.verify(refreshToken, secretKey);
            return next();
          } catch (refreshErr) {
            console.error('리프레시 토큰 검증 실패', refreshErr);
            return next(
              new AppError(
                commonErrors.authenticationError,
                'RefreshToken Expired',
                401,
              ),
            );
          }
        }

        // 다른 종류의 토큰 에러 처리
        return handleTokenError(err, next);
      }
    } catch (error) {
      console.error('토큰 처리 중 오류:', error.message);
      return next(
        new AppError(
          commonErrors.authenticationError,
          '인증이 실패했습니다.',
          401,
        ),
      );
    }
  };

module.exports = checkAuthentication;
