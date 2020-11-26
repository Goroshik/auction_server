const router = require('express').Router();

const usersService = require('../service/users.service');

const responseHandler = require('../_helpers/responseHandler');

router.post('/', async (req, res) => {
  const userData = req.body;
  const result = await usersService.add(userData);

  responseHandler(result, res);
});

router.get('/all', async (req, res) => {
  const result = await usersService.getAll();

  responseHandler(result, res);
});

router.get('/', async (req,res) => {
  const token = req.headers.authorization;
  const result = await usersService.getByToken(token);

  responseHandler(result, res);
});

router.get('/:id', async (req, res) => {
  const userID = req.params.id;
  const result = await usersService.get(userID);

  responseHandler(result, res);
});

router.put('/', async (req, res) => {
  const token = req.headers.authorization;
  const userData = req.body;

  const result = await usersService.update(token, userData);
  responseHandler(result, res);
});

router.delete('/:id', async (req, res) => {
  const userID = req.params.id;
  const result = await usersService.delete(userID);

  responseHandler(result, res);
});

module.exports = router;
