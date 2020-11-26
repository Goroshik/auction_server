const router = require('express').Router();
const historyService = require('../service/history.service');

const responseHandler = require('../_helpers/responseHandler');

router.get('/', async (req, res) => {
  const query = req.query;
  const result = await historyService.getAll(query);

  responseHandler(result, res);
});

router.post('/', async (req, res) => {
  const newHistory = req.body;
  const token = req.headers.authorization;
  const result = await historyService.add(newHistory, token);

  responseHandler(result, res);
});

router.delete('/:id', async (req, res) => {
  const historyId = req.params.id;
  const result = await historyService.delete(historyId);

  responseHandler(result, res);
});

module.exports = router;
