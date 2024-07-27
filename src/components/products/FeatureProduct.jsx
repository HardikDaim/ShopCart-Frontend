import React, { useEffect } from "react";
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

const FeatureProduct = ({ products, loader }) => {
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

  return (
    <>
      <div className="w-[85%] flex flex-wrap mx-auto pt-0 md:pt-10">
        <div className="w-full">
          <div className="flex font-bold relative justify-center items-center flex-col text-2xl md:text-4xl text-center text-slate-700 dark:text-slate-300">
            <h2>{loader ? <Skeleton width={150} /> : "Featured Products"}</h2>
            <div className="w-[60px] h-[4px] md:w-[100px] md:h-[8px] bg-blue-600 my-2 md:my-5 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div
        className="w-full overflow-x-auto pl-4 py-4 hide-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex space-x-4 md:space-x-8 lg:space-x-12">
          {loader
            ? Array.from({ length: products.length }).map((_, index) => (
                <div
                  key={index}
                  className="relative mt-4 w-24 md:w-40 lg:w-60 flex-shrink-0 transition-all duration-500 hover:transform hover:scale-110 cursor-pointer group"
                >
                  <Skeleton
                    height={80}
                    className="w-full h-20 md:h-32 lg:h-40 rounded-lg"
                  />
                  <div className="my-2 text-slate-700 dark:text-slate-300">
                    <Skeleton width={120} height={20} className="font-bold" />
                    <Skeleton width={80} height={20} className="mt-2" />
                    <Skeleton width={60} height={20} className="mt-2" />
                  </div>
                </div>
              ))
            : products.map((product, index) => {
                const discountedPrice =
                  product.price - (product.price * product.discount) / 100;

                return (
                  <div
                    key={index}
                    className="relative mt-4 w-24 md:w-40 lg:w-60 flex-shrink-0 transition-all duration-500 hover:transform hover:scale-110 cursor-pointer group"
                  >
                    {product.discount > 0 && (
                      <div className="flex justify-center z-10 items-center absolute text-white w-[25px] h-[25px] md:w-[38px] md:h-[38px] p-2 rounded-full bg-red-500 font-semibold text-[7px] md:text-xs -left-4 -top-4">
                        {product.discount}% off
                      </div>
                    )}
                    <div className="relative">
                      <Link to={`/product/details/${product.slug}`}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-20 md:h-32 lg:h-40 rounded-lg"
                        />
                      </Link>
                      <ul className="flex transition-all duration-700 -bottom-12 justify-center items-center gap-2 absolute w-full opacity-0 group-hover:bottom-3 group-hover:opacity-100">
                        <li
                          onClick={() => add_wishlist(product)}
                          className="w-10 h-10 md:w-12 md:h-12 cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:rotate-180"
                        >
                          <FaRegHeart />
                        </li>
                        <Link to={`/product/details/${product.slug}`}>
                          <li className="w-10 h-10 md:w-12 md:h-12 cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:rotate-180">
                            <FaEye />
                          </li>
                        </Link>
                        <li
                          onClick={() => add_cart(product._id)}
                          className="w-10 h-10 md:w-12 md:h-12 cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:rotate-180"
                        >
                          <RiShoppingCartLine />
                        </li>
                      </ul>
                    </div>

                    <div className="my-2 text-slate-700 dark:text-slate-300 text-xs md:text-sm">
                      <h2 className="font-bold">
                        {product.name.length > 30
                          ? `${product.name.substring(0, 30)}...`
                          : product.name}
                      </h2>

                      <div className="flex gap-1">
                        <Rating ratings={product.rating} />
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        {product.discount > 0 ? (
                          <>
                            <span className="line-through text-slate-500">
                              ₹{product.price}
                            </span>{" "}
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              ₹{discountedPrice.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-black font-semibold dark:text-slate-300">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default FeatureProduct;
