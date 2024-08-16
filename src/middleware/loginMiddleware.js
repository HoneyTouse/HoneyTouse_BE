const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');

const loginMiddleware = (req, res, next) => {
  const token = req.token || extractToken(req);

  if (!token) {
    return next(
      new AppError(
        commonErrors.authenticationError,
        '토큰이 비어있습니다.',
        401,
      ),
    );
  }

  req.token = token;
  next();
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

module.exports = loginMiddleware;

// const AppError = require('../misc/AppError');
// const commonErrors = require('../misc/commonErrors');
// const jwt = require('jsonwebtoken');
// const config = require('../config');

// // 관리자 여부를 확인해야할 때는 requireAdmin을 true로 설정
// const checkAuthentication =
//   (requireAdmin = false) =>
//   (req, res, next) => {
//     try {
//       // 헤더에서 토큰 추출
//       const token = req.headers.authorization.split(' ')[1];

//       // 토큰 문자열이 없거나 null인지 확인
//       if (!token || token === '') {
//         next(
//           new AppError(
//             commonErrors.authenticationError,
//             '토큰이 비어있습니다.',
//             401,
//           ),
//         );
//         return;
//       }

//       // 해당 token이 정상적인 token인지 확인
//       const secretKey = config.jwtSecret || 'secretkey';

//       // 토큰 에러 종류별로 처리
//       jwt.verify(token, secretKey, function (err, jwtDecoded) {
//         if (err) {
//           if (err.name === 'TokenExpiredError') {
//             next(
//               new AppError(
//                 commonErrors.authorizationError,
//                 '토큰이 만료되었습니다.',
//                 401,
//               ),
//             );
//           } else if (err.name === 'JsonWebTokenError') {
//             next(
//               new AppError(
//                 commonErrors.authorizationError,
//                 '유효하지 않은 토큰입니다.',
//                 401,
//               ),
//             );
//           } else if (err.name === 'NotBeforeError') {
//             next(
//               new AppError(
//                 commonErrors.authorizationError,
//                 '토큰이 아직 활성화되지 않았습니다.',
//                 401,
//               ),
//             );
//           } else {
//             next(
//               new AppError(
//                 commonErrors.authorizationError,
//                 '토큰 검증 중 오류가 발생했습니다.',
//                 401,
//               ),
//             );
//           }
//           return;
//         }

//         // 토큰에서 이메일, 역할 추출
//         const { id, email, role } = jwtDecoded;

//         // request 객체에 사용자 id, 이메일, 역할 추출
//         req.userId = id;
//         req.userEmail = email;
//         req.userRole = role;

//         // 관리자인지 확인
//         if (requireAdmin && req.userRole !== 'admin') {
//           return next(
//             new AppError(
//               commonErrors.authorizationError,
//               '접근 권한이 없습니다.',
//               403,
//             ),
//           );
//         }

//         next();
//       });
//     } catch (error) {
//       console.log('error: ', error);
//       next(
//         new AppError(
//           commonErrors.authorizationError,
//           '접근 권한이 없습니다.',
//           403,
//         ),
//       );
//     }
//   };

// module.exports = checkAuthentication;
