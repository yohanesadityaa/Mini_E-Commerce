'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        this.belongsTo(models.User, {
          foreignKey: "user_id",
          as: "user",
        });
        this.belongsTo(models.Product, {
          foreignKey: "product_id",
          as: "product",
        });
    }
  }
  History.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};