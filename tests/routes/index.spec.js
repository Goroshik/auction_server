const testsData = require('../../tests.data');

const usersService = require('../../service/users.service');

let userID = 0;

describe('routes tests', () => {
  before(async () => {
    userID = await usersService.add(testsData.user);
  });

  after(async () => {
    await usersService.delete(userID);
  });

  require('./auth.spec');
  require('./users.spec');
  require('./categories.spec');
  require('./history.spec');
  require('./products.spec');
});
