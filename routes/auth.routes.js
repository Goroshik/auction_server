const router = require('express').Router();

const AuthorizationService = require('../service/auth.service');
const responseHandler = require('../_helpers/responseHandler');

router.post('/login', async (req, res) => {
  const result = await AuthorizationService.login(req.body);

  responseHandler(result, res);
});

const verifyUser = (req, res, next) => {
  try {
    if(req.url === '/api/users/' && req.method === 'POST') {
      return next();
    }

    if (!req.headers.authorization) {
      throw new Error('Invalid Token');
    }

    const token = req.headers.authorization.split(' ')[1];
    AuthorizationService.verifyUser(token);

    next();
  } catch (err) {
    responseHandler(new Error('Invalid Token'), res);
  }
};

module.exports = {
  login: router,
  verifyUser
};
