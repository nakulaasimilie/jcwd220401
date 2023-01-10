const router = require("express").Router();
const { cartController } = require("../controllers");

router.post("/add", cartController.addToCart);
router.get("/:id", cartController.getCart);

module.exports = router;
