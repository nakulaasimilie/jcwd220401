"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Branch.belongsTo(models.Admin);
      Branch.hasMany(models.Inventory);
      Branch.hasMany(models.Product_store_reference);

      // Branch.hasMany(models.Transaction);
    }
  }
  Branch.init(
    {
      branchName: DataTypes.STRING,
      address: DataTypes.STRING,
      postalCode: DataTypes.INTEGER,
      phoneNumber: DataTypes.INTEGER,
      longitude: DataTypes.STRING,
      lattitude: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      provinceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Branch",
    },
  );
  return Branch;
};
