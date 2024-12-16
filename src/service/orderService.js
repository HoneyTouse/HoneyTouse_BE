const { orderDAO } = require('../data-access');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const withTransaction = require('../settings/transactionUtils');
const mongoose = require('mongoose');

class OrderService {
  // 주문 추가
  async createOrder({ status, customerId, product, memo, payment }) {
    // 상품 정보가 비어 있으면 오류를 발생시킴
    if (!product || product.length === 0) {
      throw new AppError(
        commonErrors.invalidRequestError,
        '상품 정보가 누락되었습니다.',
        400,
      );
    }

    return withTransaction(async (session) => {
      const newOrder = await orderDAO.create(
        {
          status,
          customerId,
          product,
          memo,
          payment,
        },
        { session },
      );

      return newOrder;
    });
  }

  // 주문 1개 조회
  async getOrder(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(
        commonErrors.invalidRequestError,
        '유효하지 않은 주문 ID입니다.',
        400,
      );
    }
    const order = await orderDAO.findById(id);
    if (order === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 주문이 존재하지 않습니다',
        404,
      );
    }
    return order;
  }

  // 주문 여러 개 조회
  async getOrders() {
    const orders = await orderDAO.findMany();
    if (orders === null || orders.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 주문내역이 존재하지 않습니다',
        404,
      );
    }
    return orders;
  }

  // 사용자별 주문 조회
  async getOrdersByCustomerId(customerId) {
    const orders = await orderDAO.findByCustomerId(customerId);
    if (!orders || orders.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 주문내역이 존재하지 않습니다',
        404,
      );
    }
    return orders;
  }

  // 상태별 주문 조회
  async getOrdersByStatus(status) {
    const orders = await orderDAO.getOrdersByStatus(status);
    if (!orders || orders.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 주문내역이 존재하지 않습니다',
        404,
      );
    }
    return orders;
  }

  // 주문 수정
  async updateOrder(id, { status, customerId, product, memo, payment }) {
    const updatedOrder = await orderDAO.updateOne(id, {
      status,
      customerId,
      product,
      memo,
      payment,
    });
    if (updatedOrder === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '수정할 주문이 존재하지 않습니다',
        404,
      );
    }
    return updatedOrder;
  }

  // 주문 삭제
  async deleteOrder(id) {
    const deletedOrder = await orderDAO.deleteOne(id);
    if (deletedOrder === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 주문이 존재하지 않습니다',
        404,
      );
    }
    return deletedOrder;
  }
}

module.exports = new OrderService();
