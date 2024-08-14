const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { userDAO } = require('../data-access');
const config = require('../config');

// Google OAuth Strategy 설정
passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Google에서 제공하는 사용자 프로필 정보
        const { email, name } = profile._json;

        // 이메일로 사용자를 조회
        let user = await userDAO.findByEmail(email);

        if (!user) {
          // 사용자가 없으면 신규 사용자 생성
          user = await userDAO.create({
            name,
            email,
            password: '', // 구글 로그인은 비밀번호가 필요 없음
            role: 'user',
          });
        }

        // 사용자 정보를 반환
        done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

// 세션에 사용자 정보를 저장
passport.serializeUser((user, done) => {
  try {
    if (!user._id) {
      return done(new Error('User ID is missing'));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// 세션에서 사용자 정보를 복원
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userDAO.findById(id);
    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
