const express = require('express');
const router = express.Router();
const userController = require('../controllers/userPayments-method');

router.post('/pay', userController.createOrder);


module.exports = router;
