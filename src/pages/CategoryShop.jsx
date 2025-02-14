import React, { useEffect, useState, lazy, Suspense } from "react";
import Header from "../components/Header";
import { Link, useSearchParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Range } from "react-range";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import Products from "../components/products/Products";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  price_range_product,
  query_products,
} from "../store/reducers/homeReducer";
import LoaderOverlay from "../components/LoaderOverlay";
import { toast } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
const ShopProducts = lazy(() => import("../components/products/ShopProducts"));

const CategoryShop = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const dispatch = useDispatch();
  const {
    loader,
    errorMessage,
    successMessage,
    latestProducts,
    priceRange,
    totalProducts,
    perPage,
  } = useSelector((state) => state.home);

  const [filter, setFilter] = useState(true);
  const [state, setState] = useState({
    values: [priceRange.low, priceRange.high],
  });
  const [rating, setRating] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);

  const options = [
    { value: "low-to-high", label: "Low to High Price" },
    { value: "high-to-low", label: "High to Low Price" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[1]);
  const [styles, setStyles] = useState("grid");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(price_range_product());
  }, [dispatch]);

  useEffect(() => {
    setState({ values: [priceRange.low, priceRange.high] });
  }, [priceRange]);

  useEffect(() => {
    dispatch(
      query_products({
        low: state.values[0] || "",
        high: state.values[1] || "",
        category,
        rating,
        selectedOption,
        pageNumber,
      })
    );
  }, [
    state.values[0],
    state.values[1],
    category,
    rating,
    selectedOption,
    pageNumber,
  ]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [dispatch, errorMessage, successMessage]);

  const resetRating = () => {
    setRating("");
    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        category,
        rating: "",
        selectedOption,
        pageNumber,
      })
    );
  };

  const formatPrice = (price) => {
    return price
      ? "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 })
      : "N/A";
  };

  return (
    <div>
      <Header />
      <section className="py-6 mx-4">
        <div className="h-full mx-auto">
          <div className="block md:hidden mb-6">
            <button
              onClick={() => setFilter(!filter)}
              className="text-center rounded-full font-medium w-full py-2 px-3 bg-blue-600 text-white dark:text-zinc-300"
            >
              Filter Products
            </button>
          </div>
          <div className="w-full flex flex-wrap">
            <div
              className={`w-full md:w-5/12 lg:w-3/12 md:pr-8 md:pl-2 transition-all duration-300 ease-in-out ${
                filter ? "max-h-0 overflow-hidden md:max-h-full" : "max-h-full"
              }`}
            >
              <div className="flex flex-col py-2 gap-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-md font-bold mb-3 text-zinc-700 dark:text-zinc-300">
                    Price
                  </h2>
                  <button
                    onClick={() => setFilter(!filter)}
                    className="text-md p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 md:hidden rounded-full "
                  >
                    <IoMdClose />
                  </button>
                </div>
                <Range
                  step={5}
                  min={priceRange.low}
                  max={priceRange.high}
                  values={state.values}
                  onChange={(values) => setState({ values })}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-[6px] bg-zinc-200 dark:bg-zinc-700 rounded-full cursor-pointer"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      className="w-[15px] h-[15px] bg-blue-600 rounded-full"
                    />
                  )}
                />
                <div className="text-xs flex justify-between text-zinc-700 dark:text-zinc-300">
                  <span>{formatPrice(state.values[0])}</span>
                  <span>{formatPrice(state.values[1])}</span>
                </div>
              </div>
              <div className="flex flex-col py-2 gap-5">
                <div className="flex justify-between">
                  <h2 className="text-md font-bold mb-3 text-zinc-700 dark:text-zinc-300">
                    Rating
                  </h2>
                  <button
                    onClick={resetRating}
                    className="text-xs font-medium underline  mb-3 text-zinc-700 dark:text-zinc-300"
                  >
                    Reset Rating
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <div
                    onClick={() => setRating(5)}
                    className="text-yellow-500 dark:text-yellow-300 flex justify-start gap-2 cursor-pointer text-xs items-start"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(4)}
                    className="text-yellow-500 dark:text-yellow-300 flex justify-start gap-2 cursor-pointer text-xs items-start"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(3)}
                    className="text-yellow-500 dark:text-yellow-300 flex justify-start gap-2 cursor-pointer text-xs items-start"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(2)}
                    className="text-yellow-500 dark:text-yellow-300 flex justify-start gap-2 cursor-pointer text-xs items-start"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(1)}
                    className="text-yellow-500 dark:text-yellow-300 flex justify-start gap-2 cursor-pointer text-xs items-start"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-4   ">
                <Products title="Latest Products" products={latestProducts} />
              </div>
            </div>
            {/* Placeholder for product list */}
            <div className="w-full md:w-7/12 lg:w-9/12  md:pl-2 transition-all duration-300 ease-in-out ">
              <div className=" p-2 mb-4 rounded-md flex justify-between items-center border dark:border-zinc-600 bg-white dark:bg-zinc-800">
                <h2 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {totalProducts} Products
                </h2>
                <div className="flex justify-center items-center gap-3">
                  <div className="relative">
                    <button
                      className="flex items-center justify-between  px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md   md:w-48 focus:outline-none focus:ring focus:ring-blue-500"
                      onClick={toggleDropdown}
                    >
                      <span className="text-xs md:text-xs">
                        {selectedOption.label}
                      </span>
                      {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                    {isOpen && (
                      <div className="absolute z-10 mt-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-md">
                        {options.map((option) => (
                          <div
                            key={option.value}
                            className="px-4 py-2 cursor-pointer text-xs md:text-xs hover:bg-zinc-100 dark:hover:bg-zinc-700"
                            onClick={() => handleOptionClick(option)}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-start gap-4 ">
                    <button
                      onClick={() => setStyles("grid")}
                      className={`p-2 ${
                        styles === "grid" && "bg-zinc-300 dark:bg-zinc-500"
                      } rounded-md text-zinc-600 text-xs md:text-xs dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-500`}
                    >
                      <BsFillGridFill />
                    </button>
                  </div>
                  <div className="flex justify-center items-start gap-4">
                    <button
                      onClick={() => setStyles("list")}
                      className={`p-2 ${
                        styles === "list" && "bg-zinc-300 dark:bg-zinc-500"
                      } rounded-md text-zinc-600 text-xs md:text-xs dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-500`}
                    >
                      {" "}
                      <FaThList />
                    </button>
                  </div>
                </div>
              </div>
              <div className="pb-8">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center p-2 mb-8 bg-yellow-200 text-blue-700 dark:text-blue-700 font-semibold rounded-lg">
                      <svg
                        className="w-6 h-6 mr-2 animate-spin text-blue-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 1 0 16 0A8 8 0 0 0 4 12z"
                        ></path>
                      </svg>
                      Loading...
                    </div>
                  }
                >
                  <ShopProducts
                    styles={styles}
                  />
                </Suspense>
                <div className="py-4 flex justify-end items-center">
                  {totalProducts > perPage && (
                    <Pagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalItem={totalProducts}
                      perPage={perPage}
                      showItem={Math.floor(totalProducts / perPage)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CategoryShop;
