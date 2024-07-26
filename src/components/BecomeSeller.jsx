import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const BecomeSeller = () => {
  const [open, setOpen] = useState(true);

  const close = () => {
    setOpen(false);
  };

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between`}
    >
      <div className="flex items-center space-x-4">
        <h2 className="text-sm md:text-lg lg:text-2xl font-bold">
          Become a Seller at ShopCart
        </h2>
        <p className="hidden sm:block text-xs md:text-sm lg:text-md mt-0">
          Join our platform and reach thousands of customers!
        </p>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <a
          href= {process.env.NODE_ENV === 'production' ? 'https://shop-cart-dashboard.vercel.app': 'http://localhost:3001'}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0 bg-white text-xs md:text-sm py-1 px-2 lg:text-md lg:py-2 lg:px-4 rounded-md text-blue-700 font-semibold transition-all duration-300 hover:bg-blue-100"
        >
          Get Started
        </a>
        <button onClick={close} className="text-white hover:text-gray-200">
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default BecomeSeller;
