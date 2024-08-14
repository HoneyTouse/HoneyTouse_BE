const express = require('express');
const config = require('../config');
const { authController } = require('../controller');
const { authService } = require('../service');
const loginCheck = require('../middleware/loginMiddleware');
const passport = require('passport');

const authRouter = express.Router();

// POST /api/v1/auth/sign-up
// 회원가입
authRouter.post('/sign-up', authController.postSignUp);

// POST /api/v1/auth/sign-in
// 로그인
authRouter.post('/sign-in', authController.postSignIn);

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
        // res.json({ token: token.token });
        // res.redirect(`http://localhost:8080?token=${token.token}`);
        res.redirect(`${config.ClientUrl}?token=${token.token}`);
      } catch (error) {
        console.error('Error generating token:', error);
      }
    } else {
      console.log('No req.user!');
    }
  },
);

// // GET /api/v1/auth/google
// // 구글 로그인 요청
// authRouter.get('/google', authController.getGoogleLogin);

// // GET /api/v1/auth/google/callback
// // 구글 로그인 콜백
// authRouter.get('/google/callback', authController.getGoogleCallback);

// PATCH /api/v1/auth/me
// 개인정보 수정 (주소, 비밀번호만 수정 가능)
authRouter.patch('/me', loginCheck, authController.patchUpdateProfile);

// GET /api/v1/auth/me
// 개인정보 조회
authRouter.get('/me', loginCheck, authController.getProfile);

// POST /api/v1/auth/withdraw
// 개인정보 삭제 (탈퇴)
authRouter.post('/withdraw', loginCheck, authController.postDeleteProfile);

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
  loginCheck,
  authController.postChangePassword,
);

// POST /api/v1/auth/upload-profile-image
// 프로필 이미지 변경
authRouter.post(
  '/upload-profile-image',
  loginCheck,
  authController.postUploadProfileImage,
);

module.exports = authRouter;
