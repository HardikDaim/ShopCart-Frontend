import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaList,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { SiTheregister } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { search_products } from "../store/reducers/searchReducer";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.home);
  const { products, loader } = useSelector((state) => state.search);
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products/search?search=${searchValue}&&category=${category}`);
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim() !== "") {
      dispatch(search_products(value));
    }
  };

  return (
    <>
      <header className="bg-white  dark:bg-slate-900 text-slate-700 dark:text-slate-200">
        <div className="header-top hidden md:flex  justify-between items-center p-2 bg-slate-200 dark:bg-slate-800  text-[8px] lg:text-sm px-4">
          <div className="flex items-center justify-start gap-2 text-slate-500 dark:text-slate-400">
            <span>
              This project is purely made by <strong>Hardik Daim</strong>. You
              can visit to my <strong>GitHub</strong>, <strong>LinkedIn</strong>{" "}
              and <strong>Instagram</strong> profile by clicking here...
            </span>{" "}
            <span
              onClick={() =>
                window.open("https://github.com/HardikDaim", "_blank")
              }
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <FaGithub />
            </span>
            <span>|</span>
            <span
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/hardik-daim-ab0b07251",
                  "_blank"
                )
              }
              className="text-blue-700 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FaLinkedin />
            </span>
            <span>|</span>
            <span
              onClick={() =>
                window.open("https://www.instagram.com/hardikdaim_17", "_blank")
              }
              className="text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
            >
              <FaInstagram />
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 text-slate-500 dark:text-slate-400">
            {userInfo && (
              <div className="font-medium">Welcome, {userInfo.name}</div>
            )}
          </div>
        </div>
        <div className="main-header flex justify-between items-center p-4 ">
          <Link to="/" className="logo text-2xl font-bold flex items-center">
            <motion.span
              className="text-blue-700 dark:text-blue-600"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <SiTheregister />
            </motion.span>
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
        <div className="bg-white  dark:bg-slate-900 pb-2 md:py-4 shadow-md">
          <div className="w-full mx-auto px-4">
            <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center">
              <div
                onClick={() => setShowCategory(!showCategory)}
                className="relative hidden md:block"
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

              {/* search */}
              <div className="w-full mx-auto relative">
                <form className="w-full mx-auto" onSubmit={handleSearchSubmit}>
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
                    <div className="w-full">
                      <input
                        onChange={handleSearchChange}
                        onClick={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                        type="search"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 focus:ring-gray-300"
                        placeholder="Search..."
                        value={searchValue}
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
                      <div
                        className={`absolute z-20 top-full left-0 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg mt-1 transition-all duration-300 ease-in-out ${
                          showSuggestions
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        } overflow-hidden`}
                      >
                        <ul className="divide-y divide-gray-100 dark:divide-slate-600">
                          {searchValue.trim() === "" ? (
                            categories.map((cat, index) => (
                              <li
                                key={index}
                                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                                onClick={() => {
                                  navigate(`/products?category=${cat.name}`);
                                }}
                              >
                                <FaSearch className="mr-2" />
                                <p className="text-sm text-gray-900 dark:text-slate-300">
                                  {cat.name}
                                </p>
                              </li>
                            ))
                          ) : products.length > 0 ? (
                            products.map((suggestion) => {
                              const discountedPrice =
                                suggestion.price -
                                (suggestion.price * suggestion.discount) / 100;
                              return (
                                <li
                                  key={suggestion.id}
                                  className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                                  onClick={() => {
                                    navigate(
                                      `/product/details/${suggestion.slug}`
                                    );
                                  }}
                                >
                                  <img
                                    className="w-10 h-10 rounded-md object-cover"
                                    src={suggestion.images[0]}
                                  />
                                  <div className="ml-3">
                                    <p className="text-sm text-gray-900 dark:text-slate-300">
                                      {suggestion.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-slate-400">
                                      {suggestion?.discount !== 0 ? (
                                        <>
                                          <span className="line-through text-slate-500">
                                            ₹
                                            {suggestion?.price.toLocaleString(
                                              "en-IN"
                                            )}
                                          </span>{" "}
                                          <span className="text-blue-700 dark:text-blue-500">
                                            ₹
                                            {discountedPrice.toLocaleString(
                                              "en-IN"
                                            )}{" "}
                                            (-
                                            {suggestion?.discount}%)
                                          </span>
                                        </>
                                      ) : (
                                        <span className="text-blue-700 dark:text-blue-500">
                                          ₹{suggestion?.price}
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </li>
                              );
                            })
                          ) : (
                            <div className="flex items-center justify-center py-2">
                              <p className="text-sm text-gray-900 dark:text-slate-300">
                                No results found
                              </p>
                            </div>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="hidden md:flex flex-col col-span-1 items-center justify-center space-y-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Made by <b>Hardik Daim</b>
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  E-Mail: hardikdaim@gmail.com
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
