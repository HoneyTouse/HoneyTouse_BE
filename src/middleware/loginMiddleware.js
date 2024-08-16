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
