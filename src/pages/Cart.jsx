import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_cart_products } from "../store/reducers/cartReducer";
import LoaderOverlay from "../components/LoaderOverlay";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    cart_products,
    loader,
    successMessage,
    errorMessage,
    cart_product_count,
    price,
    shipping_fee,
    buy_product_item,
    outofstock_products,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(get_cart_products(userInfo.id));
    }
  }, [dispatch, userInfo?.id]);

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: cart_products,
        price,
        shipping_fee,
        tax: price * 0.1,
        ps: buy_product_item,
      },
    });
  };

  const totalAmount = cart_products.reduce(
    (acc, p) =>
      acc +
      p.products.reduce(
        (sum, pt) => sum + pt.productInfo.price * pt.quantity,
        0
      ),
    0
  );
  const tax = totalAmount * 0.1;
  const finalTotal = totalAmount + shipping_fee + tax;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      {loader && <LoaderOverlay />}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Shopping Cart</h2>
        {successMessage && (
          <div className="text-green-500 text-center mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            {cart_products.length === 0 ? (
              <p className="text-lg">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4 text-green-600">
                  In Stock Products: {cart_product_count}
                </h2>
                {cart_products.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4"
                  >
                    <div className="flex justify-start items-center mb-4">
                      <h2 className="text-md font-bold">{p.shopName}</h2>
                    </div>
                    {p.products.map((pt) => (
                      <div
                        key={pt.productInfo.id}
                        className="w-full flex items-center mb-4"
                      >
                        <img
                          src={pt.productInfo.images[0]}
                          alt={pt.productInfo.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-semibold">
                            {pt.productInfo.name}
                          </h3>
                          {pt.productInfo?.discount > 0 ? (
                            <>
                            <span className="text-slate-600 mr-2  text-sm dark:text-slate-400 line-through">
                              ₹{pt.productInfo.price.toFixed(2)}
                            </span>
                            <span className="text-blue-600 dark:text-blue-400">₹{p.price.toFixed(2)}</span>
                            </>
                          ) : (
                            <p className="text-slate-600 dark:text-slate-400">
                              ₹{pt.productInfo.price.toFixed(2)}
                            </p>
                          )}
                          
                          <div className="mt-2 flex items-center space-x-2">
                            <button className="px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200">
                              -
                            </button>
                            <span>{pt.quantity}</span>
                            <button className="px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200">
                              +
                            </button>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          ₹{p.price.toFixed(2)}
                          </p>
                          <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 mt-2">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {outofstock_products.length > 0 && (
              <div className="space-y-4 mt-4">
                <h2 className="text-lg font-semibold mb-4 text-red-600">
                  Out of Stock Products: {outofstock_products.length}
                </h2>
                {outofstock_products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        ₹{p.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          className="px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200"
                          disabled
                        >
                          -
                        </button>
                        <span>{p.quantity}</span>
                        <button
                          className="px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200"
                          disabled
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-semibold">
                        ₹{(p.price * p.quantity).toFixed(2)}
                      </p>
                      <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 mt-2">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/3 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping_fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-300 dark:border-slate-700 my-2"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={redirect}
              className="w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-500"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
