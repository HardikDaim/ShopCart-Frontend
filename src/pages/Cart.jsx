import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_cart_products,
  delete_cart_product,
  messageClear,
  quantity_inc,
  quantity_dec,
} from "../store/reducers/cartReducer";
import LoaderOverlay from "../components/LoaderOverlay";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-hot-toast";

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
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
      },
    });
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_cart_products(userInfo.id));
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, get_cart_products]);

  const inc = (quantity, stock, cartId) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_inc(cartId));
    } else {
      toast.error(`Only ${quantity} items in Stock`);
    }
  };

  const dec = (quantity, cartId) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_dec(cartId));
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
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
                <div className="flex flex-col items-center justify-center h-[500px]">
                  <FaShoppingCart className="text-4xl text-gray-500 mb-4" />
                  <p className="text-lg text-center text-gray-600">
                    Your cart is empty.
                  </p>
                  <Link
                    type="button"
                    to="/shops"
                    className="bg-blue-600 dark:bg-blue-400 p-2 rounded-lg text-white mt-4"
                  >
                    Shop Now
                  </Link>
                </div>
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
                        <h2 className="text-sm md:text-md font-bold">
                          {p.shopName}
                        </h2>
                      </div>
                      {p.products.map((pt) => (
                        <div
                          key={pt.productInfo.id}
                          className="w-full flex flex-col sm:flex-row items-center mb-4"
                        >
                          <Link to={`/product/details/${pt.productInfo.slug}`}>
                            <img
                              src={pt.productInfo.images[0]}
                              alt={pt.productInfo.name}
                              className="w-30 h-20 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                            />
                          </Link>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">
                              {pt.productInfo.name}
                            </h3>
                            <span className="text-sm text-gray-500 mr-2">
                              Brand: {pt.productInfo?.brand}
                            </span>
                            {pt.productInfo?.discount > 0 ? (
                              <>
                                <span className="text-slate-600 mr-2 text-sm dark:text-slate-400 line-through">
                                  ₹{pt.productInfo.price.toFixed(2)}
                                </span>
                                <span className="text-blue-600 dark:text-blue-400">
                                  ₹
                                  {(
                                    pt.productInfo.price -
                                    Math.floor(
                                      (pt.productInfo.price *
                                        pt.productInfo.discount) /
                                        100
                                    )
                                  ).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <p className="text-blue-600 dark:text-blue-400">
                                ₹{pt.productInfo.price.toFixed(2)}
                              </p>
                            )}
                            <div className="mt-2 flex items-center space-x-2">
                              <button
                                onClick={() => dec(pt.quantity, pt._id)}
                                className="px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200"
                              >
                                -
                              </button>
                              <span>{pt.quantity}</span>
                              <button
                                onClick={() =>
                                  inc(pt.quantity, pt.productInfo.stock, pt._id)
                                }
                                className="px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 ">
                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                              ₹
                              {(
                                pt.productInfo.price -
                                Math.floor(
                                  (pt.productInfo.price *
                                    pt.productInfo.discount) /
                                    100
                                )
                              ).toFixed(2)}
                            </p>
                            <button
                              onClick={() =>
                                dispatch(delete_cart_product(pt._id))
                              }
                              className="text-red-500 text-center hover:text-red-700 dark:hover:text-red-400 mt-2"
                            >
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
                      className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4"
                    >
                      <div className="flex justify-start items-center mb-4">
                        <h2 className="text-md font-bold">
                          {p.products[0].shopName}
                        </h2>
                      </div>
                      <div className="w-full flex flex-col sm:flex-row items-center mb-4">
                        <Link to={`/product/details/${p.products[0].slug}`}>
                          <img
                            src={p.products[0].images[0]}
                            alt={p.name}
                            className="w-30 h-20 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                          />
                        </Link>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">
                            {p.products[0].name}
                          </h3>
                          <span className="text-sm text-gray-500 mr-2">
                            Brand: {p.products[0].brand}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {p.products[0]?.discount > 0 ? (
                              <>
                                <span className="text-slate-600 mr-2 text-sm dark:text-slate-400 line-through">
                                  ₹{p.products[0].price.toFixed(2)}
                                </span>
                                <span className="text-blue-600 dark:text-blue-400">
                                  ₹
                                  {(
                                    p.products[0].price -
                                    Math.floor(
                                      (p.products[0].price *
                                        p.products[0].discount) /
                                        100
                                    )
                                  ).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <p className="text-blue-600 dark:text-blue-400">
                                ₹{p.products[0].price.toFixed(2)}
                              </p>
                            )}
                          </span>
                          <div className="mt-2 flex items-center space-x-2">
                            <button
                              className="px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200"
                              onClick={() => dec(p.quantity, p._id)}
                            >
                              -
                            </button>
                            <span>{p.quantity}</span>
                            <button className="px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200">
                              +
                            </button>
                          </div>
                        </div>
                        <div className="ml-0 sm:ml-4 mt-4 sm:mt-0">
                          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            ₹
                            {(
                              p.products[0].price -
                              Math.floor(
                                (p.products[0].price * p.products[0].discount) /
                                  100
                              )
                            ).toFixed(2)}
                          </p>
                          <button
                            onClick={() => dispatch(delete_cart_product(p._id))}
                            className="text-red-500 text-center hover:text-red-700 dark:hover:text-red-400 mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart_products.length === 0 ? (
              <div className="hidden"></div>
            ) : (
              <div className="w-full lg:w-1/3 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>{buy_product_item}</span>
                  </div>
                  <div className="flex justify-between">
                    <span> Discounted Price</span>
                    <span>₹{price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span>₹{shipping_fee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-300 dark:border-slate-700 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{(price + shipping_fee).toFixed(2)}</span>
                  </div>
                </div>

                <p className="pt-2">
                  Note: The prices are inclusive of GST and other taxes.
                </p>
                <button
                  onClick={redirect}
                  className="w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-500"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
