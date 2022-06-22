'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.History, {
        foreignKey: "product_id",
        as: "history",
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};