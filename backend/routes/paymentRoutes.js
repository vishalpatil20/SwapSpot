// routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController'); // Ensure this function is defined

// Example route for creating a payment intent
router.post('/checkout-session', createPaymentIntent);

module.exports = router;
