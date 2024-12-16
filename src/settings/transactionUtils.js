const mongoose = require('mongoose');
const logger = require('./logger');

async function withTransaction(fn) {
  // 세로운 세션 시작 후 트랜잭션 시작
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    logger.info('Starting transaction...');

    const result = await fn(session);

    // 트랜잭션 커밋
    await session.commitTransaction();
    logger.info('Transaction committed successfully');
    return result;
  } catch (error) {
    // 에러 발생 시 트랜잭션 롤백
    await session.abortTransaction();

    // 새로운 에러 객체 생성 후 로그 출력
    const enhancedError = new Error(`Transaction failed: ${error.message}`);
    enhancedError.originalError = error;
    enhancedError.stack = error.stack;

    logger.error(
      { err: enhancedError },
      'Transaction error occurred during the process',
    );

    // 오류 던지기
    throw enhancedError;
  } finally {
    // 세션 종료
    session.endSession();
    logger.info('Transaction Ended');
  }
}

module.exports = withTransaction;
