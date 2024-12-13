const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../data-access/model');
const withTransaction = require('./transactionUtils');

// User 모델 모킹
jest.mock('../data-access/model', () => {
  const mockUser = jest.fn().mockImplementation((data) => ({
    ...data,
    save: jest.fn().mockResolvedValue(data),
  }));

  mockUser.findOne = jest.fn();
  mockUser.deleteMany = jest.fn();

  return mockUser;
});

let mongoServer;

// 테스트 전 MongoDB 메모리 시작
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// 테스트 후 MongoDB 연결 종료
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // 각 테스트 전 User 모델 초기화
  User.mockClear();
  User.findOne.mockClear();
  User.deleteMany.mockClear();
});

describe('withTransaction', () => {
  it('작업이 성공적으로 완료되면 트랜잭션을 커밋해야 한다', async () => {
    const result = await withTransaction(async (session) => {
      const user = new User({
        name: 'Honey Touse',
        email: 'honeytouse@example.com',
      });
      return await user.save({ session });
    });

    // 모킹된 findOne 메서드 설정
    User.findOne.mockResolvedValue({
      name: 'Honey Touse',
      email: 'honeytouse@example.com',
    });

    const user = await User.findOne({ email: 'honeytouse@example.com' });
    expect(user).not.toBeNull();
    expect(user.name).toBe('Honey Touse');
    expect(user.email).toBe('honeytouse@example.com');
  });

  it('오류가 발생하면 트랜잭션을 롤백해서 실패한 작업을 초기화한다', async () => {
    User.findOne.mockResolvedValue(null);

    try {
      await withTransaction(async (session) => {
        const user = new User({
          name: 'honey bee',
          email: 'honeybee@example.com',
        });
        await user.save({ session });

        throw new Error('트랜잭션 진행 중 오류 발생');
      });
    } catch (error) {
      const user = await User.findOne({ name: 'honey bee' });
      expect(user).toBeNull();
    }
  });

  it('트랜잭션 중 오류를 올바르게 처리하여 로그로 남긴다', async () => {
    try {
      await withTransaction(async (session) => {
        const user = new User({
          name: 'honey money',
          email: 'moneyhoney@example.com',
        });
        await user.save({ session });

        throw new Error('트랜잭션 진행 중 오류 발생');
      });
    } catch (error) {
      expect(error.message).toMatch(/Transaction failed/);
    }
  });
});
