const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/pay', userController.signUp);


module.exports = router;
