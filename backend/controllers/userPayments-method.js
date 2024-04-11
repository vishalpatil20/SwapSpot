const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

        res.json({ id: orderId });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

module.exports = {
    createOrder
};
