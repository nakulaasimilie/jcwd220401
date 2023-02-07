const db = require("../models");
const admin = db.Admin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { sequelize, Sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

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
        isEmailExist.password,
      );
      if (!isPasswordValid) throw "Wrong Password";

      const token = jwt.sign(
        {
          email: isEmailExist.email,
          name: isEmailExist.name,
          id: isEmailExist.id,
          isSuper: isEmailExist.isSuper,
        },
        "jcwd2204",
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
  getOrder: async (req, res) => {
    try {
      const orders = await sequelize.query(
        "SELECT users.name, branches.branchName, (products.name) as product, product_store_references.stock, order_items.quantity, products.price, (order_items.quantity*products.price) as total_price, order_statuses.status_order from products inner join product_store_references on product_store_references.ProductId = products.id inner join branches on branches.id = product_store_references.BranchId inner join order_items on order_items.ProductStoreReferenceId = product_store_references.id inner join users on users.id = order_items.UserId inner join orders on order_items.OrderId = orders.id inner join order_statuses on order_statuses.id = orders.OrderStatusId;",
        {
          logging: console.log,
          plain: false,
          raw: false,
          type: QueryTypes.SELECT,
        },
      );
      console.log("get order", orders);
      res.status(200).send(orders);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getBranchOrder: async (req, res) => {
    try {
      const token = req.header("tokenBranch");
      const decodedHeader = jwt_decode(token);
      const email = decodedHeader.email;

      console.log("decode Header", decodedHeader);
      console.log("email", email);

      const branchOrders = await sequelize.query(
        'SELECT users.name, (products.name) as product, product_store_references.stock, order_items.quantity, products.price, (order_items.quantity*products.price) as total_price, order_statuses.status_order from products inner join product_store_references on product_store_references.ProductId = products.id inner join branches on branches.id = product_store_references.BranchId inner join order_items on order_items.ProductStoreReferenceId = product_store_references.id inner join users on users.id = order_items.UserId inner join admins on branches.AdminId = admins.id inner join orders on order_items.OrderId = orders.id inner join order_statuses on order_statuses.id = orders.OrderStatusId where admins.email = "' +
          email +
          '"',
        {
          logging: console.log,
          plain: false,
          raw: false,
          type: QueryTypes.SELECT,
        },
      );
      console.log("get Branch Order", branchOrders);
      res.status(200).send(branchOrders);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  sendOrder: async (req, res) => {
    try {
      const OrderStatusId = req.query.OrderStatusId;
      const OrderId = req.query.OrderId;
      console.log("OrderStatusId", OrderStatusId);
      console.log("OrderId", OrderId);
      const users = await sequelize.query(
        "UPDATE database_grocery.orders SET OrderStatusId = 4 WHERE id = 1 ",
        {
          logging: console.log,
          plain: false,
          raw: false,
          type: sequelize.QueryTypes.UPDATE,
        },
      );
      res.status(200).send("test");
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
