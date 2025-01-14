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
      } bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 flex items-center justify-between`}
    >
      <div className="flex items-center space-x-4">
        <h2 className="text-xs md:text-md font-bold">
          Become a Seller at ShopCart
        </h2>
        <p className="hidden sm:block sm:text-[9px] mt-0">
          Join our platform and reach thousands of customers!
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <a
          href= {process.env.NODE_ENV === 'production' ? 'https://shop-cart-dashboard.vercel.app': 'http://localhost:3001'}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0 bg-white text-xs py-1 px-2 lg:text-[10px] lg:py-1 lg:px-2 rounded-md text-blue-700 font-semibold transition-all duration-300 hover:bg-blue-100"
        >
          Get Started
        </a>
        <button onClick={close} className="text-white hover:text-zinc-200">
          <IoClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default BecomeSeller;
