const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { uuid } = require("uuidv4");
const Sequelize = require("sequelize");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      const { name, password, email, phone_number } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const isIdentical = await bcrypt.compare(password, hashPassword);
      console.log(isIdentical);
      const verificationSignature = await uuid();

      const user = await User.build({
        name,
        email,
        password: hashPassword,
        phone_number,
        verification_signature: verificationSignature,
      });
      await user.save();

      var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "cc2bc063db04e6",
          pass: "ff74359a65d51c",
        },
      });
      const message = {
        from: "nakulabaiduri@gmail.com",
        to: "nakulabaiduri@gmail.com",
        subject: "Verifikasi Email",
        html: `<a href="https://jcwd220401.purwadhikabootcamp.com/register?email=${email}&verification_signature=${verificationSignature}">Klik disini untuk verifikasi</a>`,
      };
      await transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

      const total = await User.count({ where: { email } });
      console.log("total", total);
      res.status(200).send(user.toJSON());
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  verification: async (req, res) => {
    try {
      const email = req.query.email;
      const verificationSignature = req.query.verification_signature;
      const user = await User.findOne({
        where: Sequelize.and(
          { email },
          { verification_signature: verificationSignature },
        ),
      });
      if (user === null) {
        console.log("Not found!");
        res.status(404).send("data tidak ditemukan");
        return;
      } else {
        console.log(user instanceof User); // true
        const result = await User.update(
          { is_verified: 1 },
          {
            where: Sequelize.and(
              { email },
              { verification_signature: verificationSignature },
            ),
          },
        );

        if (result[0] === 1) {
          res
            .status(200)
            .send(
              "Anda telah terverifikasi, silahkan klik link berikut untuk kembali login ",
            );
          return;
        } else {
          res.status(500).send("terjadi kesalahan pada sistem");
          return;
        }
        console.log("ini result :", result);
        console.log(user.email); // 'My Title'
      }
      res.status(200).send(user.toJSON());
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword, email, confirmPassword } = req.body;
      console.log(req.body);
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      console.log("new pass", hashPassword);
      if (newPassword !== confirmPassword)
        throw "Password doesnt match with confirm password";
      const userObj = await User.findOne({
        where: {
          email,
        },
        raw: true,
      });

      console.log(userObj);

      if (!userObj) throw "User Not Found";

      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        userObj.password,
      );
      if (!isPasswordValid) throw "Wrong Password";
      const userUpdated = await User.update(
        {
          password: hashPassword,
        },
        {
          where: { email },
        },
      );
      res.status(200).send(userObj);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  sendEmailResetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const accountObj = await User.findOne({
        where: { email },
        raw: true,
      });

      if (accountObj === null) throw "Account not found";

      const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "cc2bc063db04e6",
          pass: "ff74359a65d51c",
        },
      });
      const message = {
        from: "nakulabaiduri@gmail.com",
        to: "nakulabaiduri@gmail.com",
        subject: "Reset Password ",
        html: `<a href="https://jcwd220401.purwadhikabootcamp.com/resetPassword?email=${email}&verification_signature=${accountObj.verification_signature}">Klik disini untuk forgot password</a>`,
      };
      await transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
      const total = await User.count({ where: { email } });
      console.log("total", total);
      res.status(200).send(accountObj);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { password, confirmPassword } = req.body;
      const { verificationSignature } = req.body;
      console.log("verification Signature", verificationSignature);
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      console.log("new pass", hashPass);
      if (password !== confirmPassword)
        throw "Password doesnt match with confirm password";
      const userObj = await User.findOne({
        where: {
          // email,
          verification_signature: verificationSignature,
        },
        raw: true,
      });
      console.log(userObj);
      if (!userObj) throw "User Not Found";
      const userUpdated = await User.update(
        {
          password: hashPass,
        },
        {
          where: { verification_signature: verificationSignature },
        },
      );
      res.status(200).send(userObj);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  findAllUser: async (req, res) => {
    try {
      const users = await User.findAll({ raw: true });
      return res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
