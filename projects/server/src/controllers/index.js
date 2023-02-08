const userControllerLogin = require("./userLogin");
const userController = require("./user");
const adminController = require("./admin");
const productController = require("./product");
const cartController = require("./cart");
const branchController = require("./branch");
const addressController = require("./address");
const transaksiController = require("./transaksi");
const inventoryController = require("./inventory");
const orderController = require("./orderCart");

module.exports = {
  userControllerLogin,
  userController,
  adminController,
  productController,
  addressController,
  cartController,
  branchController,
  transaksiController,
  inventoryController,
  orderController,
};
