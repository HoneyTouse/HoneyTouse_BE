const mongoose = require('mongoose');

// 트랜잭션 관리를 위한 유틸리티 함수 정의
async function withTransaction(fn) {
  // 세로운 세션 시작 후 트랜잭션 시작
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // 주어진 비동기 함수를 세션과 함께 실행
    const result = await fn(session);
    // 트랜잭션 커밋
    await session.commitTransaction();
    return result;
  } catch (error) {
    // 에러 발생 시 트랜잭션 롤백
    await session.abortTransaction();
    // 새로운 에러 객체 생성 후 로그 출력
    const enhancedError = new Error(`Transaction failed: ${error.message}`);
    enhancedError.originalError = error;
    enhancedError.stack = error.stack;
    console.error('Transaction error:', enhancedError);
    throw enhancedError;
  } finally {
    // 세션 종료
    session.endSession();
  }
}

module.exports = withTransaction;
