import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Shipping = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    email: ""
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
      email
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

  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 49.99,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      price: 19.99,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      price: 29.99,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
  ];

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shipping Information
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 mb-8">
              {!isSubmitted ? (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label
                        className="text-lg font-semibold mb-2"
                        htmlFor="firstName"
                      >
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
                      <label
                        className="text-lg font-semibold mb-2"
                        htmlFor="lastName"
                      >
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
                    <label
                      className="text-lg font-semibold mb-2"
                      htmlFor="address"
                    >
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
                      <label
                        className="text-lg font-semibold mb-2"
                        htmlFor="city"
                      >
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
                      <label
                        className="text-lg font-semibold mb-2"
                        htmlFor="state"
                      >
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
                      <label
                        className="text-lg font-semibold mb-2"
                        htmlFor="postalCode"
                      >
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
                      <label
                        className="text-lg font-semibold mb-2"
                        htmlFor="country"
                      >
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
                  {/* Display Shipping Information */}
                  <div className="flex flex-col gap-1 ">
                    <h2 className="text-lg font-semibold mb-2">
                      Deliver to: {formState.firstName} {formState.lastName}
                    </h2>
                    <p> <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">Home</span>
                      {formState.address}, {formState.city}, {formState.state},{" "}
                      {formState.postalCode}, {formState.country}
                      <span
                        className="ml-2 text-blue-600 cursor-pointer"
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
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white dark:bg-slate-800 rounded-lg shadow-md p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      ₹{item.price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <button className="px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200">
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button className="px-2 py-1 bg-slate-300 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button className="text-red-500 hover:text-red-700 dark:hover:text-red-400 mt-2">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{(totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-300 dark:border-slate-700 my-2"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{(totalAmount + 5 + totalAmount * 0.1).toFixed(2)}</span>
              </div>
            </div>
            <button disabled={isSubmitted ? false : true} className={`w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500  text-white rounded ${isSubmitted ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
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
