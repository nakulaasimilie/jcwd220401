const { Sequelize } = require("sequelize");
const db = require("../models");
const user = db.User;
const cart = db.Cart;
const product = db.Product;
const branch = db.Branch;
const address = db.Address;

var request = require("request");
const rajaOngkirKey = process.env.RAJA_KEY;
const rajaOngkirURL = process.env.BASE_URL_RAJAONGKIR_COST;

module.exports = {
  addToCart: async (req, res) => {
    try {
      const { ProductId, UserId } = req.body;
      console.log(req.body);
      if (!UserId) throw "Please Login First";

      const data = await cart.create({
        ProductId,
        UserId,
      });
      res.status(200).send({
        massage: "Add To Cart Success",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await cart.destroy({
        where: {
          id,
        },
      });
      res.status(200).send({
        msg: "Cart Deleted!",
        result,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getCart: async (req, res) => {
    try {
      const { id } = req.params;
      const getcart = await cart.findAll({
        attributes: ["id", "quantity"],
        where: {
          UserId: id,
        },
        include: [{ model: user, attributes: ["name"] }, { model: product }],
      });
      res.status(200).send(getcart);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  updateCart: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      console.log(id, quantity);

      const editQty = await cart.update(
        {
          quantity,
        },
        {
          where: {
            id,
          },
        },
      );
      res.status(200).send(editQty);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  updateQty: async (req, res) => {
    try {
      const { id, qty } = req.body;
      const response = await cart.findOne({
        where: [
          {
            UserId: req.params.id,
          },
          {
            id,
          },
        ],

        include: [
          {
            model: product,
          },
        ],
        raw: true,
      });
      const data = await cart.update(
        {
          qty,
          totalCheckout: qty * response["Product.price"],
          totalWeight: qty * response["Product.weight"],
        },
        {
          where: { id },
        },
      );

      res.status(200).send({
        message: "Update success",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findCartBy: async (req, res) => {
    try {
      const carts = await cart.findAll({
        where: { UserId: req.params.id },
        include: [
          {
            model: product,
          },
        ],
      });
      res.status(200).send(carts);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  cartStatus: async (req, res) => {
    try {
      const user = await cart.findOne({
        where: {
          UserId: req.params,
        },
      });

      const { status, id } = req.body;

      const data = await cart.update(
        {
          status,
        },
        {
          where: { id },
        },
      );
      res.status(200).send({
        message: "Update success",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findTotal: async (req, res) => {
    try {
      const carts = await cart.findAll({
        where: [
          { UserId: req.params.id },
          {
            status: 1,
          },
        ],
        attributes: [
          "qty",
          "id",
          [Sequelize.literal(`(qty*Product.price)`), "Total"],
        ],
        include: [
          {
            model: product,
            required: true,
            attributes: ["price"],
            attributes: [],
          },
        ],
        group: "id",
        raw: true,
        subQuery: false,
      });
      res.status(200).send(carts);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findCheckout: async (req, res) => {
    try {
      const carts = await cart.findAll({
        where: [
          { UserId: req.params.id },
          {
            status: 1,
          },
        ],
        include: [
          {
            model: product,
          },
        ],
      });
      res.status(200).send(carts);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalCheckout: async (req, res) => {
    try {
      const response = await cart.findOne({
        where: {
          UserId: req.params.id,
        },
      });
      const { qty, price, id } = req.body;
      const data = await productCart.update(
        {
          qty,
          price,
        },
        {
          where: { id },
        },
      );
      res.send(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findData: async (req, res) => {
    try {
      const response = await address.findOne({
        where: {
          UserId: req.params.id,
          defaultAddress: 1,
        },
        attributes: ["cityId", "city"],
        include: [
          {
            model: branch,
          },
        ],
      });
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createCost: async (req, res) => {
    try {
      const { origin, weight, courier, destination } = req.body;
      var options = {
        method: "POST",
        url: rajaOngkirURL,
        headers: {
          key: rajaOngkirKey,
          "content-type": "application/x-www-form-urlencoded",
        },
        form: {
          origin: origin,
          destination: destination,
          weight: weight,
          courier: courier,
        },
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.status(200).send(JSON.parse(body));
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
