import React, { useState, useEffect } from "react";
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

const ShopProducts = ({ products, loader, styles }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.cart);

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

  return (
    <>
      {loader ? (
        <div
          className={`w-full ${
            styles === "grid"
              ? "grid grid-cols-2 md::grid-cols-3 xl:grid-cols-4 gap-3"
              : "flex flex-col gap-3"
          }`}
        >
          {Array.from({ length: products.length }).map((_, index) => (
            <div
              key={index}
              className={`w-full ${
                styles !== "grid" ? "flex items-start justify-start p-2" : "p-1"
              } rounded-md transition-all duration-1000 hover:shadow-md hover:-translate-y-3`}
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
                className={`my-2 text-slate-700 dark:text-slate-300 ${
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
      ) : (
        products.length > 0 && (
          <div
            className={`w-full ${
              styles === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
                : "flex flex-col gap-3"
            }`}
          >
            {products.map((p, i) => {
              const discountedPrice = p.price - (p.price * p.discount) / 100;
              return (
                <div
                  key={i} onClick={() => navigate(`/product/details/${p.slug}`)}
                  className={`w-full ${
                    styles !== "grid"
                      ? "flex items-start justify-start p-2"
                      : "p-1"
                  } rounded-md transition-all duration-1000 hover:shadow-md hover:-translate-y-3`}
                >
                  <div
                    className={`${
                      styles === "grid"
                        ? "w-full relative group overflow-hidden"
                        : "w-1/4 relative group overflow-hidden"
                    }`}
                  >
                    {p.discount > 0 && (
                      <div className="flex justify-center items-center absolute text-white w-[30px] h-[20px] md:w-[38px] md:h-[38px] md:rounded-full bg-red-500 font-semibold text-xs -left-0 -top-1">
                        {p.discount}%
                      </div>
                    )}
                    <Link to={`/product/details/${p.slug}`}>
                      <img
                        className="rounded-lg w-full h-28 md:w-full md:h-40 lg:h-60"
                        src={p.images[0]}
                        alt={p.name}
                      />
                    </Link>
                    <ul className="flex transition-all duration-700 -bottom-20 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                      <li
                        onClick={() => add_wishlist(p)}
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] transition-all"
                      >
                        <FaRegHeart />
                      </li>
                      <Link to={`/product/details/${p.slug}`}>
                        <li className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] transition-all">
                          <FaEye />
                        </li>
                      </Link>
                      <li
                        onClick={() => add_cart(p._id)}
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] transition-all"
                      >
                        <RiShoppingCartLine />
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`my-2 text-slate-700 dark:text-slate-300 ${
                      styles === "grid" ? "w-full" : "w-3/4 pl-2 md:pl-4"
                    }`}
                  >
                    <h2 className="font-bold text-xs lg:text-sm">
                      {p.name &&
                        (p.name.length > 40
                          ? `${p.name.substring(0, 40)}...`
                          : p.name)}
                    </h2>
                    <span
                      className={`${
                        styles === "grid"
                          ? " flex gap-0"
                          : "flex text-sm md:text-lg"
                      }`}
                    >
                      <Rating ratings={p.rating} />
                    </span>
                    <div className="flex justify-start items-center gap-2 text-xs md:text-sm lg:text-lg">
                      {p.discount > 0 ? (
                        <>
                          <span className="line-through text-slate-500">
                            ₹{p.price}
                          </span>
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            ₹
                            {Math.round(discountedPrice).toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </>
                      ) : (
                        <span className="text-black font-semibold dark:text-slate-300">
                          ₹{p.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {p.description &&
                        (styles === "grid" && p.description.length > 80 ? (
                          `${p.description
                            .substring(0, 80)
                            .replace(/\s+/g, " ")
                            .trim()}...`
                        ) : (
                          <>
                            <span className="block md:hidden">
                              {p.description.length > 80
                                ? `${p.description
                                    .substring(0, 80)
                                    .replace(/\s+/g, " ")
                                    .trim()}...`
                                : p.description}
                            </span>
                            <span className="hidden md:block lg:hidden">
                              {p.description.length > 120
                                ? `${p.description
                                    .substring(0, 120)
                                    .replace(/\s+/g, " ")
                                    .trim()}...`
                                : p.description}
                            </span>

                            <span className="hidden lg:block">
                              {p.description}
                            </span>
                          </>
                        ))}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {products.length <= 0 && (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <motion.img
            src="/images/noproducts.png"
            alt="No Product"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5}}
            className="rounded-lg  mb-4"
          />
          <p className="text-slate-600 dark:text-slate-300 text-center">
            No Products found. Please try again later.
          </p>
        </div>
      )}
    </>
  );
};

export default ShopProducts;
