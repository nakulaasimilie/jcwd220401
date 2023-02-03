"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart);
      Product.hasMany(models.Category);
      Product.hasMany(models.Inventory);
      Product.hasMany(models.Product_store_reference);
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      statement: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.STRING,
      },
      size: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Product",
    },
  );
  return Product;
};
