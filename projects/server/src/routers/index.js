const userRoutesLogin = require("./userLogin");
const userRoutes = require("./user");
const userRoutesAdmin = require("./admin");
const productRoutes = require("./product");
const cartRoutes = require("./cart");
const userRoutesBranch = require("./branch");
const addressRoutes = require("./address");
const transaksiRoutes = require("./transaksi");
const inventoryRoutes = require("./inventory");
const orderCartRoutes = require("./orderCart");

module.exports = {
  userRoutesLogin,
  userRoutes,
  userRoutesAdmin,
  productRoutes,
  cartRoutes,
  userRoutesBranch,
  addressRoutes,
  transaksiRoutes,
  inventoryRoutes,
  orderCartRoutes,
};
