'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    userID: DataTypes.INTEGER,
    productID: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    dateTime: DataTypes.STRING
  }, {});
  History.associate = function(models) {
    // associations can be defined here
  };
  return History;
};