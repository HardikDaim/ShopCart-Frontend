import React from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import PayPalButton from "../components/PayPalButton";

const Payment = () => {
  const {
    state: {
      orderId = "",
      price = 0,
      items,
    } = {},
  } = useLocation();

  const handlePaymentSuccess = (details) => {
    console.log("Payment successful!", details);
    // Handle post-payment actions like updating order status, etc.
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 min-h-screen">
        <h2 className="text-2xl text-center font-semibold mb-6 text-blue-600 dark:text-blue-400">
          Payment Details
        </h2>
        <div className="max-w-lg mx-auto bg-white dark:bg-slate-700 rounded-lg shadow-md p-6">
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <p className="mb-2">
                <span className="font-semibold">Order ID:</span> {orderId}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Price:</span> ₹
                {price.toFixed(2)}{" "} (including shipping charges)
              </p>
           
            </div>
            <PayPalButton
              price={price}
              orderId={orderId}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
