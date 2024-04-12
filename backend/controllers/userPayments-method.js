const { PrismaClient } = require('@prisma/client');
const axios = require('axios'); // Import axios for making HTTP requests

const prisma = new PrismaClient();
const razorpayApiKey = 'YOUR_RAZORPAY_API_KEY'; // Replace this with your actual Razorpay API key

const createOrder = async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body;

        // Save payment details to the database (optional)
        const payment = await prisma.payment.create({
            data: {
                amount,
                currency,
                receipt,
                status: 'created' // Set initial status
            }
        });

        // Here you should integrate with Razorpay and create an order
        // For this example, let's assume you receive an order ID from Razorpay
        const orderId = 'YOUR_RAZORPAY_ORDER_ID';

        // Make a POST request to Razorpay API to create an order
        const response = await axios.post(
            'https://api.razorpay.com/v1/payment_links',
            {
                amount,
                currency,
                receipt,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${razorpayApiKey}`,
                },
            }
        );

        // Extract the order ID from the response and send it back to the client
        const razorpayOrderId = response.data.id;
        res.json({ id: razorpayOrderId });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

module.exports = {
    createOrder,
};
