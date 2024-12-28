const express = require('express');
const { registerForm } = require('../controllers/formController');

const router = express.Router();

router.post('/register', registerForm);

module.exports = router;
