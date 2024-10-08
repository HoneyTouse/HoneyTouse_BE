const { orderDAO } = require('../data-access');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const withTransaction = require('../settings/transactionUtils');

class OrderService {
  // 주문 추가
  async createOrder({ status, customerId, product, memo, payment }) {
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
      if (newOrder === null) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          '잘못된 요청입니다.',
          400,
        );
      }
      return newOrder;
    });
  }

  // 주문 1개 조회
  async getOrder(id) {
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
    if (orders === null) {
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
    return orders;
  }

  // 상태별 주문 조회
  async getOrdersByStatus(status) {
    const orders = await orderDAO.getOrdersByStatus(status);
    return orders;
  }

  // 주문 수정
  async updateOrder(id, { status, customerId, product, memo, payment }) {
    return withTransaction(async (session) => {
      const updatedOrder = await orderDAO.updateOne(
        id,
        {
          status,
          customerId,
          product,
          memo,
          payment,
        },
        { session },
      );
      if (updatedOrder === null) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          '수정할 주문이 존재하지 않습니다',
          404,
        );
      }
      return updatedOrder;
    });
  }

  // 주문 삭제
  async deleteOrder(id) {
    return withTransaction(async (session) => {
      const deletedOrder = await orderDAO.deleteOne(id, { session });
      if (deletedOrder === null) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          '해당 주문이 존재하지 않습니다',
          404,
        );
      }
      return deletedOrder;
    });
  }
}

module.exports = new OrderService();
