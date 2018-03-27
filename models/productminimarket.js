'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductMinimarket = sequelize.define('ProductMinimarket', {
    ProductId: DataTypes.INTEGER,
    MinimarketId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  ProductMinimarket.associate = function(models) {
    // associations can be defined here
  };
  return ProductMinimarket;
};