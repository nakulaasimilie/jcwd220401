"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_item.belongsTo(models.User);
      Order_item.hasMany(models.Order_detail);
    }
  }
  Order_item.init(
    {
      no_invoice: {
        type: DataTypes.STRING(300),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      courier: {
        type: DataTypes.STRING,
      },
      addressReceiver: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      total_price: {
        type: DataTypes.INTEGER,
      },
      transaction_status: {
        type: DataTypes.ENUM("diproses", "disetujui", "selesai", "batal"),
        defaultValue: "diproses",
        allowNull: false,
      },
      phoneNumUser: {
        type: DataTypes.STRING,
      },
      paymentImage: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order_item",
    },
  );
  return Order_item;
};
