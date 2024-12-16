const { categoryDAO } = require('../data-access');
const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const withTransaction = require('../settings/transactionUtils');

class CategoryService {
  // 카테고리 생성 메소드
  async createCategory({ name }) {
    const newCategory = await categoryDAO.create({
      name,
    });
    return newCategory;
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
    const updatedCategory = await categoryDAO.updateById(id, { name });
    if (updatedCategory === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 카테고리가 존재하지 않습니다',
        404,
      );
    }
    return updatedCategory;
  }

  // 특정 id를 갖는 하나의 카테고리를 삭제하는 메소드
  async deleteCategory(id) {
    const deletedCategory = await categoryDAO.deleteById(id);
    if (deletedCategory === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        '해당 카테고리가 존재하지 않습니다',
        404,
      );
    }
    return deletedCategory;
  }
}

module.exports = new CategoryService();
