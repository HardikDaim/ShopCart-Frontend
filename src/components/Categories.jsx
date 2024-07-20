import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Categories = ({ categories, loader }) => {

  return (
    <>
      <div className="w-[85%] flex flex-wrap mx-auto pt-5 md:pt-10">
        <div className="w-full">
          <div className="flex font-bold relative justify-center items-center flex-col text-2xl md:text-4xl text-center text-slate-700 dark:text-slate-300">
            <h2>{loader ? <Skeleton width={150} /> : 'Top Categories'}</h2>
            <div className=" w-[60px] h-[4px] md:w-[100px] md:h-[8px] bg-blue-600 my-2 md:my-5 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div
        className="w-full overflow-x-auto pl-4 py-4 hide-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex space-x-6 md:space-x-12">
          {loader ? (
            [...Array(5)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-60 text-center">
                <Skeleton height={160} className="w-full h-40 rounded-lg" />
                <Skeleton width={120} height={20} className="mt-2" />
              </div>
            ))
          ) : (
            categories.map((category, index) => (
              <Link to={`/products?category=${category.name}`} key={index}>
                <div
                  className="flex-shrink-0 w-28  md:w-60 text-center transition-all duration-500 hover:transform hover:scale-110 cursor-pointer"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-20 md:h-40 rounded-lg"
                  />
                  <div className="mt-2 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                    {category.name}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
