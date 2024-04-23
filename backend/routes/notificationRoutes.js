const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const notificationController = require('../controllers/notificationController');

router.get('/user', userController.login, notificationController.getNotifications);

module.exports = router;
