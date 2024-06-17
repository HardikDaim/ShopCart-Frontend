import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import RatingReact from "react-rating";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Details = () => {
  const userInfo = {};

  const [rat, setRat] = useState("");
  const [re, setRe] = useState("");

  const product = {
    id: 1,
    name: "Product Name",
    price: 99.99,
    description:
      "Crafted from genuine leather, our premium backpack combines timeless style with modern functionality. It features multiple compartments for organizing your essentials, padded straps for comfort, and a sleek design suitable for both business and casual use. Whether you're heading to the office or exploring the city, this backpack is your perfect companion.",
    images: [
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/400",
    ],
    discount: 10,
    stock: 3,
    reviews: [
      {
        id: 1,
        name: "John Doe",
        rating: 4,
        comment: "Great product, highly recommend!",
      },
      {
        id: 2,
        name: "Jane Smith",
        rating: 5,
        comment: "Exceeded my expectations!",
      },
    ],
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Stylish Leather Wallet",
      price: 49.99,
      image: "https://via.placeholder.com/400",
    },
    {
      id: 3,
      name: "Elegant Wrist Watch",
      price: 149.99,
      image: "https://via.placeholder.com/400",
    },
    {
      id: 4,
      name: "Casual Sneakers",
      price: 89.99,
      image: "https://via.placeholder.com/400",
    },
    {
      id: 5,
      name: "Formal Leather Shoes",
      price: 129.99,
      image: "https://via.placeholder.com/400",
    },
    {
      id: 6,
      name: "Travel Backpack",
      price: 79.99,
      image: "https://via.placeholder.com/400",
    },
    {
      id: 7,
      name: "Wireless Headphones",
      price: 199.99,
      image: "https://via.placeholder.com/400",
    },
    {
      id: 8,
      name: "Smartphone Case",
      price: 19.99,
      image: "https://via.placeholder.com/400",
    },
  ];

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

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <div className="mx-auto  px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-[500px] rounded-lg shadow-lg object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-4 bg-slate-800 hover:bg-slate-700 hover:bg-opacity-50 bg-opacity-50 text-white p-2 rounded-full shadow-lg focus:outline-none"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-4 bg-slate-800 hover:bg-slate-700 hover:bg-opacity-50 bg-opacity-50 text-white p-2 rounded-full shadow-lg focus:outline-none"
                  >
                    &gt;
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex mt-4 space-x-2 justify-center lg:justify-start">
                {product.images.map((image, index) => (
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
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <button className="text-2xl font-bold">
                <IoShareSocialOutline />
              </button>
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="text-xl flex">
                <Rating ratings={4.5} />
              </div>
              <span className="hover:underline cursor-pointer">
                ({product.reviews.length} reviews)
              </span>
            </div>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              {product.discount !== 0 ? (
                <>
                  <span className="line-through text-slate-500">
                    ₹{product.price.toFixed(2)}
                  </span>{" "}
                  <span>
                    ₹{discountedPrice.toFixed(2)} (-{product.discount}%)
                  </span>
                </>
              ) : (
                <>₹{product.price.toFixed(2)}</>
              )}
            </p>
            <p className="text-lg">{product.description}</p>
            {product.stock > 0 ? (
              <div className="mt-2 flex items-center space-x-3">
                <button className="py-2 px-3 text-xl text-green-600 dark:text-green-400 bg-slate-300 dark:bg-slate-700 rounded-xl">
                  In Stock
                </button>
                <button className="px-2 py-0 text-[28px] bg-slate-300 dark:bg-slate-700 rounded-xl text-slate-800 dark:text-slate-200">
                  -
                </button>
                <span>1</span>
                <button className="px-2 py-0 text-[28px] bg-slate-300 dark:bg-slate-700 rounded-xl text-slate-800 dark:text-slate-200">
                  +
                </button>
                <button className="py-2 px-3 text-[28px] bg-slate-300 dark:bg-slate-700 rounded-xl">
                  <FaHeart />
                </button>
              </div>
            ) : (
              <div className="mt-2 flex items-center space-x-3">
                <button className="py-2 px-3 text-xl text-red-600 dark:text-red-400 bg-slate-300 dark:bg-slate-700 rounded-xl">
                  Out of Stock
                </button>

                <button className="py-2 px-3 text-[28px] bg-slate-300 dark:bg-slate-700 rounded-xl">
                  <FaHeart />
                </button>
              </div>
            )}
            {product.stock <= 10 && product.stock > 0 ? (
              <p className="text-red-600 dark:text-red-400">
                Hurry up, only {product.stock} piece(s) left
              </p>
            ) : (
              ""
            )}
            <div className="flex flex-col space-y-4">
              <button className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500">
                Add to Cart
              </button>
              <button className="py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg space-y-4 mt-8">
          <h2 className="text-2xl font-semibold">Details & Specifications</h2>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg space-y-4 mt-8">
          <h2 className="text-2xl font-semibold">Customer's Ratings</h2>
          <div className="mt-8">
            <div className="flex flex-col md:flex-row md:justify-between gap-10 md-lg:flex-col">
              <div className="flex flex-col gap-2 justify-start items-center md:items-start py-4">
                <div>
                  <span className="text-6xl font-semibold">4.5</span>
                  <span className="text-3xl font-semibold text-slate-600 dark:text-slate-50 ">
                    /5
                  </span>
                </div>
                <div className="flex text-3xl ">
                  <Rating ratings={4.5} />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-50 ">
                  15 Reviews
                </p>
              </div>

              <div className="flex gap-2 flex-col py-4">
                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={5} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-slate-200 relative">
                    <div className="h-full bg-yellow-500 dark:bg-yellow-300w-[60%]"></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-50 w-[0%]">
                    10
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={4} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-slate-200 relative">
                    <div className="h-full bg-yellow-500 dark:bg-yellow-300w-[70%]"></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-50 w-[0%]">
                    20
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={3} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-slate-200 relative">
                    <div className="h-full bg-yellow-500 dark:bg-yellow-300w-[40%]"></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-50 w-[0%]">
                    8
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={2} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-slate-200 relative">
                    <div className="h-full bg-yellow-500 dark:bg-yellow-300w-[30%]"></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-50 w-[0%]">
                    5
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={1} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-slate-200 relative">
                    <div className="h-full bg-yellow-500 dark:bg-yellow-300w-[10%]"></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-50 w-[0%]">
                    3
                  </p>
                </div>

                <div className="flex justify-start items-center gap-5">
                  <div className="text-md flex gap-1 w-[93px]">
                    <RatingTemp rating={0} />
                  </div>
                  <div className="w-[200px] h-[14px] bg-slate-200 relative">
                    <div className="h-full bg-yellow-500 dark:bg-yellow-300w-[0%]"></div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-50 w-[0%]">
                    0
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg md:text-3xl font-semibold">
              Product Reviews (20)
            </h2>
            <div className="flex flex-col gap-8 pt-4 pb-10">
              {[1, 2, 3, 4, 5].map((r, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 text-xl">
                      <RatingTemp rating={4} />
                    </div>
                    <span className="">8 Jan 2024</span>
                  </div>
                  <span className=" text-md">Hardik Dain</span>
                  <p className=" text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </p>
                </div>
              ))}
            </div>
            {userInfo ? (
              <div className="flex flex-col gap-3">
                <h2 className="text-lg md:text-3xl font-semibold">
                  Submit your Review
                </h2>
                <div className="flex gap-1">
                  <RatingReact
                    onChange={(e) => setRat(e)}
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
                <form>
                  <textarea
                    required
                    className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors duration-300"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    placeholder="Tell about your thoughts, delivery experience or anything related to Product "
                  ></textarea>

                  <div className="mt-2 flex items-center justify-center">
                    <button className="py-1 px-5 bg-blue-600 text-white rounded-lg">
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
                  Login First{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg space-y-4 mt-8">
          <h2 className="text-2xl font-semibold">Related Products</h2>
          <div>
            <Swiper
              spaceBetween={25}
              slidesPerView="auto"
              breakpoints={{
                1280: { slidesPerView: 3 },
                565: { slidesPerView: 2 },
              }}
              loop={true}
              pagination={{ clickable: true, el: ".custom_bullet" }}
              modules={[Pagination]}
              className="mySwipper"
            >
              {relatedProducts.map((relatedProduct) => (
                <SwiperSlide key={relatedProduct.id}>
                  <div className="bg-white relative dark:bg-slate-700 m-4 p-4 rounded-lg shadow-md">
                    <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs -left-4 -top-4">
                      8%
                    </div>
                    <img
                      className="w-full h-96 object-cover cursor-pointer rounded-lg mb-4"
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                    />
                    <h3 className="text-lg font-semibold mb-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex justify-start items-center gap-2">
                      <span className="text-md font-semibold text-blue-600 dark:text-blue-400">
                        {relatedProduct.price}
                      </span>
                      <span className="flex ">
                        <Rating ratings={4.5} />
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="w-full flex justify-center items-center py-8">
            <div className="custom_bullet flex justify-center gap-3 w-auto"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;
