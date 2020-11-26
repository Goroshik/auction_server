const router = require('express').Router();
const productsService = require('../service/products.service');

const responseHandler = require('../_helpers/responseHandler');

router.get('/', async (req, res) => {
  const result = await productsService.getAll(req.query);

  responseHandler(result, res);
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const result = await productsService.get(productId);

  responseHandler(result, res);
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  const result = await productsService.add(newProduct);

  responseHandler(result, res);
});

router.put('/:id', async (req, res) => {
  const product = req.body;
  product.id = req.params.id;

  const result = await productsService.update(product);

  responseHandler(result, res);
});

router.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  const result = await productsService.delete(productId);

  responseHandler(result, res);
});

module.exports = router;
