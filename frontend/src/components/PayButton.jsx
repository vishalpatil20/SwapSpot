import React from 'react';
import axios from 'axios';

const PayButton = () => {
    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:3000/payments/pay', {
                amount: 1000, // amount in smallest currency unit(paise)
                currency: 'INR',
                receipt: 'order_rcptid_11',
            });

            const data = response.data;

            if (data.id) {
                // Redirect to Razorpay checkout page
                window.location.href = `https://api.razorpay.com/v1/payment_links/${data.id}`;
            } else {
                console.error('Failed to create order');
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default PayButton;
