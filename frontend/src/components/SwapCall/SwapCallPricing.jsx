import { useState } from 'react';
import axios from 'axios';

export default function SwappCallPricing() {
  const [priceId] = useState(499);  

  const handlePayment = async () => {
    try {
      const response = await axios.post('/pay/checkout-session', { priceId });

      const { sessionId } = response.data;
      window.location.href = `https://checkout.stripe.com/c/${sessionId}`;
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div className="bg-prim-bg py-16 sm:py-32">
      {/* Existing code */}
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div className="rounded-2xl bg-prim py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-black">
              Pay once, own it forever
            </p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                Rs 499
              </span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-white">
                INR
              </span>
            </p>
            <button
              onClick={handlePayment}
              className="mt-10 block w-full rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get access
            </button>
            <p className="mt-6 text-xs leading-5 text-white">
              Invoices and receipts available for easy company reimbursement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
