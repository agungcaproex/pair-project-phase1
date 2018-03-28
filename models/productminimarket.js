'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductMinimarket = sequelize.define('ProductMinimarket', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ProductId: DataTypes.INTEGER,
    MinimarketId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  ProductMinimarket.associate = function(models) {
    // associations can be defined here
    ProductMinimarket.belongsTo(models.Product)
    ProductMinimarket.belongsTo(models.Minimarket)
  };
  return ProductMinimarket;
};