import React, { useEffect, lazy } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categoires from "../components/Categories";
import FeatureProduct from "../components/products/FeatureProduct";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { get_product, messageClear } from "../store/reducers/homeReducer";
import toast from "react-hot-toast";
import BecomeSeller from "../components/BecomeSeller";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Products = lazy(() => import("../components/products/Products"));

const Home = () => {
  const dispatch = useDispatch();
  const {
    loader,
    errorMessage,
    successMessage,
    products,
    latestProducts,
    topRatedProducts,
    discountProducts,
    categories,
  } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(get_product());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      dispatch(messageClear());
    }
  }, [dispatch, errorMessage, successMessage]);

  return (
    <div className="w-full">
      <BecomeSeller />
      <Header />
      <Banner loader={loader} />
      <Categoires categories={categories} loader={loader} />
      <FeatureProduct products={products} loader={loader} />
      <div className="w-[85%] flex flex-wrap mx-auto pt-5 md:pt-0">
        <div className="w-full">
          <div className="flex mb-6  font-bold relative justify-center items-center flex-col text-2xl md:text-4xl text-center text-slate-700 dark:text-slate-300">
            <h2>{loader ? <Skeleton width={150} /> : "Top Picks for You!"}</h2>
            <div className="w-[60px] h-[4px] md:w-[100px] md:h-[8px] bg-blue-600 my-2 md:my-5 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-4 mt-0 mb-10 ">
          <div className="overflow-hidden">
            <Products
              title="Latest Products"
              products={latestProducts}
              loader={loader}
            />
          </div>
          <div className="overflow-hidden">
            <Products
              title="Top Rated Products"
              products={topRatedProducts}
              loader={loader}
            />
          </div>
          <div className="overflow-hidden">
            <Products
              title="Discount Products"
              products={discountProducts}
              loader={loader}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
