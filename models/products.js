'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    productNumber: DataTypes.STRING,
    description: DataTypes.STRING,
    startPrice: DataTypes.FLOAT,
    lastPrice: DataTypes.FLOAT,
    categoriesValue: DataTypes.STRING,
    sales: DataTypes.BOOLEAN
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};