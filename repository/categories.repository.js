const { Categories } = require('../models');

class CategoriesRepository {
  constructor() {
    this.categories = Categories;
  }

  getAll() {
    return this.categories.findAll();
  }

  add(categoryData) {
    return this.categories.create(categoryData);
  }

  get(categoryId) {
    return this.categories.findOne({
      where: { id: categoryId }
    });
  }

  update(categoryData) {
    return this.categories.update(
      categoryData,
      {
        where: { id: categoryData.id }
      })
      .then(() => this.get(categoryData.id));
  }

  delete(categoryId) {
    return this.categories.destroy({ where: { id: categoryId } })
      .then(() => ({ id: Number(categoryId), deleted: true }));
  }

}

module.exports = new CategoriesRepository();
