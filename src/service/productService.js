const AppError = require('../misc/AppError');
const commonErrors = require('../misc/commonErrors');
const { productDAO, optionDAO } = require('../data-access');
const withTransaction = require('../settings/transactionUtils');

class ProductService {
  // 상품 추가
  async createProduct({
    name,
    categoryId,
    brand,
    price,
    image,
    options,
    description,
  }) {
    return withTransaction(async (session) => {
      const newOptions = await optionDAO.create(
        {
          name: options.name,
          value: options.value,
        },
        { session },
      );

      const newProduct = await productDAO.create(
        {
          name,
          categoryId,
          brand,
          price,
          image,
          options: newOptions._id,
          description,
        },
        { session },
      );
      return newProduct;
    });
  }

  // 상품 삭제
  async deleteProduct(id) {
    const product = await productDAO.findById(id);
    if (!product) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        'Product not found',
        404,
      );
    }
    await optionDAO.deleteById(product.options);
    const deletedProduct = await productDAO.deleteById(id);

    return deletedProduct;
  }

  // 모든 상품 조회
  async getProducts() {
    const products = await productDAO.findMany();
    return products;
  }

  // 카테고리별 상품 조회
  async getProductsByCategoryId(categoryId) {
    const products = await productDAO.findByCategoryId(categoryId);
    return products;
  }

  // 모든 옵션 조회
  async getOptions() {
    const options = await optionDAO.findMany();
    return options;
  }

  // 옵션 ID로 옵션 조회
  async getOptionById(id) {
    const option = await optionDAO.findById(id);
    return option;
  }

  // 상품 ID로 상품 조회
  async getProductById(id) {
    const product = await productDAO.findById(id);
    return product;
  }

  // 상품 수정
  async updateProduct(
    id,
    { name, categoryId, brand, price, image, options, description },
  ) {
    return withTransaction(async (session) => {
      const product = await productDAO.findById(id);
      if (product === null) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          '해당 상품이 존재하지 않습니다.',
          404,
        );
      }

      const updatedOption = await optionDAO.updateById(product.options, {
        name: options.name,
        values: options.values,
      }); // product.options는 options collection의 ID임

      if (updatedOption === null) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          '해당 상품 또는 옵션이 존재하지 않습니다.',
          404,
        );
      }

      const updatedProduct = await productDAO.updateById(
        id,
        {
          name,
          categoryId,
          brand,
          price,
          image,
          description,
        },
        { session },
      );

      return updatedProduct;
    });
  }
}

module.exports = new ProductService();
