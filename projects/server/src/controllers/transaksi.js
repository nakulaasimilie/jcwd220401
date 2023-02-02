const db = require("../models");

const transaksi = db.Transaction;

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await transaksi.findAll({
        attributes: ["isConfirmed"],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
