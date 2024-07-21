import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { change_password, messageClear } from "../store/reducers/authReducer";
import LoaderOverlay from '../components/LoaderOverlay';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect } from "react";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { userInfo, loader, successMessage, errorMessage } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [changePassword, setChangePassword] = useState({
    email: userInfo?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePasswordInput = (e) => {
    setChangePassword({ ...changePassword, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      toast.error("New Password and Confirm Password must be the same");
    } else {
      dispatch(change_password(changePassword));
      setChangePassword({
        email: userInfo?.email || "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  useEffect(() => {
    if(successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if(errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  },[dispatch,successMessage, errorMessage])

  return (
    <>
      <Header />
      {loader && <LoaderOverlay />}
      <div className="min-h-screen flex items-start justify-center bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200">
        <main className="container mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Change Password
          </h2>
          <form
            className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md max-w-md mx-auto"
            onSubmit={handlePasswordSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
              >
                E-Mail
              </label>
              <input
                disabled
                type="text"
                id="email"
                name="email"
                onChange={handlePasswordInput}
                value={changePassword.email}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.oldPassword ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  value={changePassword.oldPassword}
                  onChange={handlePasswordInput}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => togglePasswordVisibility("oldPassword")}
                >
                  {showPassword.oldPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  value={changePassword.newPassword}
                  onChange={handlePasswordInput}
                  name="newPassword"
                  id="newPassword"
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={changePassword.confirmPassword}
                  onChange={handlePasswordInput}
                  name="confirmPassword"
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              Change Password
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
