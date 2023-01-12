const router = require("express").Router();
const { cartController } = require("../controllers");

router.post("/add", cartController.addToCart);
router.delete("/:id", cartController.deleteCart);
router.get("/:id", cartController.getCart);
router.patch("/:id", cartController.updateCart);

module.exports = router;
