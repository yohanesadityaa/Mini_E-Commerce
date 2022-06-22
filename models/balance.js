'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
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
    }
  }
  Balance.init({
    user_id: DataTypes.INTEGER,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Balance',
  });
  return Balance;
};