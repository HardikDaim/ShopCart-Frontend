import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Rating from "../components/Rating";
import { FaHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import RatingTemp from "../components/RatingTemp";
import { Link, useNavigate, useParams } from "react-router-dom";
import RatingReact from "react-rating";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  customer_review,
  get_reviews,
  product_details,
} from "../store/reducers/homeReducer";
import toast from "react-hot-toast";
import {
  add_to_cart,
  add_to_wishlist,
  messageClear,
} from "../store/reducers/cartReducer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../components/styles.css";
import { Helmet } from "react-helmet-async";

const Details = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { product, relatedProducts, moreProducts, loader } = useSelector(
    (state) => state.home
  );
  const [details, setDetails] = useState(false);

  const {
    loader: cartLoader,
    errorMessage,
    successMessage,
  } = useSelector((state) => state.cart);

  const {
    loader: homeloader,
    errorMessage: homeErrorMessage,
    successMessage: homeSuccessMessage,
    totalReview,
    reviews,
    rating_review,
  } = useSelector((state) => state.home);

  const [rat, setRat] = useState("");
  const [re, setRe] = useState("");

  useEffect(() => {
    dispatch(product_details(slug));
  }, [dispatch, slug]);

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.images.length - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < product.images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const [quantity, setQuantity] = useState(1);
  const inc = () => {
    if (quantity >= product?.stock) {
      toast.error(`Only ${product?.stock} items in Stock`);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const add_cart = (id) => {
    if (userInfo) {
      dispatch(
        add_to_cart({ userId: userInfo.id, quantity: quantity, productId: id })
      );
    } else {
      toast.error("Login to add Product to cart");
      navigate("/login");
    }
  };

  const add_wishlist = (p) => {
    if (userInfo && p?.stock >= 0) {
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

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (homeErrorMessage) {
      toast.error(homeErrorMessage);
      dispatch(messageClear());
    }
    if (homeSuccessMessage) {
      toast.success(homeSuccessMessage);
      dispatch(get_reviews({ productId: product._id }));
      dispatch(product_details(slug));
      setRat("");
      setRe("");
      dispatch(messageClear());
    }
  }, [
    successMessage,
    errorMessage,
    messageClear,
    homeErrorMessage,
    homeSuccessMessage,
    dispatch,
    slug,
  ]);

  useEffect(() => {
    if (product && product._id) {
      dispatch(get_reviews({ productId: product._id }));
    }
  }, [dispatch, product]);

  const formatPrice = (price) => {
    return price
      ? "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 2 })
      : "N/A";
  };

  const buyNow = () => {
    let price = 0;
    if (userInfo) {
      if (product?.discount !== 0) {
        price =
          product?.price -
          Math.floor((product?.price * product?.discount) / 100);
      } else {
        price = product?.price;
      }

      const obj = [
        {
          sellerId: product?.sellerId,
          shopName: product?.shopName,
          price: quantity * price,
          products: [
            {
              quantity,
              productInfo: product,
            },
          ],
        },
      ];

      navigate("/shipping", {
        state: {
          products: obj,
          price: quantity * price,
          shipping_fee: 0 * quantity,
          items: quantity,
        },
      });
    } else {
      toast.error("Log In to buy Products");
      navigate("/login");
    }
  };

  const reviewSubmit = (e) => {
    e.preventDefault();
    if (rat === 0) {
      toast.error("Please provide a rating.");
    } else if (re.trim() === "") {
      toast.error("Please write a review.");
      return;
    } else {
      const obj = {
        name: userInfo.name,
        review: re,
        rating: rat,
        productId: product?._id,
      };
      dispatch(customer_review(obj));
    }
  };

  const share = async () => {
    const productUrl = window.location.href; // current url
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this product!",
          text: "I found this amazing product, have a look:",
          url: productUrl,
        });
        console.log("Product shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        "Check out this product: " + productUrl
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const reviewSectionRef = useRef(null);

  const scrollToReviews = () => {
    reviewSectionRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
      <Helmet>
        <title>
          {product.name
            ? product.name + " | ShopCart - An E-Commerce Platform"
            : "Loading..."}
        </title>
        <meta
          name="description"
          content={
            product.description?.length > 150
              ? product.description.slice(0, 150).concat("...")
              : product.description
          }
        />
        <meta
          name="keywords"
          content={
            product.name
              ? product.name.split(" ").join(", ")
              : "product, ecommerce, shop"
          }
        />
        <meta
          property="og:title"
          content={product ? product.name : "Loading..."}
        />
        <meta property="og:type" content="product" />
        <meta
          property="og:description"
          content={
            product.description?.length > 150
              ? product.description.slice(0, 150).concat("...")
              : product.description
          }
        />
        <meta property="og:image" content={product?.images?.[0]} />
        <meta
          property="og:url"
          content={`https://shop-cart-ten-chi.app/product/details/${slug}`}
        />
        <link
          rel="canonical"
          href={`https://shop-cart-ten-chi.vercel.app/product/details${slug}`}
        />
      </Helmet>
      <Header />
      <div className="mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            {loader ? (
              <Skeleton height="600px" width="100%" className="rounded-lg" />
            ) : (
              <>
                {product?.images && product?.images?.length > 0 && (
                  <div className="relative overflow-hidden">
                    <div
                      className="flex transition-transform duration-500"
                      style={{
                        transform: `translateX(-${currentImageIndex * 100}%)`,
                      }}
                    >
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={product.name}
                          className="w-full h-auto max-h-[600px] rounded-lg shadow-lg object-contain flex-shrink-0"
                        />
                      ))}
                    </div>
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className={`${
                            currentImageIndex === 0
                              ? "hidden"
                              : "absolute left-1 top-1/2 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 bg-opacity-50 text-white p-2 rounded-full shadow-lg focus:outline-none"
                          }`}
                        >
                          &lt;
                        </button>
                        <button
                          onClick={handleNextImage}
                          className={`${
                            currentImageIndex === product.images.length - 1
                              ? "hidden"
                              : "absolute right-1 top-1/2 transform -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 bg-opacity-50 text-white p-2 rounded-full shadow-lg focus:outline-none"
                          }`}
                        >
                          &gt;
                        </button>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
            {product?.images && product?.images.length > 1 && (
              <div
                className="flex mt-4 space-x-2 justify-center lg:justify-start overflow-x-auto hide-scrollbar"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {loader
                  ? Array.from({ length: product.images.length }).map(
                      (_, index) => (
                        <Skeleton
                          key={index}
                          width={64}
                          height={64}
                          className="rounded-lg"
                        />
                      )
                    )
                  : product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={product.name}
                        className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                          index === currentImageIndex
                            ? "border-2 border-blue-500"
                            : "opacity-50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            {loader ? (
              <div className="flex flex-col space-y-4">
                <Skeleton height={40} width="100%" className="rounded-lg" />
                <Skeleton height={30} width="20%" className="rounded-lg" />
                <Skeleton height={20} width="25%" className="rounded-lg" />
                <Skeleton height={140} width="100%" className="rounded-lg" />
                <Skeleton height={40} width="20%" className="rounded-lg" />
                <Skeleton height={20} width="20%" className="rounded-lg" />
                <Skeleton height={50} width="100%" className="rounded-lg" />
                <Skeleton height={50} width="100%" className="rounded-lg" />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h1 className="text-xl md:text-3xl font-bold">
                    {product?.name}
                  </h1>
                  <button
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Share"
                    onClick={share}
                    className="text-2xl font-bold"
                  >
                    <IoShareSocialOutline />
                  </button>
                </div>
                <div className="flex justify-start items-center gap-4">
                  <div className="text-xl flex">
                    <Rating ratings={product?.rating} />
                  </div>
                  <span
                    onClick={scrollToReviews}
                    className="hover:underline cursor-pointer"
                  >
                    {totalReview} reviews
                  </span>
                  {/* <Link to={`/chat/${product?.sellerId}`}>
                    <span className="hover:underline cursor-pointer">chat</span>
                  </Link> */}
                </div>
                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {product?.discount !== 0 ? (
                    <>
                      <span className="line-through text-zinc-500">
                        {formatPrice(product?.price)}
                      </span>{" "}
                      <span>
                        {formatPrice(discountedPrice)} (-{product?.discount}%)
                      </span>
                    </>
                  ) : (
                    <>₹{product?.price}</>
                  )}
                </p>
                <p className="text-xs md:text-sm">{product?.description}</p>
                {product?.stock > 0 ? (
                  <div className="mt-2 flex items-center space-x-3">
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Stock"
                      className="py-2 px-3 text-xl text-green-600 dark:text-green-400 bg-zinc-300 dark:bg-zinc-700 rounded-xl"
                    >
                      In Stock
                    </button>
                    <button
                      onClick={dec}
                      className="px-2 py-0 text-[28px] bg-zinc-300 dark:bg-zinc-700 rounded-xl text-zinc-800 dark:text-zinc-200"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={inc}
                      className="px-2 py-0 text-[28px] bg-zinc-300 dark:bg-zinc-700 rounded-xl text-zinc-800 dark:text-zinc-200"
                    >
                      +
                    </button>
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Add to Wishlist"
                      onClick={() => add_wishlist(product)}
                      className="py-2 px-3 text-[28px] bg-zinc-300 dark:bg-zinc-700 rounded-xl"
                    >
                      <FaHeart />
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center space-x-3">
                    <button className="py-2 px-3 text-xl text-red-600 dark:text-red-400 bg-zinc-300 dark:bg-zinc-700 rounded-xl">
                      Out of Stock
                    </button>

                    <button
                      onClick={() => add_wishlist(product)}
                      className="py-2 px-3 text-[28px] bg-zinc-300 dark:bg-zinc-700 rounded-xl"
                    >
                      <FaHeart />
                    </button>
                  </div>
                )}
                {product?.stock <= 10 && product?.stock > 0 ? (
                  <p className="text-red-600 dark:text-red-400">
                    Hurry up, only {product?.stock} piece(s) left
                  </p>
                ) : (
                  ""
                )}
                <div className="flex gap-1 font-semibold">
                  <span>Seller:</span>
                  <span className="hover:underline cursor-pointer">
                    {product?.shopName}
                  </span>
                  <span className="rounded-full text-white bg-blue-700 px-2">
                    4.1⭐️
                  </span>
                </div>
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => add_cart(product._id)}
                    className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={buyNow}
                    className="py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500"
                  >
                    Buy Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {details && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Details & Specifications</h2>
          </div>
        )}
        <div
          ref={reviewSectionRef}
          className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg space-y-4 mt-8"
        >
          <h2 className="text-2xl font-semibold">Customer's Ratings</h2>
          <div className="mt-8">
            <div className="flex flex-col md:flex-row md:justify-between gap-10 md-lg:flex-col">
              <div className="flex flex-col gap-2 justify-start items-center md:items-start py-4">
                <div>
                  <span className="text-6xl font-semibold">
                    {product?.rating}
                  </span>
                  <span className="text-3xl font-semibold text-zinc-600 dark:text-zinc-50 ">
                    /5
                  </span>
                </div>
                <div className="flex text-3xl ">
                  <Rating ratings={product?.rating} />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-50 ">
                  {totalReview} Reviews
                </p>
              </div>

              <div className="flex gap-2 flex-col py-4">
                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={5} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-zinc-200 relative">
                    <div
                      style={{
                        width: `${Math.floor(
                          (100 * (rating_review[0]?.sum || 0)) / totalReview
                        )}%`,
                      }}
                      className="h-full bg-yellow-500 w-[0%]"
                    ></div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-50 w-[0%]">
                    {rating_review[0]?.sum}
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={4} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-zinc-200 relative">
                    <div
                      style={{
                        width: `${Math.floor(
                          (100 * (rating_review[1]?.sum || 0)) / totalReview
                        )}%`,
                      }}
                      className="h-full bg-yellow-500 w-[0%]"
                    ></div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-50 w-[0%]">
                    {rating_review[1]?.sum}
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={3} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-zinc-200 relative">
                    <div
                      style={{
                        width: `${Math.floor(
                          (100 * (rating_review[2]?.sum || 0)) / totalReview
                        )}%`,
                      }}
                      className="h-full bg-yellow-500 w-[0%]"
                    ></div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-50 w-[0%]">
                    {rating_review[2]?.sum}
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={2} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-zinc-200 relative">
                    <div
                      style={{
                        width: `${Math.floor(
                          (100 * (rating_review[3]?.sum || 0)) / totalReview
                        )}%`,
                      }}
                      className="h-full bg-yellow-500 w-[0%]"
                    ></div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-50 w-[0%]">
                    {rating_review[3]?.sum}
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={1} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-zinc-200 relative">
                    <div
                      style={{
                        width: `${Math.floor(
                          (100 * (rating_review[4]?.sum || 0)) / totalReview
                        )}%`,
                      }}
                      className="h-full bg-yellow-500 w-[0%]"
                    ></div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-50 w-[0%]">
                    {rating_review[4]?.sum}
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={0} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-zinc-200 relative">
                    <div className="h-full bg-yellow-500 w-[0%]"></div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-50 w-[0%]">
                    0
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg md:text-3xl font-semibold">
              Product Reviews ({totalReview})
            </h2>
            <div className="flex flex-col gap-8 pt-4 pb-10">
              {reviews.map((r, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 text-xl">
                      <RatingTemp rating={r.rating} />
                    </div>
                    <span className="">{r.date}</span>
                  </div>
                  <span className=" text-md">{r.name}</span>
                  <p className=" text-sm">{r.review}</p>
                </div>
              ))}
            </div>
            {userInfo ? (
              <div className="flex flex-col gap-3">
                <h2 className="text-lg md:text-3xl font-semibold">
                  Submit your Review
                </h2>
                <form onSubmit={reviewSubmit}>
                  <div className="flex gap-1">
                    <RatingReact
                      onChange={(e) => setRat(e)}
                      value={rat}
                      initialRating={rat}
                      emptySymbol={
                        <span className="text-4xl">
                          <CiStar />
                        </span>
                      }
                      fullSymbol={
                        <span className="text-yellow-500 dark:text-yellow-300 text-4xl">
                          <FaStar />
                        </span>
                      }
                    />
                  </div>

                  <textarea
                    value={re}
                    onChange={(e) => setRe(e.target.value)}
                    className="border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors duration-300"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    placeholder="Tell about your thoughts, delivery experience or anything related to Product "
                  ></textarea>

                  <div className="mt-2 flex items-center justify-center">
                    <button
                      type="submit"
                      className="py-1 px-5 bg-blue-600 text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="py-1 px-5 bg-red-500 text-white rounded-lg"
                >
                  {" "}
                  Login First to submit review{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct, i) => (
                <Link to={`/product/details/${relatedProduct.slug}`} key={i}>
                  <div className="bg-white relative dark:bg-zinc-800 m-4 p-4">
                    {relatedProduct?.discount > 0 && (
                      <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs -left-4 -top-4">
                        {relatedProduct?.discount}%
                      </div>
                    )}
                    <div className="flex">
                      <img
                        className="w-full h-60 object-contain flex-shrink-0 cursor-pointer rounded-lg mb-4"
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                      />
                    </div>
                    <h3 className="text-sm font-semibold mb-2">
                      {relatedProduct?.name}
                    </h3>
                    <span className="flex">
                      <Rating ratings={relatedProduct?.rating} />
                    </span>
                    <div className="flex justify-start items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {relatedProduct?.discount > 0 ? (
                          <>
                            <span className="line-through text-zinc-500">
                              ₹{relatedProduct?.price}
                            </span>{" "}
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              ₹
                              {(
                                relatedProduct.price -
                                (relatedProduct.price *
                                  relatedProduct.discount) /
                                  100
                              ).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-black font-semibold dark:text-zinc-300">
                            ₹{relatedProduct?.price}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="custom_bullet flex justify-center gap-3 w-auto"></div>
            </div>
          </div>
        )}
        {moreProducts.length > 0 && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">More Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {moreProducts.map((relatedProduct, i) => (
                <Link to={`/product/details/${relatedProduct.slug}`} key={i}>
                  <div className="bg-white relative dark:bg-zinc-800 m-4 p-4">
                    {relatedProduct?.discount > 0 && (
                      <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs -left-4 -top-4">
                        {relatedProduct?.discount}%
                      </div>
                    )}
                    <div className="flex">
                      <img
                        className="w-full h-60 object-contain flex-shrink-0 cursor-pointer rounded-lg mb-4"
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                      />
                    </div>
                    <h3 className="text-sm font-semibold mb-2">
                      {relatedProduct?.name}
                    </h3>
                    <span className="flex">
                      <Rating ratings={relatedProduct?.rating} />
                    </span>
                    <div className="flex justify-start items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {relatedProduct?.discount > 0 ? (
                          <>
                            <span className="line-through text-zinc-500">
                              ₹{relatedProduct?.price}
                            </span>{" "}
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              ₹
                              {(
                                relatedProduct.price -
                                (relatedProduct.price *
                                  relatedProduct.discount) /
                                  100
                              ).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-black font-semibold dark:text-zinc-300">
                            ₹{relatedProduct?.price}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="w-full flex justify-center items-center ">
              <div className="custom_bullet flex justify-center gap-3 w-auto"></div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Details;
