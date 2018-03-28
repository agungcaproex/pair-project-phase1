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
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'Hanya bisa dimasukkan angka !!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (productMinimarket, options) => {
        if(productMinimarket.price == null || productMinimarket.price == ''){
          productMinimarket.price = 0;
        }
      }
    }
  });
  ProductMinimarket.associate = function(models) {
    // associations can be defined here
    ProductMinimarket.belongsTo(models.Product)
    ProductMinimarket.belongsTo(models.Minimarket)
  };
  return ProductMinimarket;
};