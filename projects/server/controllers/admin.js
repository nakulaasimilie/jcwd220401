const db = require("../models");
const admin = db.Admin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, isSuper } = req.body;

      if (password.length < 8) throw "Minimum 8 characters";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const data = await admin.create({
        name,
        email,
        password: hashPass,
        isSuper,
      });

      const token = jwt.sign({ email: email }, "jcwd2204");

      res.status(200).send({
        massage: "Register Succes",
        data,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      console.log(req.body);
      const { password, email } = req.body;
      const isEmailExist = await admin.findOne({
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
          id: isEmailExist.id,
          isSuper: isEmailExist.isSuper,
        },
        "jcwd2204"
      );

      res.status(200).send({
        msg: "Login Sukses",
        user: {
          name: isEmailExist.name,
          id: isEmailExist.id,
          email: isEmailExist.email,
          isSuper: isEmailExist.isSuper,
        },
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "jcwd2204");
      const result = await admin.findOne({
        where: {
          email: verify.email,
        },
        raw: true,
      });
      console.log(result);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  findAll: async (req, res) => {
    try {
      const admins = await admin.findAll({
        where: {
          isSuper: 1,
        },
        attributes: ["name", "email", "isSuper"],
        raw: true,
      });
      res.status(200).send(admins);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
