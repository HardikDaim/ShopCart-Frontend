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
import { motion } from "framer-motion";

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

  const formatPrice = (price) => {
    return price
      ? "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 })
      : "N/A";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h2>
          {cart_products.length === 0 && (
            <>
              <motion.div
                animate={{ opacity: 1, y: [0, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="flex flex-col items-center mt-10"
              >
                <img
                  src="/images/empty-cart.png"
                  alt="No orders"
                  className="w-48 h-48 mb-4"
                />
              </motion.div>
              <p className="text-xs md:text-xs text-zinc-700 dark:text-zinc-300 text-center">
                Your cart is empty! Add Products to Cart to see them here.
              </p>
            </>
          )}
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
                <></>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xs font-semibold mb-4 text-green-600">
                    In Stock Products: {cart_product_count}
                  </h2>
                  {cart_products.map((p, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4"
                    >
                      <div className="flex justify-start items-center mb-4">
                        <h2 className="text-xs md:text-md font-bold">
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
                              className="w-30 h-20 object-contain rounded-lg mb-4 sm:mb-0 sm:mr-4"
                            />
                          </Link>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold">
                              {pt.productInfo.name}
                            </h3>
                            <span className="text-xs text-gray-500 mr-2">
                              Brand: {pt.productInfo?.brand}
                            </span>

                            <span className="text-zinc-600 mr-2 text-xs dark:text-zinc-400 line-through">
                              {formatPrice(pt.productInfo.price)}
                            </span>
                            <span className="text-blue-600 dark:text-blue-400">
                              {formatPrice(
                                pt.productInfo.price -
                                  Math.floor(
                                    (pt.productInfo.price *
                                      pt.productInfo.discount) /
                                      100
                                  )
                              )}
                            </span>

                            <div className="mt-2 flex items-center space-x-2">
                              <button
                                onClick={() => dec(pt.quantity, pt._id)}
                                className="px-2 py-1 bg-zinc-300 dark:bg-zinc-700 rounded text-zinc-800 dark:text-zinc-200"
                              >
                                -
                              </button>
                              <span>{pt.quantity}</span>
                              <button
                                onClick={() =>
                                  inc(pt.quantity, pt.productInfo.stock, pt._id)
                                }
                                className="px-2 py-1 bg-zinc-300 dark:bg-zinc-700 rounded text-zinc-800 dark:text-zinc-200"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 text-xs">
                            <p className="font-semibold text-blue-600 dark:text-blue-400">
                              {formatPrice(
                                pt.productInfo.price -
                                  Math.floor(
                                    (pt.productInfo.price *
                                      pt.productInfo.discount) /
                                      100
                                  )
                              )}
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
                  <h2 className="text-sm font-semibold mb-4 text-red-600">
                    Out of Stock Products: {outofstock_products.length}
                  </h2>
                  {outofstock_products.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 mb-4"
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
                          <h3 className="text-sm font-semibold">
                            {p.products[0].name}
                          </h3>
                          <span className="text-xs text-gray-500 mr-2">
                            Brand: {p.products[0].brand}
                          </span>
                          <span className="text-zinc-600 dark:text-zinc-400">
                            <span className="text-zinc-600 mr-2 text-xs dark:text-zinc-400 line-through">
                              {formatPrice(p.products[0].price)}
                            </span>
                            <span className="text-blue-600 dark:text-blue-400">
                              
                              {formatPrice(
                                p.products[0].price -
                                Math.floor(
                                  (p.products[0].price *
                                    p.products[0].discount) /
                                    100
                                )
                              )}
                            </span>
                          </span>
                          <div className="mt-2 flex items-center space-x-2">
                            <button
                              className="px-2 py-1 bg-zinc-300 dark:bg-zinc-700 rounded text-zinc-800 dark:text-zinc-200"
                              onClick={() => dec(p.quantity, p._id)}
                            >
                              -
                            </button>
                            <span>{p.quantity}</span>
                            <button className="px-2 py-1 bg-zinc-300 dark:bg-zinc-700 rounded text-zinc-800 dark:text-zinc-200">
                              +
                            </button>
                          </div>
                        </div>
                        <div className="ml-0 sm:ml-4 mt-4 sm:mt-0">
                          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            
                            {formatPrice(
                              p.products[0].price -
                              Math.floor(
                                (p.products[0].price * p.products[0].discount) /
                                  100
                              )
                            )}
                          </p>
                          <button
                            onClick={() => dispatch(delete_cart_product(p._id))}
                            className="text-xs text-red-500 text-center hover:text-red-700 dark:hover:text-red-400 mt-2"
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
              <div className="w-full lg:w-1/3 bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>{buy_product_item}</span>
                  </div>
                  <div className="flex justify-between">
                    <span> Discounted Price</span>
                    <span>{formatPrice(price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span>{formatPrice(shipping_fee)}</span>
                  </div>
                  <div className="border-t border-zinc-300 dark:border-zinc-700 my-2"></div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice((price + shipping_fee))}</span>
                  </div>
                </div>

                <p className="pt-2 text-xs">
                  Note: The prices are inclusive of GST and other taxes.
                </p>
                <button
                  onClick={redirect}
                  className="w-full mt-6 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-500"
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
