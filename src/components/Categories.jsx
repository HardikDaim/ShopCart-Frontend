import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const Categories = ({ loader }) => {
  const scrollRef = useRef(null);
  const { categories } = useSelector((state) => state.home);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const { current } = scrollRef;
    if (current) {
      setCanScrollLeft(current.scrollLeft > 0);
      setCanScrollRight(
        current.scrollLeft + current.offsetWidth < current.scrollWidth
      );
    }
  };

  useEffect(() => {
    const { current } = scrollRef;
    if (current) {
      updateScrollButtons();
      current.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (current) {
        current.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

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
          <div className="flex font-bold relative justify-center items-center flex-col text-md sm:text-lg md:text-xl text-center text-zinc-700 dark:text-zinc-300">
            <h2>{loader ? <Skeleton width={150} /> : "Top Categories"}</h2>
            <div className="w-[60px] h-[4px] md:w-[100px] md:h-[6px] bg-blue-600 my-1 md:my-2 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div className="relative group">
        {/* Left Scroll Button */}
        {canScrollLeft && (
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
        )}
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
                    className="flex-shrink-0 w-20 md:w-36 lg:w-48 text-center"
                  >
                    <Skeleton className="w-full h-16 md:h-28 lg:h-32 rounded-lg" />
                    <Skeleton
                      width="60%"
                      height={20}
                      className="mt-2 mx-auto text-xs md:text-sm lg:text-base"
                    />
                  </div>
                ))
              : categories.map((category, index) => (
                  <Link to={`/products?category=${category.name}`} key={index}>
                    <div className="flex-shrink-0 w-20 md:w-36 lg:w-48 text-center transition-transform duration-500 hover:scale-110 cursor-pointer">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-16 md:h-28 lg:h-32 rounded-lg"
                      />
                      <div className="mt-2 text-[8px] md:text-xs text-zinc-700 dark:text-zinc-300">
                        {category.name}
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
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
        )}
      </div>
    </>
  );
};

export default Categories;
