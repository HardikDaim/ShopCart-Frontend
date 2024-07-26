import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Success = () => {
  return (
    <>
    <Header />
    <div className="bg-green-100 dark:bg-green-800 p-6 md:p-12 min-h-screen flex items-center justify-center">
      <div className="border dark:border-green-600 shadow-lg rounded-2xl p-6 md:p-8 max-w-lg mx-auto bg-white dark:bg-slate-900">
        <div className="text-center mb-6">
          <FaCheckCircle className="text-green-500 dark:text-green-400 text-5xl mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-700 dark:text-green-300">
            Payment Successful!
          </h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
          Thank you for your purchase. Your transaction has been successfully completed.
        </p>
        <div className="text-center">
          <Link
            to="/my-orders"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Success;
