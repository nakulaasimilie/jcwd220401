const router = require("express").Router();
const { transaksiController } = require("../controllers/index");

router.get("/list", transaksiController.getAll);

module.exports = router;
