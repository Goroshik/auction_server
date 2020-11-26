const { Products } = require('../models');
const parsingQueryString = require('../_helpers/parsingQueryString');

class ProductsRepository {
  constructor() {
    this.products = Products;
  }

  getAll(categories) {
    const filterData = parsingQueryString(categories);

    return this.products.findAll(filterData);
  }

  add(productData) {
    return this.products.create(productData)
      .then(res => ({ id: res.id }));
  }

  get(productId) {
    return this.products.findByPk(productId);
  }

  update(productData) {
    return this.products.update(
      productData,
      {
        where: {
          id: productData.id
        }
      })
      .then(() => this.get(productData.id));
  }

  delete(productId) {
    return this.products.destroy({ where: { id: productId } })
      .then(() => ({ id: Number(productId), deleted: true }));
  }

}

module.exports = new ProductsRepository();
