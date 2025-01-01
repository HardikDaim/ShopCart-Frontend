import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { get_orders } from "../store/reducers/orderReducer";
import toast from "react-hot-toast";
import { messageClear } from "../store/reducers/authReducer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { loader, userInfo, errorMessage } = useSelector((state) => state.auth);
  const {
    loader: orderLoader,
    myOrders,
    errorMessage: orderError,
  } = useSelector((state) => state.order);

  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: "all", label: "Order Status" },
    { value: "placed", label: "Placed" },
    { value: "pending", label: "Pending" },
    { value: "cancelled", label: "Cancelled" },
    { value: "warehouse", label: "Warehouse" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(
      get_orders({ status: selectedOption.value, customerId: userInfo.id })
    );
  }, [selectedOption]);

  const formatPrice = (price) => {
    return "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  const redirect = (order) => {
    let items = 0;
    for (let i = 0; i < order.products.length; i++) {
      items += order.products[i].quantity;
    }
    navigate("/payment", {
      state: {
        products: order.products,
        customerId: order.customerId,
        price: order.price,
        items: items,
        orderId: order._id,
      },
    });
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (orderError) {
      toast.error(orderError);
      dispatch(messageClear());
    }
  }, [errorMessage, dispatch, orderError]);
  return (
    <>
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200">
        <Header />

        <main className="container mx-auto p-4">
          <div className="py-2 px-1 md:py-4 md:px-3 rounded-md flex justify-between items-center border dark:border-zinc-600 bg-white dark:bg-zinc-800">
            {orderLoader || loader ? (
              <h2 className="text-sm md:text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                <Skeleton width="10%" className="rounded-lg" />
              </h2>
            ) : (
              <h2 className="text-sm md:text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                My Orders
              </h2>
            )}
            <div className="relative">
              <button
                className="flex items-center justify-between px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md w-32 md:w-48 focus:outline-none focus:ring focus:ring-blue-500"
                onClick={toggleDropdown}
              >
                <span className="text-xs md:text-sm">
                  {selectedOption.label}
                </span>
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>
              {isOpen && (
                <div className="absolute z-10 mt-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-md">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className="px-4 py-2 cursor-pointer text-xs md:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {orderLoader || loader ? (
           
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {Array.from({ length: myOrders.length }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md"
                  >
                    <Skeleton height={60} className="mb-4 rounded-lg" />
                  </div>
                ))}
              </div>
          
          ) : myOrders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {myOrders.map((o, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/order/details/${o._id}`)}
                  className="relative cursor-pointer bg-white border dark:border-zinc-700 dark:bg-zinc-800 p-4 rounded-lg shadow-md"
                >
                  {i === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        backgroundColor: [
                          "#1E40AF",
                          "#9333EA",
                          "#EF4444",
                          "#F59E0B",
                          "#10B981",
                          "#1E40AF",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "mirror",
                      }}
                      className="absolute top-0 right-0 text-white px-2 py-1 rounded-tr-lg rounded-bl-lg text-xs font-medium"
                    >
                      Latest
                    </motion.div>
                  )}
                  <h3 className="text-sm md:text-lg font-medium text-zinc-700 dark:text-zinc-300">
                    Order ID: #{o._id}
                  </h3>
                  <p className="text-sm md:text-md font-medium text-zinc-700 dark:text-zinc-300">
                    Price: {formatPrice(o.price)}
                  </p>
                  <p className="text-sm md:text-md font-medium text-zinc-700 dark:text-zinc-300 capitalize">
                    Payment Status:{" "}
                    <span
                      className={`${
                        o.payment_status === "paid"
                          ? "text-green-600 dark:text-green-500"
                          : "text-red-600 dark:text-red-500"
                      }`}
                    >
                      {o.payment_status}
                    </span>
                  </p>
                  <p className="text-sm md:text-md font-medium text-zinc-700 dark:text-zinc-300 capitalize">
                    Order Status:{" "}
                    <span
                      className={`${
                        ["placed", "warehouse"].includes(o.delivery_status)
                          ? "text-green-600 dark:text-green-500"
                          : "text-red-600 dark:text-red-500"
                      }`}
                    >
                      {o.delivery_status}
                    </span>{" "}
                  </p>
                  <div className="absolute bottom-2 right-2 flex flex-col gap-0 items-end ">
                    <p className="text-xs ">You have to Pay:</p>
                    <h1 className="text-xl md:text-3xl font-semibold text-blue-700 dark:text-blue-600">
                      {formatPrice(o.price)}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
                  src="/images/no-orders.webp"
                  alt="No orders"
                  className="w-64 h-64 mb-4"
                />
              </motion.div>
              <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 text-center">
                You haven't placed any orders yet! Start shopping and your
                orders will appear here.
              </p>
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
