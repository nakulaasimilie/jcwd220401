const db = require("../models");
const product = db.Product;
const branch = db.Branch;
const inventory = db.Inventory;
const { Op } = require("sequelize");

module.exports = {
  create: async (req, res) => {
    try {
      const { Stock, AdminId, ProductId, BranchId } = req.body;
      const data = await inventory.create({
        Stock,
        AdminId,
        ProductId,
        BranchId,
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findByBranch: async (req, res) => {
    try {
      const result = await inventory.findAll({
        include: [
          {
            model: product,
          },
          {
            model: branch,
            where: {
              longitude: { [Op.between]: [req.params.from, req.params.to] },
            },
          },
        ],
      });
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  searchBy: async (req, res) => {
    try {
      const { name } = req.query;
      const products = await inventory.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
        },
        raw: true,
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  sortBy: async (req, res) => {
    try {
      const { data, order } = req.query;
      const products = await inventory.findAll({
        order: [[data, order]],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalProduct: async (req, res) => {
    try {
      const products = await inventory.findAll({
        attributes: [[sequelize.fn("count", sequelize.col(`id`)), "total"]],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAllByBranch: async (req, res) => {
    try {
      const inventories = await inventory.findAll({
        where: {
          BranchId: req.params.BranchId,
        },
        include: [
          {
            model: product,
          },
          // {
          //   model: branch,
          //   where: {
          //     longitude: { [Op.between]: [req.params.from, req.params.to] },
          //   },
          // },
        ],
      });
      res.status(200).send(inventories);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
