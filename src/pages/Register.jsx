import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SiTheregister } from "react-icons/si";
import Header from "../components/Header";
import { customer_register, messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast";
import LoaderOverlay from "../components/LoaderOverlay";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, errorMessage, successMessage, loader } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!state.name) errors.name = "Name is required";
    if (!state.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(state.email)) {
      errors.email = "Invalid email address";
    }
    if (state.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!agreedToTerms) errors.terms = "You must agree to the Terms and Privacy Policy";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(customer_register(state));
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      if (errorMessage === "E-Mail Already Exists, Login Now!") {
        navigate("/login");
      }
      dispatch(messageClear());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }

    if (userInfo) {
      navigate("/");
    }
  }, [errorMessage, successMessage, dispatch, navigate]);

  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-gray-900">
        {loader && <LoaderOverlay />}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link
            to="/"
            className="logo text-5xl py-4 font-bold flex items-center justify-center text-slate-700 dark:text-white"
          >
            <span className="text-blue-700">
              <SiTheregister />
            </span>
            <span className="ml-1">ShopCart</span>
          </Link>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-600 dark:text-blue-400 ">
            Please Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  id="name"
                  onChange={handleInput}
                  value={state.name}
                  className="block transition duration-150 ease-in-out w-full rounded-md border-0 outline-none p-1.5 caret-blue-500 text-gray-900 dark:text-gray-300 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:focus:ring-blue-600  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  aria-describedby="name-error"
                />
                {errors.name && <p id="name-error" className="text-red-600 text-sm">{errors.name}</p>}
              </div>
            </div>
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
                  className="block transition duration-150 ease-in-out w-full rounded-md border-0 outline-none p-1.5 caret-blue-500 text-gray-900 dark:text-gray-300 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:focus:ring-blue-600  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  aria-describedby="email-error"
                />
                {errors.email && <p id="email-error" className="text-red-600 text-sm">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
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
                  className="block transition duration-150 ease-in-out w-full rounded-md border-0 outline-none p-1.5 caret-blue-500 text-gray-900 dark:text-gray-300 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:focus:ring-blue-600  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  aria-describedby="password-error"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
                {errors.password && <p id="password-error" className="text-red-600 text-sm">{errors.password}</p>}
            </div>
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                className="w-4 h-4 mr-2"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
              />
              <label
                htmlFor="checkbox"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                I agree to <Link className="text-blue-700 hover:underline cursor-pointer" to="/returns-and-refunds">Terms</Link> and <Link className="text-blue-700 hover:underline cursor-pointer" to="/privacy-policy">Privacy Policy</Link>
              </label>
            </div>
            {errors.terms && <p className="text-red-600 text-sm">{errors.terms}</p>}
            <div>
              <button
                type="submit"
                className="transition w-full flex justify-center duration-500 outline-none ease-in-out text-white font-semibold rounded-md leading-6 shadow-sm bg-blue-600 dark:bg-blue-500 hover:bg-red-600 dark:hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 px-3 py-2 sm:px-4 sm:py-3"
                disabled={loader}
              >
                {loader ? 'Creating...' : 'Create Now'}
              </button>
              <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300 py-2">
                Already have an account?
                <Link to="/login" className="text-blue-600 dark:text-blue-400"> Login Now</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
