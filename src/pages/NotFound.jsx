import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <motion.img
          src='/images/404-error.png'
          alt="Page not found"
          className="w-1/2 md:w-1/3 mb-8"
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-4">Oops! Page not found.</p>
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          Go back to Home
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
