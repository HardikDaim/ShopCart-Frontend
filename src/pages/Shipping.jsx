import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, place_order } from "../store/reducers/orderReducer";
import { toast } from "react-hot-toast";
import LoaderOverlay from "../components/LoaderOverlay";

const Shipping = () => {
  const {
    state: { products = [], price = 0, shipping_fee = 0, items = 0 } = {},
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { loader, errorMessage } = useSelector((state) => state.order);

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
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
      case "address":
      case "city":
      case "state":
      case "country":
        if (!value.trim()) error = "This field is required";
        break;
      case "postalCode":
        if (!/^\d{5,6}$/.test(value)) error = "Invalid postal code";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) error = "Phone number must be 10 digits";
        break;
      case "email":
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
          error = "Invalid email";
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Validate the input and update errors
    const error = validate(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formState).forEach((key) => {
      const error = validate(key, formState[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
    }
  };

  const sellerIds = [...new Set(products.map((p) => p.sellerId))];
  if (sellerIds.length === 0) {
    toast.error("Seller Not Found");
  }

  const placeOrder = () => {
    if (!isSubmitted) {
      toast.error("Fill the Shipping Information");
      return;
    }
    if (sellerIds.length === 0) {
      toast.error("Seller Not Found");
      return;
    } else {
      dispatch(
        place_order({
          price,
          products,
          shipping_fee,
          items,
          shippingInfo: formState,
          customerId: userInfo.id,
          sellerId: sellerIds,
          navigate,
        })
      );
    }
  };

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
  }, []);

  return (
    <>
      {loader && <LoaderOverlay />}
      <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Shipping Information
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8 mb-8">
                {!isSubmitted ? (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label
                          className="text-xs font-semibold mb-2"
                          htmlFor="firstName"
                        >
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formState.firstName}
                          onChange={handleInputChange}
                          className="p-1 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                          required
                        />
                        {errors.firstName && (
                          <span className="text-red-500">
                            {errors.firstName}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="text-xs font-semibold mb-2"
                          htmlFor="lastName"
                        >
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formState.lastName}
                          onChange={handleInputChange}
                          className="p-1 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                          required
                        />
                        {errors.lastName && (
                          <span className="text-red-500">
                            {errors.lastName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="text-xs font-semibold mb-2"
                        htmlFor="address"
                      >
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formState.address}
                        onChange={handleInputChange}
                        className="p-1 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        required
                      />
                      {errors.address && (
                        <span className="text-red-500">{errors.address}</span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label
                          className="text-xs font-semibold mb-2"
                          htmlFor="city"
                        >
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={formState.city}
                          onChange={handleInputChange}
                          className="p-1 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                          required
                        />
                        {errors.city && (
                          <span className="text-red-500">{errors.city}</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="text-xs font-semibold mb-2"
                          htmlFor="state"
                        >
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          value={formState.state}
                          onChange={handleInputChange}
                          className="p-1 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                          required
                        />
                        {errors.state && (
                          <span className="text-red-500">{errors.state}</span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label
                          className="text-xs font-semibold mb-2"
                          htmlFor="postalCode"
                        >
                          Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          value={formState.postalCode}
                          onChange={handleInputChange}
                          className="p-1 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                          required
                        />
                        {errors.postalCode && (
                          <span className="text-red-500">
                            {errors.postalCode}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="text-xs font-semibold mb-2"
                          htmlFor="country"
                        >
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          value={formState.country}
                          onChange={handleInputChange}
                          className="p-1 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                          required
                        />
                        {errors.country && (
                          <span className="text-red-500">{errors.country}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="text-xs font-semibold mb-2"
                        htmlFor="phone"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="p-1 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        required
                      />
                      {errors.phone && (
                        <span className="text-red-500">{errors.phone}</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="text-xs font-semibold mb-2"
                        htmlFor="email"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="p-1 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        required
                      />
                      {errors.email && (
                        <span className="text-red-500">{errors.email}</span>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="py-3 px-6 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-xs font-semibold mb-2">
                        Deliver to: {formState.firstName} {formState.lastName}
                      </h2>
                      <p>
                        <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                          Home
                        </span>
                        {formState.address}, {formState.city}, {formState.state}
                        , {formState.postalCode}, {formState.country}
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
                    <div
                      key={i}
                      className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4"
                    >
                      <div className="flex justify-start items-center mb-4">
                        <h2 className="text-sm md:text-md font-bold">
                          {p.shopName}
                        </h2>
                      </div>
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
                          <div className="flex-1 text-xs">
                            <h3 className="text-xs font-semibold">
                              {pt.productInfo.name}
                            </h3>
                            <span className="text-xs text-zinc-500 mr-2">
                              Brand: {pt.productInfo?.brand}
                            </span>
                            <>
                              <span className="text-zinc-600 mr-2 text-sm dark:text-zinc-400 line-through">
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

                            <div className="flex items-center space-x-2">
                              <span>Quantity: {pt.quantity}</span>
                            </div>
                          </div>
                          <div className="ml-0 sm:ml-4 mt-4 sm:mt-0">
                            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                              {formatPrice(
                                pt.productInfo.price -
                                  Math.floor(
                                    (pt.productInfo.price *
                                      pt.productInfo.discount) /
                                      100
                                  )
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-600">No products in cart.</p>
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/3 lg:h-[275px] xl:h-[260px] bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-xs">
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
                <div className="border-t border-zinc-300 dark:border-zinc-700 my-2"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(price + shipping_fee)}</span>
                </div>
              </div>
              <p className="pt-2 text-xs">
                Note: The prices are inclusive of GST and other taxes.
              </p>
              <button
                className={`w-full mt-6 py-2 text-white rounded font-semibold ${
                  isSubmitted
                    ? "cursor-pointer bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500"
                    : "cursor-not-allowed bg-blue-600 dark:bg-blue-500 hover:bg-blue-700"
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
    </>
  );
};

export default Shipping;
