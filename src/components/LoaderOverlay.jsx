import React from "react";
import { HashLoader } from "react-spinners";

const LoaderOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <HashLoader color="#4F46E5" />
  </div>
);

export default LoaderOverlay;
