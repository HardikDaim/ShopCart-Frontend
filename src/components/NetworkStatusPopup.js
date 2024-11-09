import React, { useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { motion } from "framer-motion";

const NetworkStatusPopup = ({ isVisible }) => {
  // Prevent background scrolling and clicks when the popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-80 md:w-96 text-center transform transition-all duration-300 ease-in-out scale-95 sm:scale-100">
        {/* Title */}
        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Connection Lost
        </h2>

        {/* Message */}
        <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm md:text-base">
          It seems you're offline. Check your connection and try again.
        </p>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center justify-center gap-2 shadow-md transform transition-transform duration-150 active:scale-95"
        >
          <AiOutlineReload size={20} />
          Retry
        </button>
      </div>
    </div>
  );
};

export default NetworkStatusPopup;
