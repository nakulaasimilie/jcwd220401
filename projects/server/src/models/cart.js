"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.Product);
      Cart.belongsTo(models.Branch);
    }
  }
  Cart.init(
    {
      note: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      description: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      totalCheckout: DataTypes.INTEGER,
      totalWeight: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    },
  );
  return Cart;
};
