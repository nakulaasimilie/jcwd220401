const router = require('express').Router();

const { userController } = require('../controllers');

// const { generateID } = require('../helper/generateID');

router.post('/register', userController.register);
router.get('/verification', userController.verification);
router.put('/password', userController.changePassword);

module.exports = router;
