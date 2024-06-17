import React, { useState } from "react";
import {
  IoPerson,
  IoHeart,
  IoCart,
  IoSettings,
  IoPersonCircle,
  IoNotifications,
  IoHelpCircle,
  IoLogOut,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { cart_product_count } = useSelector((state) => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const redirect_cart_page = () => {
    if(userInfo) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  }
  
  return (
    <div className="relative block text-left">
      <button
        type="button"
        className="relative flex items-center justify-center w-full px-4 py-2 text-xl font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <IoPerson className="mr-2" />
        {cart_product_count > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart_product_count}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 divide-y divide-gray-100 dark:divide-slate-700 rounded-md shadow-lg outline-none transition duration-300 ease-in-out z-10">
          <div className="py-1">
            <button className="flex items-center block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-slate-700">
              <IoHeart className="mr-2" /> Wishlist
            </button>
            <button onClick={redirect_cart_page} className="flex items-center block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-slate-700 relative">
              <IoCart className="mr-2" />
              Cart
              {cart_product_count > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart_product_count}
                </span>
              )}
            </button>
            <button className="flex items-center block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-slate-700">
              <IoSettings className="mr-2" /> Profile Settings
            </button>
            <button className="flex items-center block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-slate-700">
              <IoPersonCircle className="mr-2" /> Account
            </button>
            <button className="flex items-center block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-slate-700">
              <IoNotifications className="mr-2" /> Notifications
            </button>
            <button className="flex items-center block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-slate-700">
              <IoHelpCircle className="mr-2" /> Help
            </button>
            <button className="flex items-center block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-slate-700">
              <IoLogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
