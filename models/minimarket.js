'use strict';
module.exports = (sequelize, DataTypes) => {
  var Minimarket = sequelize.define('Minimarket', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Minimarket.associate = function(models) {
    // associations can be defined here
  };
  return Minimarket;
};