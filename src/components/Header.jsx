import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import { IoPerson } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaList,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { SiTheregister } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.home);
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const search = (e) => {
    e.preventDefault();
    navigate(`/products/search?search=${searchValue}&&category=${category}`);
  };

  return (
    <>
      <header className="bg-white  dark:bg-slate-900 text-slate-700 dark:text-slate-200">
        <div className="header-top hidden md:flex flex justify-between items-center p-2 bg-slate-200 dark:bg-slate-800 text-sm px-4">
          <div className="flex items-center justify-start gap-2 text-slate-500 dark:text-slate-400">
            <span>Email: info@company.com</span>
            <span>|</span>
            <span>Phone: +1234567890</span>
          </div>
          <div className="flex items-center justify-start gap-2 text-slate-500 dark:text-slate-400">
            {userInfo && (
              <div className="font-medium">
                Welcome, {userInfo.name}
              </div>
            )}

            <span className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <FaGithub />
            </span>
            <span>|</span>

            <span className="text-blue-700 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <FaLinkedin />
            </span>

            <span>|</span>

            <span className="text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300">
              <FaInstagram />
            </span>
          </div>
        </div>
        <div className="main-header flex justify-between items-center p-4 ">
          <Link to="/" className="logo text-2xl font-bold flex items-center">
            <span className="text-blue-700">
              <SiTheregister />
            </span>
            <span className="ml-1">ShopCart</span>
          </Link>
          <nav className="hidden md:flex space-x-4 text-sm font-medium">
            <Link
              to="/"
              className={`${
                pathname === "/"
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-slate-600 dark:text-slate-400"
              } transition-colors duration-300 hover:text-slate-500 dark:hover:text-slate-300`}
            >
              Home
            </Link>
            <Link
              to="/shops"
              className={`${
                pathname === "/shops"
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-slate-600 dark:text-slate-400"
              } transition-colors duration-300 hover:text-slate-500 dark:hover:text-slate-300`}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className={`${
                pathname === "/about"
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-slate-600 dark:text-slate-400"
              } transition-colors duration-300 hover:text-slate-500 dark:hover:text-slate-300`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${
                pathname === "/contact"
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-slate-600 dark:text-slate-400"
              } transition-colors duration-300 hover:text-slate-500 dark:hover:text-slate-300`}
            >
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex flex items-center space-x-4">
            <button className="hidden md:flex">
              <ThemeToggle />
            </button>
            {userInfo && userInfo ? (
              <>
                {" "}
                <Profile />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  type="button"
                  className="md:flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-full text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600  shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  type="button"
                  className="md:flex  justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-full text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="flex gap-2 md:hidden">
            <button className="flex md:hidden">
              <ThemeToggle />
            </button>
            {userInfo && userInfo ? (
              <Profile />
            ) : (
              <Link
                to="/login"
                type="button"
                className="md:flex  justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-full text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none"
              >
                Login
              </Link>
            )}
            <button
              onClick={toggleSidebar}
              className="md:hidden transition-colors duration-300 hover:text-slate-500"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-white  dark:bg-slate-900 py-4 shadow-md">
          <div className="w-full mx-auto px-4">
            <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center">
              <div
                onClick={() => setShowCategory(!showCategory)}
                className="relative "
              >
                <div className="flex bg-blue-700 rounded-md dark:bg-blue-700 items-center p-4 justify-center gap-2 text-sm font-medium cursor-pointer">
                  <span className="text-slate-100 dark:text-slate-200">
                    <FaList />
                  </span>
                  <span className="text-slate-100 dark:text-slate-200">
                    All Categories
                  </span>
                  <span className="text-slate-100 dark:text-slate-200">
                    {!showCategory ? <FaAngleDown /> : <FaAngleUp />}
                  </span>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    showCategory ? "max-h-96" : "max-h-0 invisible"
                  } overflow-auto absolute z-20 bg-white dark:bg-slate-800 w-full border-2 border-t-0 dark:border-slate-500`}
                >
                  {categories &&
                    categories.map((c, i) => (
                      <ul
                        key={i}
                        className="border-b dark:border-slate-900 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600"
                      >
                        <Link to={`/products?category=${c.name}`}>
                          <li className="flex items-center p-4">
                            <img
                              src={c.image}
                              alt={c.name}
                              className="w-8 h-8 mr-4"
                            />
                            <button className="text-sm text-slate-700 dark:text-slate-200">
                              {c.name}
                            </button>
                          </li>
                        </Link>
                      </ul>
                    ))}
                </div>
              </div>

              <form className="w-full mx-auto" onSubmit={search}>
                <div className="flex">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="hidden lg:flex gap-1 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-slate-500 bg-gray-100 dark:bg-slate-600 border border-slate-300 rounded-s-lg dark:text-slate-300 dark:border-slate-700 hover:bg-gray-200 focus:outline-none"
                    type="button"
                  >
                    {category || "All categories"}
                    <span>
                      <FaAngleDown />
                    </span>
                  </button>
                  <div
                    className={`z-20 transition-all duration-500 ease-in-out ${
                      showDropdown ? "max-h-96" : "hidden"
                    } overflow-auto absolute mt-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700`}
                  >
                    <ul aria-labelledby="dropdown-button" className="text-sm">
                      <li
                        key="all-categories"
                        className="inline-flex border-b dark:border-slate-900 w-full px-4 py-2 text-slate-500 dark:text-slate-300 dark:hover:bg-slate-900 hover:bg-gray-100"
                        onClick={() => {
                          setCategory("");
                          setShowDropdown(false);
                        }}
                      >
                        <button
                          type="button"
                          className="inline-flex w-full px-1 py-2"
                        >
                          All categories
                        </button>
                      </li>
                      {categories.map((cat, index) => (
                        <li
                          key={index}
                          className="inline-flex border-b dark:border-slate-900 w-full px-4 py-2 text-slate-500 dark:text-slate-300 dark:hover:bg-slate-900 hover:bg-gray-100"
                          onClick={() => {
                            setCategory(cat.name);
                            setShowDropdown(false);
                          }}
                        >
                          <button
                            type="button"
                            className="inline-flex w-full px-1 py-2"
                          >
                            {cat.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative w-full">
                    <input
                      onChange={(e) => setSearchValue(e.target.value)}
                      type="search"
                      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 focus:ring-gray-300"
                      placeholder="Search..."
                    />
                    <button
                      type="submit"
                      className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </div>
                </div>
              </form>

              <div className="hidden md:flex flex-col col-span-1 items-center justify-center space-y-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Customer Care Support 24/7:
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  1-800-123-4567
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
