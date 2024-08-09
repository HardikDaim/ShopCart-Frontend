import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { pathname } = useLocation();
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-y-0 left-0 bg-white dark:bg-slate-800 w-64 p-4 transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="mb-4 text-right w-full transition-colors duration-300 hover:text-slate-500"
        >
          <svg
            className="w-6 h-6 inline-block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <nav className="flex flex-col space-y-4 text-xs">
          <Link
            to="/"
            className={`${
              pathname === "/"
                ? "text-blue-500 dark:text-blue-300"
                : "text-slate-600 dark:text-slate-400"
            } transition-colors duration-300 hover:text-slate-500 dark:hover:text-slate-300`}
          >
            Home
          </Link>
          <Link
            to="/shops"
            className={`${
              pathname === "/shops"
                ? "text-blue-500 dark:text-blue-300"
                : "text-slate-600 dark:text-slate-400"
            } transition-colors duration-300 hover:text-slate-500 dark:hover:text-slate-300`}
          >
            Shop
          </Link>
          <Link
            to="/about-us"
            className={`${
              pathname === "/about-us"
                ? "text-blue-500 dark:text-blue-300"
                : "text-slate-600 dark:text-slate-400"
            } transition-colors duration-300 hover:text-slate-500 dark:hover:text-slate-300`}
          >
            About
          </Link>
          <Link
            to="/contact-us"
            className={`${
              pathname === "/contact-us"
                ? "text-blue-500 dark:text-blue-300"
                : "text-slate-600 dark:text-slate-400"
            } transition-colors duration-300 hover:text-slate-500 dark:hover:text-slate-300`}
          >
            Contact
          </Link>
          <div className="flex items-center justify-start gap-2 text-slate-500 dark:text-slate-400">
            <span className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <FaGithub />
            </span>
            <span>|</span>

            <span className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <FaLinkedin />
            </span>

            <span>|</span>

            <span className="text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300">
              <FaInstagram />
            </span>
          </div>
          <div className="flex justify-start items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"><span><FaPhoneAlt /></span>+91-95182-13371<span></span></div>
          <div className="flex justify-start items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"><span><SiGmail /></span>hardikdaim@gmail.com<span></span></div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
