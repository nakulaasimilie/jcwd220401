const db = require("../models");
const admin = db.Admin;
const branch = db.Branch;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { sequelize, Sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, isSuper } = req.body.data;
      const { BranchId } = req.body;

      if (password.length < 8) throw "Minimum 8 characters";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const data = await admin.create({
        name,
        email,
        password: hashPass,
        isSuper,
        BranchId,
      });

      const token = jwt.sign({ email: email }, "jcwd2204");

      const result = await branch.findOne({
        where: {
          id: req.body.BranchId,
        },
        include: [{ model: admin }],
      });

      await branch.update(
        {
          AdminId: data.dataValues.id,
        },
        {
          where: {
            id: req.body.BranchId,
          },
        },
      );

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
        "SELECT Users.name, (Products.name) as product, Product_store_references.stock, Order_items.quantity, Products.price, (Order_items.quantity*Products.price) as total_price, Order_statuses.status_order from Products inner join Product_store_references on Product_store_references.ProductId = Products.id inner join Branches on Branches.id = Product_store_references.BranchId inner join Order_items on Order_items.ProductStoreReferenceId = Product_store_references.id inner join Users on Users.id = Order_items.user_id inner join Admins on Branches.AdminId = Admins.id inner join Orders on Order_items.order_id = Orders.id inner join Order_statuses on Order_statuses.id = Orders.OrderStatusId;",
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
        'SELECT Users.name, (Products.name) as product, Product_store_references.stock, Order_items.quantity, Products.price, (Order_items.quantity*Products.price) as total_price, Order_statuses.status_order from Products inner join Product_store_references on Product_store_references.ProductId = Products.id inner join Branches on Branches.id = Product_store_references.BranchId inner join Order_items on Order_items.ProductStoreReferenceId = Product_store_references.id inner join Users on Users.id = Order_items.user_id inner join Admins on Branches.AdminId = Admins.id inner join Orders on Order_items.order_id = Orders.id inner join Order_statuses on Order_statuses.id = Orders.OrderStatusId where Admins.email ="' +
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
