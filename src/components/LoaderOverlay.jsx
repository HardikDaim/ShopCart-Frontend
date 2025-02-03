import React from "react";
import { DotLoader, HashLoader } from "react-spinners";

const LoaderOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 bg-opacity-100">
    <DotLoader color="#1D4ED8" />
  </div>
);

export default LoaderOverlay;
