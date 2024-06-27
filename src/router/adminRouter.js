const express = require('express');
const {
  categoryController,
  orderController,
  productController,
  authController,
} = require('../controller');
const { checkProductCategoryFrom } = require('../middleware');
const { orderMiddleware } = require('../middleware');
const checkAuthentication = require('../middleware/loginMiddleware');
const adminRouter = express.Router();

// GET /api/v1/admin/orders
// 전체 주문 조회
adminRouter.get(
  '/orders',
  checkAuthentication(true),
  orderController.getAllOrders,
);

// GET /api/v1/admin/orders/status?status=
// 관리자 주문상태별 조회
adminRouter.get(
  '/orders/status',
  checkAuthentication(true),
  orderController.getOrdersByStatus,
);

// POST /api/v1/admin/orders/
// 관리자 주문 추가
adminRouter.post(
  '/orders',
  checkAuthentication(true),
  orderMiddleware,
  orderController.postOrder,
);

// PUT /api/v1/admin/orders/:id
// 관리자 주문 수정 (단일 상품)
adminRouter.put(
  '/orders/:id',
  checkAuthentication(true),
  // orderMiddleware,
  orderController.putOrder,
);
// DELETE /api/v1/admin/orders/:id
// 관리자 주문 삭제 (단일 상품)
adminRouter.delete(
  '/orders/:id',
  checkAuthentication(true),
  orderController.deleteOrder,
);

// PUT /api/v1/admin/categories
// 관리자 카테고리 추가
adminRouter.post(
  '/categories',
  checkAuthentication(true),
  categoryController.postCategory,
);
// PUT /api/v1/admin/categories/:id
// 관리자 카테고리 수정
adminRouter.put(
  '/categories/:id',
  checkAuthentication(true),
  categoryController.putCategory,
);
// DELETE /api/v1/admin/categories/:id
// 관리자 카테고리 삭제
adminRouter.delete(
  '/categories/:id',
  checkAuthentication(true),
  categoryController.deleteCategory,
);

// POST /api/v1/admin/products
// 관리자 상품 추가
adminRouter.post(
  '/products',
  checkAuthentication(true),
  checkProductCategoryFrom,
  productController.postProduct,
);
// PUT /api/v1/admin/products/:id
// 관리자 상품 수정 (단일 상품)
adminRouter.put(
  '/products/:id',
  checkAuthentication(true),
  // checkProductCategoryFrom,
  productController.putProduct,
);
// DELETE /api/v1/admin/products/:id
// 관리자 상품 삭제 (단일 상품)
adminRouter.delete(
  '/products/:id',
  checkAuthentication(true),
  productController.deleteProduct,
);

// GET /api/v1/admin/userInfo/
// 관리자 전체 회원 조회
adminRouter.get(
  '/userInfo',
  checkAuthentication(true),
  authController.getAllProfile,
);

module.exports = adminRouter;
