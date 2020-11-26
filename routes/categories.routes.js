const router = require('express').Router();
const categoriesService = require('../service/categories.service');

const responseHandler = require('../_helpers/responseHandler');

router.get('/', async (req, res) => {
  const result = await categoriesService.getAll();

  responseHandler(result, res);
});

router.post('/', async (req, res) => {
  const newCategory = req.body;
  const result = await categoriesService.add(newCategory);

  responseHandler(result, res);
});

router.put('/:id', async (req, res) => {
  const category = req.body;
  category.id = req.params.id;

  const result = await categoriesService.update(category);

  responseHandler(result, res);
});

router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;
  const result = await categoriesService.delete(categoryId);

  responseHandler(result, res);
});

module.exports = router;
