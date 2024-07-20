import React, { useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categoires from "../components/Categories";
import FeatureProduct from "../components/products/FeatureProduct";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { get_product, messageClear } from "../store/reducers/homeReducer";
import toast from "react-hot-toast";

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
      <Header />
      <Banner loader={loader} />
      <Categoires categories={categories} loader={loader}/>
      <FeatureProduct products={products} loader={loader} />
      <div className="flex flex-wrap mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-4 my-10">
          <div className="overflow-hidden">
            <Products title="Latest Products" products={latestProducts} loader={loader} />
          </div>
          <div className="overflow-hidden">
            <Products title="Top Rated Products" products={topRatedProducts} loader={loader} />
          </div>
          <div className="overflow-hidden">
            <Products title="Discount Products" products={discountProducts} loader={loader} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
