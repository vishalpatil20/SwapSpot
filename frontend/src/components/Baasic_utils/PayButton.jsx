import React from 'react';
import axios from 'axios';

const PayButton = ({ amount }) => {
  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/payments/pay', {
        amount: amount * 100, // amount in smallest currency unit (paise)
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
    <button
      onClick={handlePayment}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Pay Now
    </button>
  );
};

export default PayButton;
