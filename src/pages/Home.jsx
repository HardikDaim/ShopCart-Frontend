import React, { useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categoires from "../components/Categories";
import FeatureProduct from "../components/products/FeatureProduct";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { get_product } from "../store/reducers/homeReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { products, latestProducts, topRatedProducts, discountProducts } =
    useSelector((state) => state.home);

  useEffect(() => {
    dispatch(get_product());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Header />
      <Banner />
      <Categoires />
      <FeatureProduct products={products} />
      <div className="flex flex-wrap mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-4 my-10">
          <div className="overflow-hidden">
            <Products title="Latest Products" products={latestProducts} />
          </div>
          <div className="overflow-hidden">
            <Products title="Top Rated Products" products={topRatedProducts} />
          </div>
          <div className="overflow-hidden">
            <Products title="Discount Products" products={discountProducts} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
