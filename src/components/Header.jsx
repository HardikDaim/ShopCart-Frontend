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

  const formatPrice = (price) => {
    return price
      ? "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 })
      : "N/A";
  };

  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-white   dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200">
        {userInfo && (
          <div className="header-top hidden md:flex  justify-between items-center p-2 bg-zinc-200 dark:bg-zinc-800 text-[9px] px-4">
            <div className="flex items-center justify-start gap-2 text-zinc-500 dark:text-zinc-400">
              <span>
                This project is purely made by <strong>Hardik Daim</strong>. You
                can visit to my <strong>GitHub</strong>,{" "}
                <strong>LinkedIn</strong> and <strong>Instagram</strong> profile
                by clicking here...
              </span>{" "}
              <span
                onClick={() =>
                  window.open("https://github.com/HardikDaim", "_blank")
                }
                className="text-zinc-500 cursor-pointer hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
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
                className="text-blue-700 cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <FaLinkedin />
              </span>
              <span>|</span>
              <span
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/hardikdaim_17",
                    "_blank"
                  )
                }
                className="text-pink-500 cursor-pointer hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
              >
                <FaInstagram />
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 text-zinc-500 dark:text-zinc-400">
              {userInfo && (
                <div className="font-medium"> Welcome, {userInfo.name}</div>
              )}
            </div>
          </div>
        )}
        <div className="main-header flex justify-between items-center px-4 pt-2 pb-2 sm:pb-2">
          <Link to="/" className="logo text-xl font-bold flex items-center">
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
            <h1 className=" hidden">ShopCart - An E-commerce Platform</h1>
          </Link>
          <nav className="hidden xl:flex space-x-4 text-[10px] font-medium">
            <Link
              to="/"
              className={`${
                pathname === "/"
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-zinc-600 dark:text-zinc-400"
              } transition-colors duration-300 hover:text-zinc-500 dark:hover:text-zinc-300`}
            >
              Home
            </Link>
            <Link
              to="/shops"
              className={`${
                pathname === "/shops"
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-zinc-600 dark:text-zinc-400"
              } transition-colors duration-300 hover:text-zinc-500 dark:hover:text-zinc-300`}
            >
              Shop
            </Link>
            <Link
              to="/about-us"
              className={`${
                pathname === "/about-us"
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-zinc-600 dark:text-zinc-400"
              } transition-colors duration-300 hover:text-zinc-500 dark:hover:text-zinc-300`}
            >
              About
            </Link>
            <Link
              to="/contact-us"
              className={`${
                pathname === "/contact-us"
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-zinc-600 dark:text-zinc-400"
              } transition-colors duration-300 hover:text-zinc-500 dark:hover:text-zinc-300`}
            >
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-3">
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
                  className="md:flex justify-center items-center px-4 py-2 text-[10px] font-medium rounded-full text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600  shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  type="button"
                  className="md:flex justify-center items-center px-4 py-2 text-[10px] font-medium rounded-full text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600  shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="flex gap-3 md:hidden">
            <button className="flex md:hidden">
              <ThemeToggle />
            </button>
            {userInfo && userInfo ? (
              <Profile />
            ) : (
              <Link
                to="/login"
                type="button"
                className="md:flex  justify-center items-center gap-2 px-4 py-2 text-[10px] font-medium rounded-full text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none"
              >
                Login
              </Link>
            )}
            <button
              onClick={toggleSidebar}
              className="md:hidden transition-colors duration-300 hover:text-zinc-500"
            >
              <svg
                className="w-7 h-7"
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
        <div className="bg-white dark:bg-zinc-900 pb-2 shadow-md">
          <div className="w-full mx-auto px-4">
            <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center">
              <div
                onClick={() => setShowCategory(!showCategory)}
                className="relative hidden md:block"
              >
                <div className="flex bg-gradient-to-r from-blue-600 to-blue-700 rounded-full items-center px-4 py-2 justify-center gap-2 text-[10px] font-medium cursor-pointer">
                  <span className="text-zinc-100 dark:text-zinc-200">
                    <FaList />
                  </span>
                  <span className="text-zinc-100 dark:text-zinc-200">
                    All Categories
                  </span>
                  <span className="text-zinc-100 dark:text-zinc-200">
                    {!showCategory ? <FaAngleDown /> : <FaAngleUp />}
                  </span>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    showCategory ? "max-h-96 mt-1" : "max-h-0 invisible"
                  } overflow-auto absolute z-20 bg-white dark:bg-zinc-800 w-full rounded-lg border-2 dark:border-zinc-600`}
                >
                  {categories &&
                    categories.map((c, i) => (
                      <ul
                        key={i}
                        className="border-b dark:border-zinc-900 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-600"
                      >
                        <Link to={`/products?category=${c.name}`}>
                          <li className="flex items-center p-4">
                            <img
                              src={c.image}
                              alt={c.name}
                              className="w-8 h-8 mr-4"
                            />
                            <button className="text-[10px] text-zinc-700 dark:text-zinc-200">
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
                      className="hidden lg:inline-flex gap-1 flex-shrink-0 z-10 items-center px-2 text-[9px] font-medium text-center text-zinc-500 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 rounded-s-lg dark:text-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 focus:outline-none"
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
                      } overflow-auto absolute mt-12 bg-white divide-y border divide-zinc-100 rounded-lg shadow w-44 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700`}
                    >
                      <ul
                        aria-labelledby="dropdown-button"
                        className="text-[10px]"
                      >
                        <li
                          key="all-categories"
                          className="inline-flex border-b dark:border-zinc-900 w-full px-4 py-2 text-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-900 hover:bg-zinc-100"
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
                            className="inline-flex border-b dark:border-zinc-900 w-full px-4 py-2 text-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-900 hover:bg-zinc-100"
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
                        className="block p-2 w-full z-20 text-[8px] text-zinc-900 bg-zinc-50 rounded-e-lg border-s-zinc-50 border-s-2 border border-zinc-300 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 focus:ring-zinc-300"
                        placeholder="Search..."
                        value={searchValue}
                      />
                      <button
                        type="submit"
                        className="absolute top-0 end-0 p-2 text-[8px] font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        <svg
                          className="w-3 h-3"
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
                        className={`absolute z-20 top-full left-0 w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-lg mt-1 transition-all duration-300 ease-in-out ${
                          showSuggestions
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        } overflow-y-scroll`}
                      >
                        <ul className="divide-y divide-zinc-100 dark:divide-zinc-600">
                          {searchValue.trim() === "" ? (
                            categories.map((cat, index) => (
                              <li
                                key={index}
                                className="flex items-center p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
                                onClick={() => {
                                  navigate(`/products?category=${cat.name}`);
                                }}
                              >
                                <FaSearch className="mr-2 text-[10px]" />
                                <p className="text-[9px] text-zinc-900 dark:text-zinc-300">
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
                                  className="flex items-center p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
                                  onClick={() => {
                                    setSearchValue("");
                                    navigate(
                                      `/products/search/?search=${suggestion.slug.split("-").slice(0,3).join(" ")}&&category=${suggestion.category}`
                                    );
                                  }}
                                >
                                  <img
                                    className="w-10 h-10 rounded-md object-cover"
                                    src={suggestion.images[0]}
                                  />
                                  <div className="ml-3">
                                    <p className="text-[10px] text-zinc-900 dark:text-zinc-300">
                                      {suggestion.name}
                                    </p>
                                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                      <>
                                        <span className="line-through text-zinc-500">
                                          {formatPrice(suggestion?.price)}
                                        </span>{" "}
                                        <span className="text-blue-700 dark:text-blue-500">
                                          {formatPrice(discountedPrice)} (-
                                          {suggestion?.discount}%)
                                        </span>
                                      </>
                                    </p>
                                  </div>
                                </li>
                              );
                            })
                          ) : (
                            <div className="flex items-center justify-center py-2">
                              <p className="text-[10px] text-zinc-900 dark:text-zinc-300">
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
              <div className="hidden md:flex flex-col col-span-1 items-center justify-center">
                <span className="text-[8px] text-zinc-600 dark:text-zinc-400">
                  Founder & CEO - <strong>Hardik Daim</strong>
                </span>
                <span className="text-[8px] text-zinc-600 dark:text-zinc-400">
                  E-Mail - <strong> hardikdaim@gmail.com</strong>
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
