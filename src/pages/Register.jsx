import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SiTheregister } from "react-icons/si";
import Header from "../components/Header";
import { customer_register, messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast";
import LoaderOverlay from "../components/LoaderOverlay";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, errorMessage, successMessage, loader } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({ name: "", email: "", password: "" });

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(customer_register(state));
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
                  required
                  className="block transition duration-150 ease-in-out w-full rounded-md border-0 outline-none p-1.5 caret-blue-500 text-gray-900 dark:text-gray-300 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:focus:ring-blue-600  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
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
                  required
                  className="block transition duration-150 ease-in-out w-full rounded-md border-0 outline-none p-1.5 caret-blue-500 text-gray-900 dark:text-gray-300 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:focus:ring-blue-600  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  id="password"
                  onChange={handleInput}
                  value={state.password}
                  required
                  className="block transition duration-150 ease-in-out w-full rounded-md border-0 outline-none p-1.5 caret-blue-500 text-gray-900 dark:text-gray-300 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 dark:focus:ring-blue-600  focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                className="w-4 h-4 mr-2"
              />
              <label
                htmlFor="checkbox"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                I agree to Terms and Privacy Policy
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="transition w-full flex justify-center duration-500 outline-none ease-in-out text-white font-semibold rounded-md leading-6 shadow-sm bg-blue-600 dark:bg-blue-500 hover:bg-red-600 dark:hover:bg-red-500 transform hover:-translate-y-1 hover:scale-110 px-3 py-2 sm:px-4 sm:py-3"
                // disabled={loader}
              >
                Create Now
              </button>
              <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300 py-2">
                Already have an account?
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 dark:text-blue-400 ml-1"
                >
                  Log in now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
