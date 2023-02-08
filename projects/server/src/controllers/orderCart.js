const { Op } = require("sequelize");
const db = require("../models");
const address = db.Address;
const user = db.User;
const cart = db.Cart;
const orderDetail = db.Order_detail;
const orderItem = db.Order_item;
const axios = require("axios");

module.exports = {
  createOrderCart: async (req, res) => {
    try {
      let date = new Date();
      date.setDate(date.getDate());
      let year = date.getFullYear();
      const order = await orderItem.findAll();
      const no_order = `K-OMART-${year}${order.length + 1}`;
      const inv = await orderItem.findAll();
      const {
        quantity,
        total_price,
        courier,
        addressReceiver,
        UserId,
        data4,
        phoneNumUser,
      } = req.body;

      // let tahun = date.getFullYear();
      // const no_invoice = `INV-${tahun}${inv.length + 1}`;

      const result = await orderItem.create({
        no_invoice: no_order,
        quantity,
        total_price,
        courier,
        UserId,
        addressReceiver,
        phoneNumUser,
      });

      data4?.map(async item => {
        await orderDetail.create({
          ProductId: item.Product.id,
          OrderItemNoInvoice: no_order,
        });
      });

      data4?.map(async item => {
        await cart.destroy({
          where: {
            id: item.id,
          },
        });
      });

      return res.status(200).send({
        message: "Order Telah dibuat",
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  findAllOrder: async (req, res) => {
    try {
      const order = await orderItem.findAll({
        where: {
          UserId: req.params.id,
        },
      });
      res.status(200).send(order);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  findIdOrder: async (req, res) => {
    try {
      const order = await orderItem.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(order);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getOrderDetail: async (req, res) => {
    try {
      const { UserId } = req.params;
      const getDetail = await orderItem.findAll({
        where: {
          [Op.and]: {
            UserId: id,
            transaction_status: ["disetujui", "diproses"],
          },
        },
        include: [
          {
            model: Order_detail,
            include: [
              {
                model: Product,
              },
            ],
          },
        ],
      });
      res.status(200).send(getDetail);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  cancelPayment: async (req, res) => {
    try {
      await orderItem.update(
        {
          transaction_status: "batal",
        },
        {
          where: {
            no_invoice: req.params.inv,
          },
        },
      );
      res.status(200).send({
        message: "transaksi dibatalkan",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  paymentMethod: async (req, res) => {
    try {
      let fileUploadReq = req.file;
      await orderItem.update(
        {
          paymentImage: fileUploadReq.filename,
        },
        {
          where: {
            no_invoice: req.params.inv,
          },
        },
      );
      const getOrderItem = await orderItem.findOne({
        where: {
          no_invoice: req.params.inv,
        },
        raw: true,
      });
      res.status(200).send({
        paymentImage: getOrderItem.paymentImage,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
