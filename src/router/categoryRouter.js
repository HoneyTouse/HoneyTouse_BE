const express = require('express');
const { categoryController } = require('../controller');

const categoryRouter = express.Router();

// GET /api/v1/categories/:id
// 카테고리 조회 (단일 카테고리)
categoryRouter.get('/:id', categoryController.getCategory);

// GET /api/v1/categories
// 카테고리 조회 (전체 카테고리)
categoryRouter.get('/', categoryController.getCategories);

module.exports = categoryRouter;
