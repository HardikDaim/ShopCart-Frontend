import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { get_orders } from "../store/reducers/orderReducer";
import LoaderOverlay from "../components/LoaderOverlay";
import toast from "react-hot-toast";
import { messageClear } from "../store/reducers/authReducer";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { loader, userInfo, errorMessage } = useSelector((state) => state.auth);
  const { loader: orderLoader, myOrders, errorMessage: orderError } = useSelector((state) => state.order); 
  
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
        price: order.price,
        items: items,
        orderId: order._id,
      },
    });
  };

  useEffect(() => {
    if(errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if(orderError) {
      toast.error(orderError);
      dispatch(messageClear());
    }
  },[errorMessage, dispatch, orderError])
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200">
      <Header />
      {(loader || orderLoader) && <LoaderOverlay />}
      <main className="container mx-auto p-4">
        <div className="py-2 px-1 md:py-4 md:px-3 rounded-md flex justify-between items-center border dark:border-slate-600 bg-white dark:bg-slate-800">
          <h2 className="text-sm md:text-lg font-semibold text-slate-700 dark:text-slate-300">
            My Orders
          </h2>
          <div className="relative">
            <button
              className="flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md w-32 md:w-48 focus:outline-none focus:ring focus:ring-blue-500"
              onClick={toggleDropdown}
            >
              <span className="text-xs md:text-sm">{selectedOption.label}</span>
              {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {isOpen && (
              <div className="absolute z-10 mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-md">
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="px-4 py-2 cursor-pointer text-xs md:text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {myOrders.length > 0 ? (
          <div className="relative overflow-x-auto mt-4">
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
                {myOrders.map((o, i) => (
                  <tr
                    key={i}
                    className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600"
                  >
                    <td className="p-2 font-medium whitespace-nowrap">
                      #{o._id}
                    </td>
                    <td className="p-2 font-medium whitespace-nowrap">
                      {" "}
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
          <p className="text-slate-700 dark:text-slate-300 mt-4">
            "No Order has been placed yet! Go and place your order to see them
            here"
          </p>
        )}
      </main>
    </div>
  );
};

export default Orders;
