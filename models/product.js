'use strict';
const {ProductMinimarket, Minimarket} = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING
  }, {
    hooks: {
      
    }
  });
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsToMany(models.Minimarket, {through: models.ProductMinimarket})
    Product.hasMany(models.ProductMinimarket)
  };
  
  return Product;
};