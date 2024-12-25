const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: `Welcome user with ID ${req.userId}` });
});

module.exports = router;
