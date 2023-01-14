const router = require("express").Router();

const { userController } = require("../controllers");

// const { generateID } = require('../helper/generateID');

router.post("/register", userController.register);
router.post("/resetPassword", userController.resetPassword);
router.post("/verifyResetPassword", userController.sendEmailResetPassword);
router.get("/verification", userController.verification);
router.patch("/changePassword/:id", userController.changePassword);
module.exports = router;
