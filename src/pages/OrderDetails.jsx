import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_order_details,
  messageClear,
} from "../store/reducers/orderReducer";
import LoaderOverlay from "../components/LoaderOverlay";
import { toast } from "react-hot-toast";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loader, errorMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (orderId) {
      dispatch(get_order_details(orderId));
    }
  }, [orderId, dispatch]);

  const formatPrice = (price) => {
    return price
      ? "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 })
      : "N/A";
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, dispatch]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200">
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        {loader ? (
          <LoaderOverlay />
        ) : orderDetails ? (
          <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 px-2 py-4 md:p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">
              Order ID: {orderDetails?._id}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Customer ID:</span>{" "}
                  {orderDetails?.customerId}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Price:</span>{" "}
                  {formatPrice(orderDetails?.price)} (Including Shipping
                  Charges)
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Payment Status:</span>{" "}
                  <span className={`capitalize ${orderDetails?.payment_status === 'paid' ? 'text-green-600 dark:text-green-500': 'text-red-600 dark:text-red-500'}`}>
                  {orderDetails?.payment_status}

                  </span>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Order Status:</span>{" "}
                  <span className={`capitalize ${
                        ["placed", "warehouse"].includes(orderDetails?.delivery_status)
                          ? "text-green-600 dark:text-green-500"
                          : "text-red-600 dark:text-red-500"
                      }`}>

                  {orderDetails?.delivery_status}
                  </span>
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Order Date:</span>{" "}
                  {orderDetails?.date}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Shipping Information:
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Deliver to:</span>{" "}
                  {orderDetails?.shippingInfo?.firstName}{" "}
                  {orderDetails?.shippingInfo?.lastName}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Address:</span>{" "}
                  {orderDetails?.shippingInfo?.address}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">City:</span>{" "}
                  {orderDetails?.shippingInfo?.city}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">State:</span>{" "}
                  {orderDetails?.shippingInfo?.state}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Postal Code:</span>{" "}
                  {orderDetails?.shippingInfo?.postalCode}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Country:</span>{" "}
                  {orderDetails?.shippingInfo?.country}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Phone:</span>{" "}
                  {orderDetails?.shippingInfo?.phone}
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Email:</span>{" "}
                  {orderDetails?.shippingInfo?.email}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Order Products:</h4>
              <ul>
                {orderDetails?.products &&
                  orderDetails?.products.map((product, index) => (
                    <li
                      key={index}
                      className="text-slate-700 dark:text-slate-300 mb-2"
                    >
                      <span className="font-semibold">{product?.name}</span> -{" "}
                      <span className="line-through mr-2">₹{product?.price}</span>
                      <span className="text-blue-700 dark:text-blue-600">
                      {formatPrice(
                        (
                          product?.price -
                          Math.floor(product?.price * product?.discount) / 100
                        )
                      )}{" "}
                      </span>
                      x {product?.quantity}

                      <div className="flex mt-2">
                      <Link to={`/product/details/${product.slug}`}>
                        <img
                          src={product?.images[0]}
                          className="w-24 h-16 object-cover mr-2"
                        />
                        </Link>
                        <div className="flex flex-col">
                          <div>
                            <span>Brand:</span>
                            <span className="ml-2">{product?.brand}</span>
                          </div>
                          <div>
                            <span>Category:</span>
                            <span className="ml-2">{product?.category}</span>
                          </div>
                          <div>
                            <span>Quantity:</span>
                            <span className="ml-2">{product?.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <button
                className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                onClick={() =>
                  navigate(`/payment`, {
                    state: {
                      products: orderDetails.products,
                      customerId: orderDetails.customerId,
                      orderId: orderDetails?._id,
                      price: orderDetails?.price,
                    },
                  })
                }
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <div>No order details available</div>
        )}
      </main>
    </div>
  );
};

export default OrderDetails;
