// const passport = require('passport');
// const AuthService = require('../service/authService');

// class GoogleAuthService {
//   // Google login processing
//   authenticateGoogle(req, res, next) {
//     console.log('Google OAuth authentication 시작함!');
//     passport.authenticate('google', {
//       scope: ['profile', 'email'],
//     })(req, res, next);
//   }

//   // Handle Google login callback
//   handleGoogleCallback(req, res, next) {
//     console.log('구글 로그인 콜백 처리 시작!');
//     passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }), async (err, user, info) => {
//       console.log('콜백 핸들러 진입');
//       console.log('Error:', err);
//       console.log('User:', user);
//       console.log('Info:', info);

//       if (err) {
//         console.error('Authentication error:', err);
//         return res.redirect('/login');
//       }

//       if (!user) {
//         console.warn('No user found');
//         return res.redirect('/login');
//       }

//       console.log('User found:', user);
//       console.log('Passport 인증 성공', user);

//       req.logIn(user, async (err) => {
//         if (err) {
//           console.error('로그인 처리 중 오류 발생', err);
//           return next(err);
//         }

//         try {
//           console.log('AuthService.signIn 호출 시작');

//           const { token } = await AuthService.generateTokenByEmail({
//             email: user.email,
//           });

//           console.log('Token 생성 성공:', token);
//           res.redirect(`/?token=${token}`);
//         } catch (error) {
//           console.error('Token 생성 중 오류 발생:', error.message);
//           return res.redirect('/login');
//         }
//       })(req, res, next);
//     });
//   }
// }

// module.exports = new GoogleAuthService();
