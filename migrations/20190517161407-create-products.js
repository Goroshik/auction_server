'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productNumber: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      startPrice: {
        type: Sequelize.FLOAT
      },
      lastPrice: {
        type: Sequelize.FLOAT
      },
      categoriesValue: {
        type: Sequelize.STRING
      },
      sales: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};