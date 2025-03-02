import React, { useEffect, useRef, useState } from "react";
import Rating from "../Rating";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_cart,
  add_to_wishlist,
  messageClear,
} from "../../store/reducers/cartReducer";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeatureProduct = ({ loader }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.cart);

  const scrollRef = useRef(null); // Create a reference for the scroll container
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
  // Function to scroll left
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

  const add_cart = (id) => {
    if (userInfo) {
      dispatch(
        add_to_cart({ userId: userInfo.id, quantity: 1, productId: id })
      );
    } else {
      toast.error("Login to buy Products");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, messageClear, dispatch]);

  const add_wishlist = (p) => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo?.id,
          productId: p?._id,
          name: p?.name,
          price: p?.price,
          image: p?.images[0],
          discount: p?.discount,
          rating: p?.rating,
          slug: p?.slug,
        })
      );
    } else {
      toast.error("Login to buy Products");
      navigate("/login");
    }
  };

  const formatPrice = (price) => {
    return price
      ? "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 })
      : "N/A";
  };

  return (
    <>
      <div className="w-[85%] flex flex-wrap mx-auto pt-0 md:pt-10">
        <div className="w-full">
          <div className="flex font-bold relative justify-center items-center flex-col text-md sm:text-lg md:text-xl text-center text-zinc-700 dark:text-zinc-300">
            <h2>{loader ? <Skeleton width={150} /> : "Featured Products"}</h2>
            <div className="w-[60px] h-[4px] md:w-[100px] md:h-[6px] bg-blue-600 my-1 md:my-2 rounded-lg"></div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden group">
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

        <div
          ref={scrollRef}
          className="w-full overflow-x-auto pl-4 py-2 hide-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex space-x-4 md:space-x-8 lg:space-x-12">
            {loader
              ? Array.from({ length: 20 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative mt-4 w-20 md:w-36 lg:w-48 flex-shrink-0 cursor-pointer group"
                  >
                    <Skeleton
                      height={80}
                      className="w-full h-20 md:h-32 lg:h-40 rounded-lg"
                    />
                    <div className="my-2 text-zinc-700 dark:text-zinc-300">
                      <Skeleton width={190} height={20} className="mt-2" />
                      <Skeleton width={80} height={20} className="mt-2" />
                    </div>
                  </div>
                ))
              : products.map((product, index) => {
                  const discountedPrice =
                    product.price - (product.price * product.discount) / 100;

                  return (
                    <div
                      key={index}
                      className="relative mt-4 w-20 md:w-36 lg:w-48 flex-shrink-0 transition-all duration-500 hover:transform hover:scale-110 cursor-pointer group"
                    >
                      {product.discount > 0 && (
                        <div className="flex justify-center z-10 items-center absolute text-white w-[20px] h-[20px] md:w-[30px] md:h-[30px] rounded-full bg-red-500 font-semibold text-[4px] md:text-[6px] -left-2 -top-2">
                          {product.discount}% off
                        </div>
                      )}
                      <div className="relative">
                        <Link to={`/product/details/${product.slug}`}>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-16 md:h-28 lg:h-32 rounded-lg"
                          />
                        </Link>
                        <ul className="hidden transition-all duration-700 -bottom-12 justify-center items-center gap-2 absolute w-full opacity-0 group-hover:bottom-3 group-hover:opacity-100">
                          <li
                            onClick={() => add_wishlist(product)}
                            className="w-10 h-10 md:w-12 md:h-12 cursor-pointer bg-white dark:bg-zinc-800 flex justify-center items-center rounded-full hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white transition-all transform hover:rotate-180 shadow-lg"
                          >
                            <FaRegHeart />
                          </li>
                          <Link to={`/product/details/${product.slug}`}>
                            <li className="w-10 h-10 md:w-12 md:h-12 cursor-pointer bg-white dark:bg-zinc-800 flex justify-center items-center rounded-full hover:bg-gradient-to-r from-green-400 to-blue-500 hover:text-white transition-all transform hover:rotate-180 shadow-lg">
                              <FaEye />
                            </li>
                          </Link>
                          <li
                            onClick={() => add_cart(product._id)}
                            className="w-10 h-10 md:w-12 md:h-12 cursor-pointer bg-white dark:bg-zinc-800 flex justify-center items-center rounded-full hover:bg-gradient-to-r from-yellow-400 to-orange-500 hover:text-white transition-all transform hover:rotate-180 shadow-lg"
                          >
                            <RiShoppingCartLine />
                          </li>
                        </ul>
                      </div>

                      <div className="my-2 text-zinc-700 dark:text-zinc-300 text-[8px] md:text-[10px]">
                        <h2 className="font-bold">
                          {product.name.length > 30
                            ? `${product.name.substring(0, 30)}...`
                            : product.name}
                        </h2>

                        <div className="flex gap-1">
                          <Rating ratings={product.rating} />
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <>
                            <span className="line-through text-zinc-500 hidden md:flex">
                              {formatPrice(Math.round(product.price))}
                            </span>{" "}
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {formatPrice(Math.round(discountedPrice))}
                            </span>
                          </>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

export default FeatureProduct;
