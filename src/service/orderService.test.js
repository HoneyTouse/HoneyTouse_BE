// const { MongoMemoryServer } = require('mongodb-memory-server');
// const mongoose = require('mongoose');
// const { orderService } = require('./index');
// const orderDAO = require('../data-access/orderDAO');
// const AppError = require('../misc/AppError');
// const commonErrors = require('../misc/commonErrors');

// let mongoServer;
// let productId;
// let optionId;
// let customerId;
// let orderId;

// beforeEach(async () => {
//   productId = new mongoose.Types.ObjectId();
//   optionId = new mongoose.Types.ObjectId();
//   customerId = new mongoose.Types.ObjectId();
// });

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = mongoServer.getUri();
//   await mongoose.connect(mongoUri);
// });

// afterAll(async () => {
//   await mongoose.connection.db.dropDatabase();
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// afterEach(async () => {
//   await mongoose.connection.db.dropDatabase();
// });

// describe('orderService.createOrder', () => {
//   it('주문 생성 시 필수 정보가 없으면 실패한다', async () => {
//     const invalidOrderData = {
//       status: '입금 대기',
//       customerId,
//       product: [], // 상품정보 누락
//       memo: '문앞에 놓고 문자 메시지 부탁드립니다다',
//       payment: {
//         ttlPriceItem: 5,
//         ttlPriceDelivery: 3000,
//         ttlPrice: 5000,
//       },
//     };

//     // 주문 생성 시 오류가 발생해야 한다.
//     await expect(orderService.createOrder(invalidOrderData)).rejects.toThrow(
//       AppError,
//     );

//     // 오류 후 DB에 해당 주문이 없어야 한다.
//     const orders = await orderDAO.findMany();
//     expect(orders.length).toBe(0);
//   });

//   it('새로운 주문 생성이 성공한다', async () => {
//     const orderData = {
//       status: '입금 대기',
//       customerId,
//       product: [
//         {
//           id: productId,
//           name: '꽃병',
//           count: 12,
//           image: 'imageurl',
//           options: optionId,
//         },
//       ],
//       memo: '부재중 경비실에 부탁드립니다',
//       payment: {
//         ttlPriceItem: 100,
//         ttlPriceDelivery: 0,
//         ttlPrice: 100,
//       },
//     };

//     const newOrder = await orderService.createOrder(orderData);

//     orderId = newOrder._id;

//     expect(newOrder).toHaveProperty('_id');
//     expect(newOrder).toHaveProperty('customerId');
//     expect(newOrder).toHaveProperty('product');
//     expect(newOrder.status).toBe('입금 대기');
//   });
// });

// describe('orderService.getOrder', () => {
//   it('주문이 정상적으로 조회된다', async () => {
//     const orderData = {
//       status: '입금 대기',
//       customerId,
//       product: [
//         {
//           id: productId,
//           name: '꽃병',
//           count: 12,
//           image: 'imageurl',
//           options: optionId,
//         },
//       ],
//       memo: '부재중 경비실에 부탁드립니다',
//       payment: {
//         ttlPriceItem: 100,
//         ttlPriceDelivery: 0,
//         ttlPrice: 100,
//       },
//     };

//     const createdOrder = await orderService.createOrder(orderData);

//     const order = await orderService.getOrder(createdOrder._id);

//     expect(order._id.toString()).toBe(createdOrder._id.toString());
//     expect(order.status).toBe('입금 대기');
//   });

//   it('존재하지 않는 주문 조회 시 오류가 발생한다', async () => {
//     const invalidOrderId = new mongoose.Types.ObjectId();
//     await expect(orderService.getOrder(invalidOrderId)).rejects.toThrow(
//       AppError,
//     );
//   });
// });

// describe('OrderService.updateOrder', () => {
//   it('주문 수정이 성공한다', async () => {
//     const orderData = {
//       status: '입금 대기',
//       customerId,
//       product: [
//         {
//           id: productId,
//           name: '꽃병',
//           count: 12,
//           image: 'imageurl',
//           options: optionId,
//         },
//       ],
//       memo: '부재중 경비실에 부탁드립니다',
//       payment: {
//         ttlPriceItem: 100,
//         ttlPriceDelivery: 0,
//         ttlPrice: 100,
//       },
//     };

//     const newOrder = await orderService.createOrder(orderData);

//     orderId = newOrder._id;

//     const updatedOrder = await orderService.updateOrder(orderId, {
//       status: '결제 완료',
//       memo: '부재시 그냥 경비실에 맡겨주세요.',
//     });

//     expect(updatedOrder.status).toBe('결제 완료');
//     expect(updatedOrder.memo).toBe('부재시 그냥 경비실에 맡겨주세요.');
//   });

//   it('존재하지 않는 주문 수정 시 오류가 발생한다', async () => {
//     const invalidOrderId = new mongoose.Types.ObjectId();

//     try {
//       await expect(
//         orderService.updateOrder(invalidOrderId, {
//           status: '결제 완료',
//           memo: '부재시 그냥 경비실에 맡겨주세요.',
//         }),
//       );
//     } catch (error) {
//       expect(error).toBeInstanceOf(AppError);
//       expect(error.message).toBe('유효하지 않은 주문 ID입니다.');
//       expect(error.httpCode).toBe(400);
//     }
//   });
// });

// describe('orderService.deleteOrder', () => {
//   it('주문 삭제가 성공한다', async () => {
//     const orderData = {
//       status: '입금 대기',
//       customerId,
//       product: [
//         {
//           id: productId,
//           name: '꽃병',
//           count: 12,
//           image: 'imageurl',
//           options: optionId,
//         },
//       ],
//       memo: '부재중 경비실에 부탁드립니다',
//       payment: {
//         ttlPriceItem: 100,
//         ttlPriceDelivery: 0,
//         ttlPrice: 100,
//       },
//     };

//     const newOrder = await orderService.createOrder(orderData);

//     orderId = newOrder._id;

//     const deletedOrder = await orderService.deleteOrder(orderId);
//     expect(deletedOrder._id.toString()).toBe(orderId.toString());
//   });

//   it('존재하지 않는 주문 삭제 시 오류가 발생한다', async () => {
//     const invalidOrderId = new mongoose.Types.ObjectId();
//     await expect(orderService.deleteOrder(invalidOrderId)).rejects.toThrow(
//       AppError,
//     );
//   });
// });

// describe('orderService.getOrdersByStatus', () => {
//   it('주어진 상태에 해당하는 주문들이 조회된다', async () => {
//     const orderData1 = {
//       status: '배송 중',
//       customerId,
//       product: [
//         {
//           id: productId,
//           name: '요술램프',
//           count: 2,
//           image: 'imageurl',
//           options: optionId,
//         },
//       ],
//       memo: '부재중 경비실에 부탁드립니다',
//       payment: {
//         ttlPriceItem: 100,
//         ttlPriceDelivery: 0,
//         ttlPrice: 100,
//       },
//     };

//     const orderData2 = {
//       status: '결제 완료',
//       customerId,
//       product: [
//         {
//           id: productId,
//           name: '화분',
//           count: 5,
//           image: 'imageurl',
//           options: optionId,
//         },
//       ],
//       memo: '경비실에 부탁드립니다.',
//       payment: {
//         ttlPriceItem: 50,
//         ttlPriceDelivery: 2000,
//         ttlPrice: 2050,
//       },
//     };

//     await orderService.createOrder(orderData1);
//     await orderService.createOrder(orderData2);

//     const orders = await orderService.getOrdersByStatus('결제 완료');

//     expect(orders).toHaveLength(1);
//     expect(orders[0].status).toBe('결제 완료');
//   });

//   it('존재하지 않는 상태로 주문을 조회하면 에러가 반환된다', async () => {
//     try {
//       const orders = await orderService.getOrdersByStatus('취소됨');
//       expect(orders).toHaveLength(0);
//     } catch (error) {
//       expect(error).toBeInstanceOf(AppError);
//       expect(error.message).toBe('해당 주문내역이 존재하지 않습니다');
//       expect(error.httpCode).toBe(404);
//     }
//   });
// });

// describe('orderService.getOrders', () => {
//   it('주문이 여러 개 존재할 때, 모든 주문이 조회된다', async () => {
//     // 첫 번째 주문
//     const orderData1 = {
//       status: '입금 대기',
//       customerId,
//       product: [
//         {
//           id: productId,
//           name: '꽃병',
//           count: 12,
//           image: 'imageurl',
//           options: optionId,
//         },
//       ],
//       memo: '부재중 경비실에 부탁드립니다',
//       payment: {
//         ttlPriceItem: 100,
//         ttlPriceDelivery: 0,
//         ttlPrice: 100,
//       },
//     };

//     // 두 번째 주문
//     const orderData2 = {
//       status: '결제 완료',
//       customerId,
//       product: [
//         {
//           id: productId,
//           name: '화분',
//           count: 5,
//           image: 'imageurl',
//           options: optionId,
//         },
//       ],
//       memo: '경비실에 부탁드립니다.',
//       payment: {
//         ttlPriceItem: 50,
//         ttlPriceDelivery: 2000,
//         ttlPrice: 2050,
//       },
//     };

//     // 주문 생성
//     await orderService.createOrder(orderData1);
//     await orderService.createOrder(orderData2);

//     // 주문 조회
//     const orders = await orderService.getOrders();

//     // 주문들이 정상적으로 조회되는지 확인
//     expect(orders).toHaveLength(2); // 두 개의 주문이 조회되어야 함
//     expect(orders[0]).toHaveProperty('_id'); // 각 주문에 _id 속성이 있어야 함
//     expect(orders[1]).toHaveProperty('_id'); // 두 번째 주문도 _id 속성이 있어야 함
//   });

//   it('주문이 하나도 없을 때는 오류가 발생한다', async () => {
//     await orderDAO.deleteMany({});

//     try {
//       await expect(orderService.getOrders()).toMatchObject({});
//     } catch (error) {
//       expect(error).toBeInstanceOf(AppError);
//       expect(error.message).toBe('해당 주문내역이 존재하지 않습니다');
//       expect(error.httpCode).toBe(404);
//     }
//   });
// });

// describe('orderService.getOrdersByCustomerId', () => {
//   it('주어진 고객 ID에 해당하는 주문들이 조회된다', async () => {
//     customerId = new mongoose.Types.ObjectId();
//     // 첫 번째 주문
//     const orderData1 = {
//       status: '입금 대기',
//       customerId,
//       product: [
//         {
//           id: productId,
//           name: '꽃병',
//           count: 12,
//           image: 'imageurl',
//           options: optionId,
//         },
//       ],
//       memo: '부재중 경비실에 부탁드립니다',
//       payment: {
//         ttlPriceItem: 100,
//         ttlPriceDelivery: 0,
//         ttlPrice: 100,
//       },
//     };

//     // 두 번째 주문
//     const orderData2 = {
//       status: '결제 완료',
//       customerId,
//       product: [
//         {
//           id: productId,
//           name: '화분',
//           count: 5,
//           image: 'imageurl',
//           options: optionId,
//         },
//       ],
//       memo: '경비실에 부탁드립니다.',
//       payment: {
//         ttlPriceItem: 50,
//         ttlPriceDelivery: 2000,
//         ttlPrice: 2050,
//       },
//     };

//     await orderService.createOrder(orderData1);
//     await orderService.createOrder(orderData2);
//     const customersOrders =
//       await orderService.getOrdersByCustomerId(customerId);
//     expect(customersOrders.length).toBe(2);
//   });

//   it('존재하지 않는 고객 ID로 주문을 조회하면 에러가 난다다', async () => {
//     const nonExistentCustomerId = new mongoose.Types.ObjectId();

//     try {
//       const orders = await orderService.getOrdersByCustomerId(
//         nonExistentCustomerId,
//       );
//     } catch (error) {
//       console.error(error);
//       expect(error).toBeInstanceOf(AppError);
//       expect(error.message).toBe('해당 주문내역이 존재하지 않습니다');
//       expect(error.httpCode).toBe(404);
//     }
//   });
// });
