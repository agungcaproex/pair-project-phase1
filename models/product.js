'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.Minimarket, {through: models.ProductMinimarket})
    Product.hasMany(models.ProductMinimarket)
  };
  return Product;
};