import React, { useEffect } from "react";
import Header from "../components/Header";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  get_wishlist_products,
  messageClear,
  remove_wishlist,
} from "../store/reducers/cartReducer";
import toast from "react-hot-toast";
import LoaderOverlay from "../components/LoaderOverlay";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { loader, errorMessage, successMessage, wishlist } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(get_wishlist_products(userInfo.id));
  }, [dispatch, get_wishlist_products]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200">
      <Header />
      {loader && <LoaderOverlay />}
      <main className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">My Wishlist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="relative bg-white dark:bg-slate-700 p-6 rounded-lg shadow transition-all duration-500"
              >
                {item.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {item.discount}% Off
                  </div>
                )}
                <Link to={`/product/details/${item.slug}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg w-full h-40 md:w-full md:h-40 lg:h-60"
                />
                
                </Link>
                ̀<h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  {item.discount > 0 ? (
                    <>
                      <span className="line-through text-slate-500">
                        ₹{item.price}
                      </span>{" "}
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        ₹
                        {(item.price -
                          Math.floor(
                            (item.price * item.discount) / 100
                          )).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-black font-semibold dark:text-slate-300">
                      ₹{item.price}
                    </span>
                  )}
                </p>
                <button onClick={() => dispatch(remove_wishlist(item._id))} className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
                  Remove from Wishlist
                </button>
              </div>
            ))
          ) : (
            <div>
              "No items added to Wishlist, add them to see here!!!"
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
