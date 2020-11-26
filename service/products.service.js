const ProductsRepository = require('../repository/products.repository');
const HistoryService = require('../service/history.service');

class ProductsService {
  constructor() {
    this.productsRepository = ProductsRepository;
    this.historyService = HistoryService;
  }

  getAll(filtetCategories) {
    return this.productsRepository.getAll(filtetCategories);
  }

  add(productsData) {
    return this.productsRepository.add(productsData)
      .then(product => {
        const history = {
          productID: product.id,
          price: productsData.startPrice,
          dateTime: new Date().toLocaleString()
        };
        
        return this.historyService.add(history);
      })
      .catch(() => new Error('Product not found!'));
  }

  get(productId) {
    return this.productsRepository.get(productId)
      .then(product => {
        if(!product) {
          return new Error('Product not found!');
        }
        
        return product;
      });
  }

  update(userData) {
    return this.productsRepository.update(userData)
      .then(product => {
        if (!product) {
          throw new Error();
        }

        return product;
      })
      .catch(() => {
        return new Error('Product does not update');
      });
  }

  delete(productId) {
    return this.productsRepository.delete(productId)
      .catch(() => {
        return new Error('product does not exist');
      });
  }

}

module.exports = new ProductsService();
