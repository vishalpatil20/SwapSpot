// controllers/paymentController.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPaymentIntent = async (req, res) => {
  try {
    const { priceId } = req.body;

    // Create a payment intent with the given price ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceId,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    // Save payment details to the database
    await prisma.payment.create({
      data: {
        userId: req.user.id,  // Assuming you're using an authenticated user
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        status: paymentIntent.status,
      },
    });

    res.status(200).json({ sessionId: paymentIntent.id });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};
