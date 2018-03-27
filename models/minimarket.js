'use strict';
module.exports = (sequelize, DataTypes) => {
  var Minimarket = sequelize.define('Minimarket', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Minimarket.associate = function(models) {
    // associations can be defined here
    Minimarket.belongsToMany(models.Product, {through: models.ProductMinimarket})
    Minimarket.hasMany(models.ProductMinimarket)
  };
  return Minimarket;
};