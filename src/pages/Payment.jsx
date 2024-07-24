import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";

const PaymentPage = () => {
  const location = useLocation();
  const {
    state: {
      products = [],
      customerId = "",
      orderId = "",
      price = 0,
      items = 0,
    } = {},
  } = location;

  const [isUPI, setIsUPI] = useState(true); // Default to UPI payment

  const handlePaymentToggle = () => {
    setIsUPI(!isUPI);
  };

  const handleCardPayment = () => {
    // Implement card payment logic here
    toast.success(`Card payment initiated for Order ID: ${orderId}`);
  };

  
  const formatPrice = (price) => {
    return price
      ? "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 })
      : "N/A";
  };

  return (
    <>
      <Header />
      <div className="bg-white dark:bg-slate-900 p-6 md:p-12">
        <div className="border dark:border-slate-700 shadow-lg rounded-2xl p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
            Payment Page
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
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
        <div className="">
          {products?.length > 0 ? (
            products?.map((p, i) => (
              <div key={i} className="mb-6">
                <h2 className="text-sm md:text-md font-bold mb-2">
                  {i + 1}. Seller Name: {p.shopName}
                </h2>
                {p.products.map((pt) => (
                  <div
                    key={pt.productInfo.id}
                    className="w-full flex flex-col sm:flex-row items-center mb-4"
                  >
                    <img
                      src={pt.productInfo.images[0]}
                      alt={pt.productInfo.name}
                      className="w-30 h-20 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                    />
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
                        </>
                      ) : (
                        <p className="text-blue-600 dark:text-blue-400">
                          {formatPrice(pt.productInfo.price)}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-sm">Quantity: {pt.quantity}</span>
                      </div>
                    </div>
                    <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {formatPrice(
                        pt.productInfo.price -
                          Math.floor(
                            (pt.productInfo.price * pt.productInfo.discount) /
                              100
                          )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="">No products in cart.</p>
          )}
        </div>
      </p>
      <div className="absolute bottom-4 right-4 text-center">
        <p className="text-sm md:text-base">To be Paid now</p>
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
                        className="w-24  "
                        src="/images/upi.png"
                        alt="UPI QR Code"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-start gap-4">
                      <img
                        src="/images/qr.jpeg"
                        className="w-full md:w-32 lg:w-40 rounded-lg"
                        alt="UPI App"
                      />
                      <div className="flex flex-col">
                        <p className="text-lg md:text-xl lg:text-2xl font-semibold">
                          Steps:
                        </p>
                        <p className="text-sm md:text-base">
                          1. Open your UPI App
                        </p>
                        <p className="text-sm md:text-base">2. Scan QR Code</p>
                        <p className="text-sm md:text-base">
                          3. Enter Pin and Pay
                        </p>
                        <div className="flex gap-2 md:gap-6 items-center justify-start mt-4">
                          <div className="flex gap-1">
                            <img src="/images/gpay.svg" />
                            <p>GPay</p>
                          </div>
                          <div className="flex gap-1">
                            <img src="/images/bhim.svg" />
                            <p>BHIM</p>
                          </div>
                          <div className="flex gap-1">
                            <img src="/images/phonepe.svg" />
                            <p>PhonePe</p>
                          </div>
                          <div className="flex gap-1">
                            <img src="/images/paytm.svg" />
                            <p>Paytm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="bg-blue-700 dark:bg-blue-600 text-white py-2 px-4 rounded-md mt-4">
                      Pay with UPI ID
                    </button>
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
                    Pay with Credit and Debit Cards
                  </label>
                </div>
                {!isUPI && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Enter Card Details
                    </h3>
                    <form className="flex flex-col gap-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="px-3 py-2 border dark:border-slate-500 outline-none hover:border-blue-700 dark:hover:border-blue-600 dark:bg-slate-900 rounded-md w-full"
                      />
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="px-3 py-2 border dark:border-slate-500 outline-none hover:border-blue-700 dark:hover:border-blue-600 dark:bg-slate-900 rounded-md w-full"
                      />
                      <input
                        type="text"
                        placeholder="Expiration Date (MM/YY)"
                        className="px-3 py-2 border dark:border-slate-500 outline-none hover:border-blue-700 dark:hover:border-blue-600 dark:bg-slate-900 rounded-md w-full"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-3 py-2 border dark:border-slate-500 outline-none hover:border-blue-700 dark:hover:border-blue-600 dark:bg-slate-900 rounded-md w-full"
                      />
                      <button
                        onClick={handleCardPayment}
                        className="bg-blue-700 dark:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
                      >
                        Pay with Card
                      </button>
                    </form>
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
