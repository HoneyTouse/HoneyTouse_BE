const loginMiddleware = require('./loginMiddleware');
const categoryMiddleware = require('./categoryMiddleware');
const orderMiddleware = require('./orderMiddleware');
const {
  checkProductIdFrom,
  checkProductCategoryFrom,
  checkOptionIdFrom,
} = require('./productMiddleware');
const loginStatusMiddleware = require('./loginStatusMiddleware');

module.exports = {
  loginMiddleware,
  categoryMiddleware,
  orderMiddleware,
  checkProductIdFrom,
  checkProductCategoryFrom,
  checkOptionIdFrom,
  loginStatusMiddleware,
};
