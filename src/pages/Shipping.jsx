import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";

const Shipping = () => {
  const {
    state: { products = [], price = 0, shipping_fee = 0, items = 0 } = {},
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loader, errorMessage, userInfo } = useSelector((state) => state.auth);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      address,
      city,
      state,
      postalCode,
      country,
      phone,
      email,
    } = formState;

    if (
      firstName &&
      lastName &&
      address &&
      city &&
      state &&
      postalCode &&
      country &&
      phone &&
      email
    ) {
      setIsSubmitted(true);
    }
  };

  const placeOrder = () => {
    dispatch(
      place_order({
        price,
        products,
        shipping_fee,
        items,
        shippingInfo: formState,
        customerId: userInfo.id,
        navigate,
      })
    );
  };
  
  const formatPrice = (price) => {
    return price
      ? "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 })
      : "N/A";
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Shipping Information</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-8">
              {!isSubmitted ? (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2" htmlFor="firstName">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formState.firstName}
                        onChange={handleInputChange}
                        className="p-3 rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2" htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formState.lastName}
                        onChange={handleInputChange}
                        className="p-3 rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-lg font-semibold mb-2" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formState.address}
                      onChange={handleInputChange}
                      className="p-3 rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2" htmlFor="city">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formState.city}
                        onChange={handleInputChange}
                        className="p-3 rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2" htmlFor="state">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={formState.state}
                        onChange={handleInputChange}
                        className="p-3 rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2" htmlFor="postalCode">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        value={formState.postalCode}
                        onChange={handleInputChange}
                        className="p-3 rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2" htmlFor="country">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        value={formState.country}
                        onChange={handleInputChange}
                        className="p-3 rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-lg font-semibold mb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      className="p-3 rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-lg font-semibold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className="p-3 rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold mb-2">
                      Deliver to: {formState.firstName} {formState.lastName}
                    </h2>
                    <p>
                      <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                        Home
                      </span>
                      {formState.address}, {formState.city}, {formState.state}, {formState.postalCode}, {formState.country}
                      <span
                        className="ml-2 text-blue-600 dark:text-blue-400 cursor-pointer"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Change Address
                      </span>
                    </p>
                    <p>Email to: {formState.email}</p>
                    <p>Call to: {formState.phone}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
              {products.length > 0 ? (
                products.map((p, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
                    <div className="flex justify-start items-center mb-4">
                      <h2 className="text-sm md:text-md font-bold">{p.shopName}</h2>
                    </div>
                    {p.products.map((pt) => (
                      <div key={pt.productInfo.id} className="w-full flex flex-col sm:flex-row items-center mb-4">
                        <img
                          src={pt.productInfo.images[0]}
                          alt={pt.productInfo.name}
                          className="w-30 h-20 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{pt.productInfo.name}</h3>
                          <span className="text-sm text-gray-500 mr-2">Brand: {pt.productInfo?.brand}</span>
                          {pt.productInfo?.discount > 0 ? (
                            <>
                              <span className="text-slate-600 mr-2 text-sm dark:text-slate-400 line-through">
                                {formatPrice(pt.productInfo.price)}
                              </span>
                              <span className="text-blue-600 dark:text-blue-400">
                                
                                {formatPrice(
                                  pt.productInfo.price -
                                  Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)
                                )}
                              </span>
                            </>
                          ) : (
                            <p className="text-blue-600 dark:text-blue-400">{formatPrice(pt.productInfo.price)}</p>
                          )}
                          <div className="flex items-center space-x-2">
                            <span >Quantity: {pt.quantity}</span>
                          </div>
                        </div>
                        <div className="ml-0 sm:ml-4 mt-4 sm:mt-0">
                          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            
                            {formatPrice(
                              pt.productInfo.price -
                              Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No products in cart.</p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{items}</span>
              </div>
              <div className="flex justify-between">
                <span>Discounted Price</span>
                <span>{formatPrice(price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>{formatPrice(shipping_fee)}</span>
              </div>
              <div className="border-t border-slate-300 dark:border-slate-700 my-2"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(price + shipping_fee)}</span>
              </div>
            </div>
            <p className="pt-2">Note: The prices are inclusive of GST and other taxes.</p>
            <button
              disabled={!isSubmitted}
              className={`w-full mt-6 py-2 text-white rounded ${
                isSubmitted ? "cursor-pointer bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500" : "cursor-not-allowed bg-blue-300 dark:bg-blue-400"
              }`}
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shipping;
