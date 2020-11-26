const { sequelize } = require('../models/index');
const { closeConnection } = require('../index');

describe('mocha tests', () => {
  after(() => {
    sequelize.close();
    closeConnection();
  });

  require('./routes/index.spec');
});
