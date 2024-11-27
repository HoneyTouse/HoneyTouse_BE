const express = require('express');
const { authController } = require('../controller');
const { authService } = require('../service');
const checkAuthentication = require('../middleware/loginMiddleware');
const loginStatus = require('../middleware/loginStatusMiddleware');
const passport = require('passport');
const { ClientUrl } = require('../config');
const { cookieOptions } = require('../settings/cookieOptions');

const authRouter = express.Router();

// POST /api/v1/auth/sign-up
// 회원가입
authRouter.post('/sign-up', authController.postSignUp);

// POST /api/v1/auth/sign-in
// 로그인
authRouter.post('/sign-in', authController.postSignIn);

// GET /api/v1/auth/sign-out
// 로그아웃
authRouter.post('/sign-out', authController.getSignOut);

// GET /api/vi/auth/status
// 클라이언트에서 로그인 여부 확인할 때 결과를 리턴하는 API
authRouter.get('/status', loginStatus, authController.checkStatus);

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

        res.cookie('token', token.token, cookieOptions);

        res.redirect(`${ClientUrl}`);
      } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      console.log('No req.user!');
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
authRouter.get(
  '/me',
  checkAuthentication(),
  authController.getProfile,
);

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

module.exports = authRouter;
