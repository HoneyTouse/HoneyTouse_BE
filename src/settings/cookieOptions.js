const commonOptions = {
  domain: process.env.COOKIE_DOMAIN,
  maxAge: 60 * 60 * 1000 * 5, // 5시간
};

// 배포환경
const productionOptions = {
  secure: true,
  httpOnly: true,
  sameSite: 'none',
};

// 개발환경
const developmentOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

module.exports = {
  getCookieOptions: () => {
    return {
      ...commonOptions,
      ...(process.env.NODE_ENV === 'production'
        ? productionOptions
        : developmentOptions),
    };
  },
};
