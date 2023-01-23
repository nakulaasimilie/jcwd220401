const router = require("express").Router();

const { adminController } = require("../controllers");

router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.get("/keepLogin", adminController.keepLogin);
router.get("/findAll", adminController.findAll);

module.exports = router;
