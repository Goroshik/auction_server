/* eslint-disable no-console */
const db = require('../models');

const conectionDB = () => db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = conectionDB();
module.exports = db;
