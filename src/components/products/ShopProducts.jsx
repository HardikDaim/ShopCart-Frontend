import React, { useEffect, useState } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link, useNavigate } from "react-router-dom";
import {
  add_to_cart,
  add_to_wishlist,
  messageClear,
} from "../../store/reducers/cartReducer";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const ShopProducts = ({ styles }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { loader, products, isFetching } = useSelector((state) => state.home);
  const { successMessage, errorMessage } = useSelector((state) => state.cart);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isFetching) {
      setIsInitialLoad(true);
    } else {
      setIsInitialLoad(false);
    }
  }, [isFetching]);

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
  }, [successMessage, errorMessage, dispatch]);

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
      toast.error("Login to add Products to Wishlist");
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
      {(loader || isInitialLoad) ? (
        // Skeleton Loading State
        <div
        className={`w-full ${
          styles === "grid"
            ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3"
            : "flex flex-col gap-3"
        }`}
      >
        {Array.from({ length: products.length || 30 }).map((_, index) => (
          <div
            key={index}
            className={`w-full ${
              styles !== "grid" ? "flex items-start justify-start p-2" : "p-1"
            } rounded-md transition-all duration-1000 hover:shadow-md md:hover:-translate-y-3`}
          >
            <Skeleton height={200} width="100%" className="rounded-lg" />
            <div
              className={`${
                styles === "grid"
                  ? "w-full relative group overflow-hidden"
                  : "w-1/3 relative group overflow-hidden"
              }`}
            ></div>
            <div
              className={`my-2 text-zinc-700 dark:text-zinc-300 ${
                styles === "grid" ? "w-full" : "w-2/3 pl-2 md:pl-4"
              }`}
            >
              <Skeleton height={20} width="60%" className="mb-2" />
              <Skeleton height={15} width="40%" />
              <div className="flex justify-start items-center gap-2 text-xs md:text-sm lg:text-lg mt-2">
                <Skeleton height={20} width="30%" />
              </div>
              <Skeleton count={2} height={15} width="90%" className="mt-2" />
            </div>
          </div>
        ))}
      </div>
      ) : products && products.length > 0 ? (
        // Products Grid/List View
        <div
          className={`w-full ${
            styles === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3"
              : "flex flex-col gap-3"
          }`}
        >
          {products.map((p, i) => {
            const discountedPrice = p.price - (p.price * p.discount) / 100;
            return (
              <div
                key={i}
                onClick={() => navigate(`/product/details/${p.slug}`)}
                className={`w-full ${
                  styles !== "grid"
                    ? "flex items-start justify-start p-2"
                    : "p-1"
                } rounded-md md:transition-all duration-1000 hover:shadow-md md:hover:-translate-y-3`}
              >
                <div
                  className={`${
                    styles === "grid"
                      ? "w-full relative group overflow-hidden"
                      : "w-1/3 sm:w-1/4 md:w-1/3 lg:w-1/6 relative group overflow-hidden"
                  }`}
                >
                  {p.discount > 0 && (
                    <div className="flex justify-center items-center absolute text-white w-[30px] h-[20px] md:w-[38px] md:h-[38px] md:rounded-full bg-red-500 font-semibold text-xs -left-0 -top-1">
                      {p.discount}%
                    </div>
                  )}
                  <Link to={`/product/details/${p.slug}`}>
                    <img
                      className="rounded-lg w-full h-32"
                      src={p.images[0]}
                      alt={p.name}
                    />
                  </Link>
                  <ul className="hidden lg:flex transition-all duration-700 -bottom-20 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        add_wishlist(p);
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 cursor-pointer bg-white dark:bg-zinc-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] transition-all"
                    >
                      <FaRegHeart />
                    </li>
                    <Link to={`/product/details/${p.slug}`}>
                      <li className="w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 cursor-pointer bg-white dark:bg-zinc-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] transition-all">
                        <FaEye />
                      </li>
                    </Link>
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        add_cart(p._id);
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 cursor-pointer bg-white dark:bg-zinc-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] transition-all"
                    >
                      <RiShoppingCartLine />
                    </li>
                  </ul>
                </div>
                <div
                  className={`my-2 text-zinc-700 dark:text-zinc-300 ${
                    styles === "grid" ? "w-full" : "w-3/4 pl-2 md:pl-4"
                  }`}
                >
                  <h2 className="font-bold text-xs">
                    {p.name &&
                      (p.name.length > 40
                        ? `${p.name.substring(0, 40)}...`
                        : p.name)}
                  </h2>
                  <span
                    className={`${
                      styles === "grid" ? " flex gap-0" : "flex text-xs"
                    }`}
                  >
                    <Rating ratings={p.rating} />
                  </span>
                  <div className="flex justify-start items-center gap-2 text-xs md:text-sm lg:text-lg">
                    <>
                      <span className="line-through text-zinc-500">
                        {formatPrice(p.price)}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        {formatPrice(Math.round(discountedPrice))}
                      </span>
                    </>
                  </div>
                  <p className="text-[8px] text-zinc-600 dark:text-zinc-400">
                    {p.description &&
                      (p.description.length > 20
                        ? `${p.description.substring(0, 80)}...`
                        : p.description)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // No Products Found State
        !isInitialLoad && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-center items-center gap-y-4 w-full h-96"
          >
            <img
              className="w-36 h-36 object-cover"
              src="/images/empty-cart.png"
              alt="No Products Found"
            />
            <h4 className="font-bold text-sm md:text-lg text-center text-zinc-600">
              No Products Found
            </h4>
          </motion.div>
        )
      )}
    </>
  );
};

export default ShopProducts;