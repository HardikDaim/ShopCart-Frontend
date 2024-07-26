import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Failed = () => {
  return (
    <>
    <Header />
    <div className="bg-red-100 dark:bg-red-800 p-6 md:p-12 min-h-screen flex items-center justify-center">
      <div className="border dark:border-red-600 shadow-lg rounded-2xl p-6 md:p-8 max-w-lg mx-auto bg-white dark:bg-slate-900">
        <div className="text-center mb-6">
          <FaTimesCircle className="text-red-500 dark:text-red-400 text-5xl mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-700 dark:text-red-300">
            Payment Failed
          </h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
          Unfortunately, your payment could not be processed. Please try again or contact support if the problem persists.
        </p>
        <div className="text-center">
          <Link
            to="/my-orders"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Retry Payment
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Need help? <Link to="/contact-us" className="text-blue-500 hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Failed;
