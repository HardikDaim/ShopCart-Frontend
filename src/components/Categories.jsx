import React, { useRef } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Categories = ({ categories, loader }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      if (direction === "left") {
        current.scrollLeft -= 1000;
      } else {
        current.scrollLeft += 1000;
      }
    }
  };

  return (
    <>
      <div className="w-[85%] flex flex-wrap mx-auto pt-5 md:pt-10">
        <div className="w-full">
          <div className="flex font-bold relative justify-center items-center flex-col text-2xl md:text-4xl text-center text-zinc-700 dark:text-zinc-300">
            <h2>{loader ? <Skeleton width={150} /> : "Top Categories"}</h2>
            <div className="w-[60px] h-[4px] md:w-[100px] md:h-[8px] bg-blue-600 my-2 md:my-5 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div className="relative group">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute hidden md:block left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {/* Categories Container */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto pl-4 py-4 hide-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex space-x-4 md:space-x-8 lg:space-x-12">
            {loader
              ? Array.from({ length: 20 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-24 md:w-40 lg:w-60 text-center"
                  >
                    <Skeleton
                      height={80}
                      className="w-full h-20 md:h-32 lg:h-40 rounded-lg"
                    />
                    <Skeleton
                      width="60%"
                      height={20}
                      className="mt-2 mx-auto text-xs md:text-sm lg:text-base"
                    />
                  </div>
                ))
              : categories.map((category, index) => (
                  <Link to={`/products?category=${category.name}`} key={index}>
                    <div className="flex-shrink-0 w-24 md:w-40 lg:w-60 text-center transition-transform duration-500 hover:scale-110 cursor-pointer">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-20 md:h-32 lg:h-40 rounded-lg"
                      />
                      <div className="mt-2 text-xs text-zinc-700 dark:text-zinc-300">
                        {category.name}
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute hidden md:block right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-l from-blue-500 to-blue-700 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 focus:outline-none opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Categories;
