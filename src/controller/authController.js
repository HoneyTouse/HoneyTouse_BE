const { authService } = require('../service');
const utils = require('../misc/utils');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {
  refreshCookieOptions,
  clearCookieOptions,
} = require('../settings/cookieOptions');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const logger = require('../settings/logger');

const authController = {
  // 회원가입 컨트롤러
  async postSignUp(req, res, next) {
    try {
      const { name, phoneNumber, email, password, address, addressDetail } =
        req.body;

      const newUser = await authService.signUp({
        name,
        phoneNumber,
        email,
        plainPassword: password,
        address,
        addressDetail,
        role: 'user', // 기본적으로 일반회원은 'user'
      });

      res.status(201).json(utils.buildResponse(newUser));
    } catch (error) {
      next(error);
    }
  },

  // 로그인 컨트롤러
  async postSignIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await authService.signIn({
        email,
        plainPassword: password,
      });

      res.cookie('refreshToken', refreshToken, refreshCookieOptions);

      res.status(201).json(utils.buildResponse({ accessToken }));
    } catch (error) {
      next(error);
    }
  },

  // 로그아웃 컨트롤러
  async postSignOut(req, res, next) {
    try {
      const cookies = req.headers.cookie;

      if (cookies) {
        const cookieObj = cookies.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {});

        if (cookieObj.refreshToken) {
          res.clearCookie('refreshToken', clearCookieOptions);
        }
      }

      res.status(200).json({
        message: '로그아웃 되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  },

  // 개인정보 수정 컨트롤러
  async patchUpdateProfile(req, res, next) {
    try {
      const { email, address, addressDetail, password } = req.body;

      const data = await authService.updateProfile({
        email,
        address,
        addressDetail,
        password,
      });

      res.status(200).json(utils.buildResponse(data));
    } catch (error) {
      next(error);
    }
  },

  // 모든 회원 정보 조회 컨트롤러
  async getAllProfile(req, res, next) {
    try {
      const data = await authService.getAllProfile();
      res.status(200).json(utils.buildResponse(data));
    } catch (error) {
      next(error);
    }
  },

  // 개인정보 조회 컨트롤러
  async getProfile(req, res, next) {
    try {
      const id = req.userId;

      if (!id) {
        // 사용자가 인증되지 않았다면 401 Unauthorized 에러 반환
        return next(
          new AppError(
            commonErrors.authenticationError,
            '인증되지 않은 사용자입니다.',
            401,
          ),
        );
      }
      const userProfile = await authService.getProfile(id);

      res.status(200).json(utils.buildResponse(userProfile));
    } catch (error) {
      logger.error('Error while get user profile:', error.message);
      next(error);
    }
  },

  // 회원탈퇴 컨트롤러
  async postDeleteProfile(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      // 해당 token이 정상적인 token인지 확인
      const secretKey = config.jwtSecret || 'secretkey';
      const jwtDecoded = jwt.verify(token, secretKey);

      // 토큰에서 ID 추출
      const { id } = jwtDecoded;
      const data = await authService.deleteProfile(id);

      res.status(200).json(utils.buildResponse(data));
    } catch (error) {
      next(error);
    }
  },

  // 이메일 인증 요청 컨트롤러
  async postEmailVerification(req, res, next) {
    try {
      const { email } = req.body;

      const verificationCode = await authService.sendVerificationCode(email);

      res.status(200).json(utils.buildResponse(verificationCode));
    } catch (error) {
      next(error);
    }
  },

  // 이메일 인증 확인 컨트롤러
  async postVerifyEmail(req, res, next) {
    try {
      const { inputNumber, email } = req.body;

      const result = await authService.verifyEmail(inputNumber, email);

      res.status(200).json(utils.buildResponse(result));
    } catch (error) {
      next(error);
    }
  },

  // 새로운 비밀번호로 변경 확인 컨트롤러
  async postChangePassword(req, res, next) {
    try {
      const { email, newPassword, newPasswordConfirm } = req.body;

      const result = await authService.changePassword(
        email,
        newPassword,
        newPasswordConfirm,
      );

      res.status(201).json(utils.buildResponse(result));
    } catch (error) {
      next(error);
    }
  },

  // 프로필 이미지 변경 컨트롤러
  async postUploadProfileImage(req, res, next) {
    try {
      const result = await authService.uploadProfileImage(req, res);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: 'Profile image uploaded successfully.',
          imageUrl: result.imageUrl,
        });
      } else {
        res.status(400).json({ success: false, message: result.message });
      }
    } catch (error) {
      logger.error('Error uploading profile image:', error.message);
      next(error);
    }
  },

  // 액세스토큰 업데이트 컨트롤러
  async postRefreshAccessToken(req, res, next) {
    try {
      const result = await authService.refreshAccessToken(req);

      res.status(200).json(utils.buildResponse(result));
    } catch (error) {
      logger.error('Error while updating access token:', error.message);
      next(error);
    }
  },
};

module.exports = authController;
