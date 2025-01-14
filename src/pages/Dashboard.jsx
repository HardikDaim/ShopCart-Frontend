import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  get_dashboard_data,
  messageClear,
} from "../store/reducers/dashboardReducer";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    loader,
    errorMessage,
    recentOrders,
    totalOrders,
    pendingOrders,
    cancelledOrders,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(get_dashboard_data(userInfo.id));
  }, [dispatch, userInfo.id]);

  const formatPrice = (price) => {
    return "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear);
    }
  }, [errorMessage, dispatch]);

  return (
    <>
      <Header />
      <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 min-h-screen">
        <main className="container mx-auto p-4">
          {loader ? (
            <h2 className="text-xl font-semibold mb-4">
              <Skeleton width="20%" className="rouneded-lg" />
            </h2>
          ) : (
            <h2 className="text-xl font-semibold mb-4">
              Welcome back, {userInfo.name}!
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 p-6 rounded-lg shadow">
              {loader ? (
                <>
                  <h3 className="text-xs font-bold mb-2">
                    <Skeleton width="20%" className="rounded-lg" />
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    <Skeleton width="40%" className="rounded-lg" />
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-sm font-bold mb-2">Total Orders</h3>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    You have {totalOrders} total orders.
                  </p>
                </>
              )}
            </div>
            <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 p-6 rounded-lg shadow">
              {loader ? (
                <>
                  <h3 className="text-xs font-bold mb-2">
                    <Skeleton width="20%" className="rounded-lg" />
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    <Skeleton width="40%" className="rounded-lg" />
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-sm font-bold mb-2">Pending Orders</h3>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    You have {pendingOrders} pending orders.
                  </p>
                </>
              )}
            </div>
            <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 p-6 rounded-lg shadow">
              {loader ? (
                <>
                  <h3 className="text-sm font-bold mb-2">
                    <Skeleton width="20%" className="rounded-lg" />
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    <Skeleton width="50%" className="rounded-lg" />
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-sm font-bold mb-2">Cancelled Orders</h3>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    You have {cancelledOrders} cancelled orders.
                  </p>
                </>
              )}
            </div>
          </div>
        </main>
        <div className="container mx-auto p-4">
          <div>
            {loader ? (
              <Skeleton width="8%" className="rounded-lg" />
            ) : (
              <div className="flex justify-between">
                <h3 className="text-xs font-bold mb-2">Recent Orders</h3>
                <button
                  onClick={() => navigate(`/my-orders`)}
                  className="text-xs text-blue-700 font-medium dark:text-blue-600 hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>
            )}
            {loader ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md"
                  >
                    <Skeleton height={60} className="mb-4 rounded-lg" />
                  </div>
                ))}
              </div>
            ) : recentOrders.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {recentOrders.map((o, i) => (
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
                      <h3 className="text-xs md:text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Order ID: #{o._id}
                      </h3>
                      <p className="text-xs md:text-md font-medium text-zinc-700 dark:text-zinc-300">
                        Price: {formatPrice(o.price)}
                      </p>
                      <p className="text-xs md:text-md font-medium text-zinc-700 dark:text-zinc-300 capitalize">
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
                      <p className="text-xs md:text-md font-medium text-zinc-700 dark:text-zinc-300 capitalize">
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
              </>
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
                <p className="text-xs md:text-xl text-zinc-700 dark:text-zinc-300 text-center">
                  You haven't placed any orders yet! Start shopping and your
                  orders will appear here.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
