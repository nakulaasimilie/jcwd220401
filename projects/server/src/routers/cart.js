const router = require("express").Router();
const { cartController } = require("../controllers");

router.post("/add", cartController.addToCart);
router.delete("/:id", cartController.deleteCart);
router.get("/:id", cartController.getCart);
router.patch("/:id", cartController.updateCart);

router.post("/createCost", cartController.createCost);
router.patch("/update/:id", cartController.updateQty);
router.patch("/cartUpdate/:id", cartController.cartStatus);
router.patch("/cost", cartController.createCost);
router.get("/findBy/:id", cartController.findCartBy);
router.get("/findCheckout/:id", cartController.findCheckout);
router.get("/findTotal/:id", cartController.findTotal);
router.get("/findData/:id", cartController.findData);
router.delete("/remove/:id", cartController.deleteCart);

module.exports = router;
