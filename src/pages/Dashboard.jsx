import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_dashboard_data, messageClear } from "../store/reducers/dashboardReducer";
import LoaderOverlay from "../components/LoaderOverlay";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    loader,successMessage, errorMessage,
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

  const redirect = (order) => {
    let items = 0;
    for (let i = 0; i < order.products.length; i++) {
      items += order.products[i].quantity;
    }
    navigate("/payment", {
      state: {
        price: order.price,
        items: items,
        orderId: order._id,
      },
    });
  };
  
  useEffect(() => {
    if(errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear);
    }
  },[errorMessage, dispatch]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200">
      <Header />
      {loader && <LoaderOverlay />}
      <main className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">
          Welcome back, {userInfo.name}!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Total Orders</h3>
            <p className="text-slate-700 dark:text-slate-300">
              You have {totalOrders} total orders.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Pending Orders</h3>
            <p className="text-slate-700 dark:text-slate-300">
              You have {pendingOrders} pending orders.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Cancelled Orders</h3>
            <p className="text-slate-700 dark:text-slate-300">
              You have {cancelledOrders} cancelled orders.
            </p>
          </div>
        </div>
      </main>
      <div className="container mx-auto p-4">
        <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Recent Orders</h3>
          {recentOrders.length > 0 ? (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300">
                  <tr>
                    <th scope="col" className="p-2">
                      Order Id
                    </th>
                    <th scope="col" className="p-2">
                      Price
                    </th>
                    <th scope="col" className="p-2">
                      Payment Status
                    </th>
                    <th scope="col" className="p-2">
                      Order Status
                    </th>
                    <th scope="col" className="p-2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o, i) => (
                    <tr
                      key={i}
                      className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600"
                    >
                      <td className="p-2 font-medium whitespace-nowrap">
                        #{o._id}
                      </td>
                      <td className="p-2 font-medium whitespace-nowrap">
                        {formatPrice(o.price)}
                      </td>
                      <td className="p-2 font-medium whitespace-nowrap capitalize">
                        {o.payment_status}
                      </td>
                      <td className="p-2 font-medium whitespace-nowrap capitalize">
                        {o.delivery_status}
                      </td>
                      <td className="p-2 font-medium whitespace-nowrap capitalize">
                        <Link
                          to={`/order/details/${o._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          View
                        </Link>
                        {o.paymentStatus !== "paid" && (
                          <button
                            onClick={() => redirect(o)}
                            className="text-blue-500 hover:underline ml-2"
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-slate-700 dark:text-slate-300">
              No orders have been purchased yet! Go and purchase now....
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
