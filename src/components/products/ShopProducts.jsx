import React, { useState, useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import LoaderOverlay from "../LoaderOverlay";
import { Link, useNavigate } from "react-router-dom";
import { add_to_cart, add_to_wishlist, messageClear } from "../../store/reducers/cartReducer";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ShopProducts = ({ products, loader, styles }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.cart);
  const [expandedStates, setExpandedStates] = useState({});
  const [wordLimit, setWordLimit] = useState(20);

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setWordLimit(60);
    } else if (window.innerWidth >= 768) {
      setWordLimit(40);
    } else {
      setWordLimit(10);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDescription = (index) => {
    setExpandedStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
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
  return (
    <div
      className={`w-full ${
        styles === "grid"
          ? "grid grid-cols-2 lg:grid-cols-3 gap-3"
          : "flex flex-col gap-3"
      }`}
    >
      {loader && <LoaderOverlay />}
      {products.length > 0 ?
        products.map((p, i) => {
          const discountedPrice = p.price - (p.price * p.discount) / 100;
          const words = p.description.split(" ");
          const shortDescription = words.slice(0, wordLimit).join(" ");
          const isExpanded = !!expandedStates[i];

          return (
            <div
              key={i}
              className={`w-full ${
                styles !== "grid" ? "flex items-start justify-start p2" : "p-1"
              } rounded-md transition-all duration-1000 hover:shadow-md hover:-translate-y-3`}
            >
              <div
                className={`${
                  styles === "grid"
                    ? "w-full relative group overflow-hidden"
                    : "w-1/3 relative group overflow-hidden"
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
                  <li   onClick={() => add_wishlist(p)} className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] transition-all">
                    <FaRegHeart />
                  </li>
                  <Link to={`/product/details/${p.slug}`}>
                    <li className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] transition-all">
                      <FaEye />
                    </li>
                  </Link>
                  <li    onClick={() => add_cart(p._id)} className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white hover:rotate-[720deg] transition-all">
                    <RiShoppingCartLine />
                  </li>
                </ul>
              </div>
              <div
                className={`my-2 text-slate-700 dark:text-slate-300 ${
                  styles === "grid" ? "w-full" : "w-2/3 pl-2 md:pl-4"
                }`}
              >
                <h2 className="font-bold text-xs lg:text-sm">{p.name}</h2>
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
                      </span>{" "}
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        ₹{discountedPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-black font-semibold dark:text-slate-300">
                      ₹{p.price}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isExpanded ? p.description : shortDescription}
                  {words.length > wordLimit && (
                    <span
                      onClick={() => toggleDescription(i)}
                      className="text-blue-600 cursor-pointer"
                    >
                      {isExpanded ? " Show less" : "... Show more"}
                    </span>
                  )}
                </p>
              </div>
            </div>
          );
        }): 'no Product with desired category found...'}
    </div>
  );
};

export default ShopProducts;
