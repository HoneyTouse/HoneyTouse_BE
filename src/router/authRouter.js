const express = require('express');
const { authController } = require('../controller');
const { authService } = require('../service');
const checkAuthentication = require('../middleware/loginMiddleware');
const passport = require('passport');
const { ClientUrl } = require('../config');
const {
  googleCookieOptions,
  refreshCookieOptions,
} = require('../settings/cookieOptions');
const authRouter = express.Router();
const logger = require('../settings/logger');

// POST /api/v1/auth/sign-up
// 회원가입
authRouter.post('/sign-up', authController.postSignUp);

// POST /api/v1/auth/sign-in
// 로그인
authRouter.post('/sign-in', authController.postSignIn);

// POST /api/v1/auth/sign-out
// 로그아웃
authRouter.post('/sign-out', authController.postSignOut);

// 구글 로그인 요청
// GET /api/v1/auth/google
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

// 구글 로그인 콜백 처리
// GET /api/v1/auth/google/callback
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    if (req.user) {
      try {
        const token = await authService.generateToken(req.user);

        res.cookie('token', token, googleCookieOptions);

        res.cookie('refreshToken', refreshToken, refreshCookieOptions);

        res.redirect(`${ClientUrl}`);
      } catch (error) {
        logger.error('Error generating token after google callback:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      logger.warn('No req.user!');
      res.status(401).send('Unauthorized');
    }
  },
);

// PATCH /api/v1/auth/me
// 개인정보 수정 (주소, 비밀번호만 수정 가능)
authRouter.patch(
  '/me',
  checkAuthentication(),
  authController.patchUpdateProfile,
);

// GET /api/v1/auth/me
// 개인정보 조회
authRouter.get('/me', checkAuthentication(), authController.getProfile);

// POST /api/v1/auth/withdraw
// 개인정보 삭제 (탈퇴)
authRouter.post(
  '/withdraw',
  checkAuthentication(),
  authController.postDeleteProfile,
);

// POST /api/v1/auth/send-confirmation-email
// 이메일 인증요청
authRouter.post(
  '/send-confirmation-email',
  authController.postEmailVerification,
);

// POST /api/v1/auth/confirm-email
// 이메일 인증완료
authRouter.post('/confirm-email', authController.postVerifyEmail);

// POST /api/v1/auth/change-password
// 비밀번호 변경
authRouter.post(
  '/change-password',
  checkAuthentication(),
  authController.postChangePassword,
);

// POST /api/v1/auth/upload-profile-image
// 프로필 이미지 변경
authRouter.post(
  '/upload-profile-image',
  checkAuthentication(),
  authController.postUploadProfileImage,
);

// POST /api/v1/auth/refresh-access-token
// 액세스토큰 업데이트
authRouter.post(
  '/refresh-access-token',
  checkAuthentication(),
  authController.postRefreshAccessToken,
);

module.exports = authRouter;
