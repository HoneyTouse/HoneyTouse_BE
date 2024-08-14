const authService = require('./authService');
const orderService = require('./orderService');
const categoryService = require('./categoryService');
const productService = require('./productService');
const googleOAuthService = require('./googleOAuthService');

module.exports = {
  authService,
  categoryService,
  productService,
  orderService,
  googleOAuthService,
};
