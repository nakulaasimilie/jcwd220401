const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { uuid } = require("uuidv4");
const Sequelize = require("sequelize");
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    try {
      console.log(req.body);
      const { password, email } = req.body;
      const isEmailExist = await User.findOne({
        where: {
          email,
        },
        raw: true,
      });

      console.log(isEmailExist);

      if (!isEmailExist) throw "User Not Found";

      const isPasswordValid = await bcrypt.compare(
        password,
        isEmailExist.password
      );
      if (!isPasswordValid) throw "Wrong Password";

      const token = jwt.sign(
        {
          email: isEmailExist.email,
          name: isEmailExist.name,
          is_verified: isEmailExist.is_verified,
        },
        "kompeni-mart"
      );

      res.status(200).send({
        msg: "Login Sukses",
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "kompeni-mart");
      console.log(verify);
      const result = await User.findAll({
        where: {
          id: verify.id,
        },
      });

      res.status(200).send({
        id: result[0].id,
        email: result[0].email,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  // loginAdmin: async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     console.log(req.body);
  //     const emailExist = await User.findOne({
  //       where: {
  //         email,
  //       },
  //       raw: true,
  //     });

  //     // if (emailExist.role == "user") throw "User unauthorized";
  //     if (emailExist === null) throw "Email Not Found";
  //     const isValid = await bcrypt.compare(password, emailExist.password);
  //     if (!isValid) throw "Password Incorrect";
  //     const token = jwt.sign(
  //       {
  //         id: emailExist.id,
  //         email: emailExist.email,
  //         name: emailExist.name,
  //       },
  //       "kompeni-mart"
  //     );

  //     res.status(200).send({
  //       user: {
  //         id: emailExist.id,
  //         name: emailExist.name,
  //         email: emailExist.email,
  //       },
  //       token,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   }
  // },
};
