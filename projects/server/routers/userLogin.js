const router = require("express").Router();

const { userControllerLogin } = require("../controllers");

router.post("/login", userControllerLogin.login);
router.get("/keepLogin", userControllerLogin.keepLogin);

module.exports = router;
