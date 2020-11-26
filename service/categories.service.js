const CategoriesRepository = require('../repository/categories.repository');

class CategoriesService {
  constructor() {
    this.categoriesRepository = CategoriesRepository;
  }

  getAll() {
    return this.categoriesRepository.getAll();
  }

  add(categoryData) {
    return this.categoriesRepository.add(categoryData);
  }

  update(categoryData) {
    return this.categoriesRepository.update(categoryData)
      .then(category => {
        if (!category) {
          throw new Error();
        }

        return category;
      })
      .catch(() => {
        return new Error('Category does not update');
      });
  }

  delete(categoryId) {
    return this.categoriesRepository.delete(categoryId);
  }

}

module.exports = new CategoriesService();
