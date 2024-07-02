const { categoryDAO } = require('../data-access');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const withTransaction = require('../misc/transactionUtils');

class CategoryService {
  // 카테고리 생성 메소드
  async createCategory({ name }) {
    return withTransaction(async (session) => {
      const newCategory = await categoryDAO.create(
        {
          name,
        },
        { session },
      );
      await session.commitTransaction();
      return newCategory;
    });
  }

  // 특정 id를 갖는 하나의 카테고리를 가져오는 메소드
  async getCategory(id) {
    const category = await categoryDAO.findById(id);
    return category;
  }

  // 전체 카테고리를 가져오는 메소드
  async getCategories() {
    const categories = await categoryDAO.findMany();
    return categories;
  }

  // 특정 id를 갖는 하나의 카테고리를 업데이트하는 메소드
  async updateCategory(id, { name }) {
    return withTransaction(async (session) => {
      const updatedCategory = await categoryDAO.updateById(
        id,
        { name },
        { session },
      );
      if (updatedCategory === null) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          '해당 카테고리가 존재하지 않습니다',
          404,
        );
      }
      return updatedCategory;
    });
  }

  // 특정 id를 갖는 하나의 카테고리를 삭제하는 메소드
  async deleteCategory(id) {
    return withTransaction(async (session) => {
      const deletedCategory = await categoryDAO.deleteById(id, { session });
      if (deletedCategory === null) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          '해당 카테고리가 존재하지 않습니다',
          404,
        );
      }
      return deletedCategory;
    });
  }
}

module.exports = new CategoryService();
