const loginMiddleware = require('./loginMiddleware');
const categoryMiddleware = require('./categoryMiddleware');
const orderMiddleware = require('./orderMiddleware');
const {
  checkProductIdFrom,
  checkProductCategoryFrom,
  checkOptionIdFrom,
} = require('./productMiddleware');

module.exports = {
  loginMiddleware,
  categoryMiddleware,
  orderMiddleware,
  checkProductIdFrom,
  checkProductCategoryFrom,
  checkOptionIdFrom
};
