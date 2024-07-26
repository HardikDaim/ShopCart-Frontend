import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import {
  generateQRCode,
  handlePaymentCallback,
  messageClear,
} from "../store/reducers/paymentReducer";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { qrImage, successMessage, errorMessage } = useSelector((state) => state.payment);
  const { userInfo } = useSelector((state) => state.auth);
  const {
    state: { products = [], customerId = "", orderId = "", price = 0, items = 0 } = {},
  } = location;
  const [isUPI, setIsUPI] = useState(true); // Default to UPI payment

  const handlePaymentToggle = () => {
    setIsUPI(!isUPI);
  };

  const handleCardPayment = () => {
    // Implement card payment logic here
    toast.success(`Card payment initiated for Order ID: ${orderId}`);
  };

  useEffect(() => {
    if (orderId && price && userInfo) {
      const obj = {
        orderId,
        amount: price,
        upiId: process.env.UPI_ID,
      };
      dispatch(generateQRCode(obj));
    }
  }, [dispatch, orderId, price, userInfo]);

  const handlePayment = async () => {
    // Mock payment callback, replace with actual payment verification logic
    const paymentStatus = "SUCCESS"; // This should be determined by your payment gateway
    const obj = {
      orderId,
      status: paymentStatus
    }
    await dispatch(handlePaymentCallback(obj));

    if (paymentStatus === "SUCCESS") {
      // Redirect to success page
       navigate("/success");
    } else {
      navigate("/failed");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [dispatch, successMessage, errorMessage]);

  const formatPrice = (price) => {
    return price
      ? "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 })
      : "N/A";
  };

  return (
    <>
      <Header />
      <div className="bg-white dark:bg-slate-900 p-6 md:p-12 min-h-screen">
        <div className="border dark:border-slate-700 shadow-lg rounded-2xl p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
            Payment Page
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
            <div className="bg-gradient-to-r from-blue-800 via-blue-500 to-blue-700 text-white p-4 rounded-xl relative">
              <p className="text-sm md:text-lg">
                Order ID: <span className="font-semibold">{orderId}</span>
              </p>
              <p className="text-sm md:text-lg">
                Customer ID: <span className="font-semibold">{customerId}</span>
              </p>
              <p className="text-sm md:text-lg">Items: {items}</p>
              <p className="text-sm md:text-lg">
                Products:
                <div>
                  {products?.length > 0 ? (
                    products?.map((p, i) => (
                      <div key={i} className="mb-6">
                        <h2 className="text-sm md:text-md font-bold mb-2">
                          {i + 1}. Seller Name: {p.shopName || "N/A"}
                        </h2>
                        {(p.products ? p.products : [p]).map((pt, index) => (
                          <div
                            key={pt.productInfo?.id || pt.id}
                            className="w-full flex flex-col sm:flex-row items-center mb-4"
                          >
                            <img
                              src={pt.productInfo?.images[0] || p.images[0]}
                              alt={pt.productInfo?.name || pt.name || p.name}
                              className="w-30 h-20 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                            />
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold">
                                {pt.productInfo?.name || pt.name || p.name}
                              </h3>
                              <span className="text-sm text-white mr-2">
                                Brand:{" "}
                                {pt.productInfo?.brand || pt.brand || p.brand}
                              </span>
                              {(pt.productInfo?.discount || p.discount) > 0 ? (
                                <>
                                  <span className="text-white mr-2 text-sm dark:text-white line-through">
                                    {formatPrice(
                                      pt.productInfo?.price ||
                                        pt.price ||
                                        p.price
                                    )}
                                  </span>
                                  <span className="text-blue-200 ">
                                    {formatPrice(
                                      (pt.productInfo?.price ||
                                        pt.price ||
                                        p.price) -
                                        Math.floor(
                                          ((pt.productInfo?.price ||
                                            pt.price ||
                                            p.price) *
                                            (pt.productInfo?.discount ||
                                              pt.discount ||
                                              p.discount)) /
                                            100
                                        )
                                    )}
                                  </span>
                                </>
                              ) : (
                                <p className="text-blue-600 dark:text-blue-400">
                                  {formatPrice(
                                    pt.productInfo?.price || pt.price || p.price
                                  )}
                                </p>
                              )}
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-sm">
                                  Quantity: {pt.quantity || p.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p>No products in cart.</p>
                  )}
                </div>
              </p>
              <div className="absolute bottom-4 right-4 text-center">
                <p className="text-xs md:text-base">To be Paid now</p>
                <h1 className="text-xl md:text-4xl lg:text-5xl font-bold">
                  <sup>₹</sup>
                  {price.toLocaleString("en-IN")}
                </h1>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div
                className={`p-4 rounded-xl ${
                  isUPI
                    ? "bg-slate-200 dark:bg-slate-700"
                    : "bg-white dark:bg-slate-600"
                }`}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    checked={isUPI}
                    onChange={handlePaymentToggle}
                    className="mr-2"
                  />
                  <label htmlFor="upi" className="text-lg font-semibold">
                    Scan and Pay using UPI
                  </label>
                </div>
                {isUPI && (
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-center md:justify-start">
                      <img
                        className="w-24"
                        src="/images/upi.png"
                        alt="UPI QR Code"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-start gap-4">
                      {qrImage && (
                        <div className="flex flex-col items-center w-full md:w-auto">
                          <img
                            src={qrImage}
                            alt="UPI QR Code"
                            className="w-full h-72 md:w-40 md:h-40"
                          />
                          <button
                            onClick={handlePayment}
                            className="bg-blue-700 dark:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
                          >
                            I have paid
                          </button>
                        </div>
                      )}
                      <div className="flex flex-col w-full md:w-auto">
                        <p className="text-lg md:text-xl lg:text-2xl font-semibold">
                          Steps:
                        </p>
                        <p className="text-sm md:text-base">
                          1. Open your UPI App
                        </p>
                        <p className="text-sm md:text-base">2. Scan QR Code</p>
                        <p className="text-sm md:text-base">3. Enter Pin and Pay</p>
                        <div className="flex flex-wrap gap-2 md:gap-6 items-center justify-start mt-4">
                          <div className="flex items-center gap-1">
                            <img
                              src="/images/gpay.svg"
                              alt="GPay"
                              className="w-6 h-6"
                            />
                            <p>GPay</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              src="/images/bhim.svg"
                              alt="BHIM"
                              className="w-6 h-6"
                            />
                            <p>BHIM</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              src="/images/phonepe.svg"
                              alt="PhonePe"
                              className="w-6 h-6"
                            />
                            <p>PhonePe</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              src="/images/paytm.svg"
                              alt="Paytm"
                              className="w-6 h-6"
                            />
                            <p>Paytm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`p-4 rounded-xl ${
                  !isUPI
                    ? "bg-slate-200 dark:bg-slate-700"
                    : "bg-white dark:bg-slate-600"
                }`}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    checked={!isUPI}
                    onChange={handlePaymentToggle}
                    className="mr-2"
                  />
                  <label htmlFor="card" className="text-lg font-semibold">
                    Pay using Card
                  </label>
                </div>
                {!isUPI && (
                  <div className="flex flex-col gap-4">
                    <p className="text-lg md:text-xl lg:text-2xl font-semibold">
                      Enter your card details
                    </p>
                    <input
                      type="text"
                      className="py-2 px-4 rounded-md border dark:bg-slate-800 dark:border-slate-600"
                      placeholder="Card Number"
                    />
                    <input
                      type="text"
                      className="py-2 px-4 rounded-md border dark:bg-slate-800 dark:border-slate-600"
                      placeholder="Card Holder Name"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        className="py-2 px-4 rounded-md border dark:bg-slate-800 dark:border-slate-600"
                        placeholder="Expiry Date"
                      />
                      <input
                        type="text"
                        className="py-2 px-4 rounded-md border dark:bg-slate-800 dark:border-slate-600"
                        placeholder="CVV"
                      />
                    </div>
                    <button
                      onClick={handleCardPayment}
                      className="bg-blue-700 dark:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
                    >
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
