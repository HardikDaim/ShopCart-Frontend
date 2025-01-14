import React from "react";
import { Link } from "react-router-dom";
import { SiTheregister } from "react-icons/si";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-zinc-800">
      <div className="mx-auto w-full  p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0  ">
            <div className="logo text-2xl font-bold flex items-center">
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
            </div>
            <div className="my-4">
              <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-xs">
               Founder & CEO - <strong>Hardik Daim</strong>.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-xs">
                For any query contact me at{" "}
                <strong>hardikdaim@gmail.com</strong>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-32 sm:gap-6 md:grid-cols-2 text-xs">
            <div>
              <h2 className="mb-6 text-xs font-semibold text-zinc-900 uppercase dark:text-white">
                Support
              </h2>
              <ul className="text-zinc-500 dark:text-zinc-400 font-medium">
                <li className="mb-4">
                  <Link to="/help-center" className="hover:underline">
                  Help Center
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/delivery-information" className="hover:underline">
                  Shipping & Delivery
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/returns-and-refunds" className="hover:underline">
                  Returns & Refunds
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/faq" className="hover:underline">
                  FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-xs font-semibold text-zinc-900 uppercase dark:text-white">
                About Us
              </h2>
              <ul className="text-zinc-500 dark:text-zinc-400 font-medium">
                <li className="mb-4">
                  <Link to="/about-us" className="hover:underline">
                    About Me
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/contact-us" className="hover:underline">
                    Contact Me
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/delivery-information" className="hover:underline">
                    Delivery Information
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
        
          </div>
        </div>
        <hr className="my-6 border-zinc-200 sm:mx-auto dark:border-zinc-700 lg:my-8" />
        <div className="flex items-center justify-center">
          <span className="text-xs text-zinc-500 sm:text-center dark:text-zinc-400">
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="hover:underline">
              ShopCart
            </Link>
            . All Rights Reserved.
          </span>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
