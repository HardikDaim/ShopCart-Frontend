import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoaderOverlay from "../components/LoaderOverlay";
import toast from "react-hot-toast";
import Header from "../components/Header";
import { SiTheregister } from "react-icons/si";
import { customer_login, messageClear } from "../store/reducers/authReducer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

    // Clear error message on input change
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!state.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(state.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!state.password) {
      errors.password = "Password is required";
    } else if (state.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(customer_login(state));
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [errorMessage, successMessage, dispatch, navigate, userInfo]);

  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-gray-900">
        {loader && <LoaderOverlay />}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link
            to="/"
            className="logo text-5xl py-4 font-bold flex items-center justify-center text-slate-700 dark:text-slate-100 "
          >
            <span className="text-blue-700">
              <SiTheregister />
            </span>
            <span className="ml-1">ShopCart</span>
          </Link>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-600 dark:text-blue-400">
            Please Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300"
              >
                E-Mail
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleInput}
                  value={state.email}
                  className="block transition duration-150 ease-in-out w-full rounded-md border-0 outline-none p-1.5 caret-blue-500 text-gray-900 dark:text-gray-300 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:focus:ring-blue-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={handleInput}
                  value={state.password}
                  className="block transition duration-150 ease-in-out w-full rounded-md border-0 outline-none p-1.5 caret-blue-500 text-gray-900 dark:text-gray-300 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:focus:ring-blue-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
                  {formErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                  )}
            </div>
            <div>
              <button
                type="submit"
                className="transition w-full flex justify-center duration-500 outline-none ease-in-out text-white font-semibold rounded-md leading-6 shadow-sm bg-blue-600 dark:bg-blue-500 hover:bg-red-600 dark:hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 px-3 py-1.5 sm:px-4 sm:py-3"
              >
                Login Now
              </button>
              <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300 py-2">
                Don't have an account?
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 dark:text-blue-400 ml-1"
                >
                  Register now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
