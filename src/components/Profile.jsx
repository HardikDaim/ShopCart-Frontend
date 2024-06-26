import React, { useState } from "react";
import {
  IoPerson,
  IoHeart,
  IoCart,
  IoPersonCircle,
  IoLogOut,
  IoClipboard,
  IoChatbubbles,
  IoKey,
} from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from '../api/api';
import { user_reset } from '../store/reducers/authReducer';
import { reset_count } from '../store/reducers/cartReducer';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { cart_product_count, wishlist_count } = useSelector(
    (state) => state.cart
  );
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const redirect_cart_page = () => {
    if (userInfo) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

 const logout = async () => {
  try {
    const { data } = await api.get('/customer/logout');
    localStorage.removeItem("customerToken");
    dispatch(user_reset());
    dispatch(reset_count());
    navigate("/login");
  } catch (error) {
    console.log(error.response?.data);
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
        {(cart_product_count > 0 || wishlist_count > 0) && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart_product_count + wishlist_count}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700 rounded-md shadow-lg outline-none transition duration-300 ease-in-out z-10">
          <div className="py-1">
            <Link
              to="/dashboard"
              type="button"
              className={`flex items-center block px-4 py-2 text-sm w-full text-left ${
                pathname === "/dashboard"
                  ? "bg-slate-100 hover:bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-600"
                  : ""
              } hover:bg-slate-50 dark:hover:bg-slate-700`}
            >
              {" "}
              <IoPersonCircle className="mr-2" /> Dashboard
            </Link>
            <Link
              to="/my-orders"
              type="button"
              className={`flex items-center block px-4 py-2 text-sm w-full text-left ${
                pathname === "/my-orders"
                  ? "bg-slate-100 hover:bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-600"
                  : ""
              } hover:bg-slate-50 dark:hover:bg-slate-700`}
            >
              {" "}
              <IoClipboard className="mr-2" /> My Orders
            </Link>
            <Link
              to="/my-wishlist"
              type="button"
              className={`flex items-center block px-4 py-2 text-sm w-full text-left ${
                pathname === "/my-wishlist"
                  ? "bg-slate-100 hover:bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-600"
                  : ""
              } hover:bg-slate-50 dark:hover:bg-slate-700`}
            >
              {" "}
              <IoHeart className="mr-2" /> Wishlist
              {wishlist_count > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist_count}
                </span>
              )}
            </Link>

            <button
              onClick={redirect_cart_page}
              className="flex items-center block px-4 py-2 text-sm w-full text-left hover:bg-slate-50 dark:hover:bg-slate-700 relative"
            >
              <IoCart className="mr-2" />
              Cart
              {cart_product_count > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart_product_count}
                </span>
              )}
            </button>

            <Link
              to="/chat"
              type="button"
              className={`flex items-center block px-4 py-2 text-sm w-full text-left ${
                pathname === "/chat"
                  ? "bg-slate-100 hover:bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-600"
                  : ""
              } hover:bg-slate-50 dark:hover:bg-slate-700`}
            >
              {" "}
              <IoChatbubbles className="mr-2" /> Chat
              {/* {wishlist_count > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist_count}
                </span>
               )}  */}
            </Link>

          

            
            <Link
              to="/change-password"
              type="button"
              className={`flex items-center block px-4 py-2 text-sm w-full text-left ${
                pathname === "/change-password"
                  ? "bg-slate-100 hover:bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-600"
                  : ""
              } hover:bg-slate-50 dark:hover:bg-slate-700`}
            >
              {" "}
              <IoKey className="mr-2" /> Change Password
            </Link>
            <button onClick={logout} className="flex items-center block px-4 py-2 text-sm w-full text-left hover:bg-slate-50 dark:hover:bg-slate-700">
              <IoLogOut className="mr-2" /> Logout
            </button>
         
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
