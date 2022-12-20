"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phone_number: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthdate: DataTypes.STRING,
      profile_picture_url: DataTypes.STRING,
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verification_signature: {
        type: DataTypes.STRING,
      },
      geolocation: DataTypes.STRING,
      store_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
