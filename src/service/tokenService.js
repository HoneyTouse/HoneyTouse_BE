const jwt = require('jsonwebtoken');
const config = require('../config');

class TokenService {
  generateToken(user, expiresIn) {
    const id = user._id ? user._id.toString() : user.id;
    const tokenPayload = {
      id,
    };

    return jwt.sign(tokenPayload, config.jwtSecret, { expiresIn });
  }

  // 액세스 토큰 생성
  generateAccessToken(user) {
    // return this.generateToken(user, '10s'); // 10초 (개발 확인용)
    return this.generateToken(user, '10m'); // 10분
  }

  // 리프레시 토큰 생성
  generateRefreshToken(user) {
    // return this.generateToken(user, '30s'); // 30초 (개발 확인용)
    return this.generateToken(user, '6h'); // 6시간
  }
}

module.exports = new TokenService();
