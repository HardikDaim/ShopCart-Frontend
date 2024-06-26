import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Rating from "../Rating";

const Products = ({ title, products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-between items-center ">
        <div className="text-xl font-bold text-slate-700 dark:text-slate-300">
          {title}
        </div>
        <div className="flex justify-center items-center gap-2 text-slate-600">
          <button
            onClick={() => previous()}
            className="w-8 h-8 flex justify-center items-center bg-slate-300 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors duration-200"
          >
            <IoIosArrowBack className="text-slate-700 dark:text-slate-300" />
          </button>
          <button
            onClick={() => next()}
            className="w-8 h-8 flex justify-center items-center bg-slate-300 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors duration-200"
          >
            <IoIosArrowForward className="text-slate-700 dark:text-slate-300" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-8 flex-col-reverse">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((p, i) => {
          return (
            <div key={i} className="flex flex-col justify-start gap-4">
              {p.map((pl, j) => {
                const discountedPrice =
                  pl.price - (pl.price * pl.discount) / 100;

                return (
                  <Link to={`/product/details/${pl.slug}`}
                    key={j}
                    className="flex relative justify-start items-start overflow-x-auto"
                  
                  >
                    {pl.discount > 0 && (
                      <div className="flex justify-center items-center absolute text-white bg-red-500 font-semibold text-xs -left-0 rounded-md -top-0 w-8 h-5  shadow-lg">
                        {pl.discount}%
                      </div>
                    )}
                    
                      <img
                        className="w-36 h-28 md:w-32 md:h-28 lg:w-40 lg:h-auto rounded-md"
                        src={pl.images[0]}
                        alt={pl.name}
                      />
                 
                    <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-700 dark:text-slate-400">
                      <h2>{pl.name}</h2>
                      <div className="flex gap-1">
                        <Rating ratings={pl.rating} />
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        {pl.discount > 0 ? (
                          <>
                            <span className="line-through text-slate-500">
                              ₹{pl.price}
                            </span>
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              ₹{discountedPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-black font-semibold dark:text-slate-300">
                            ₹{pl.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Products;
