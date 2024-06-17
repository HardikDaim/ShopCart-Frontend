import React, { useEffect } from "react";
import Rating from "../Rating";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { add_to_cart, messageClear } from "../../store/reducers/cartReducer";
import { toast } from 'react-hot-toast';

const FeatureProduct = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { successMessage, errorMessage } = useSelector(state => state.cart);

  const add_cart = (id) => {
    if(userInfo){
      dispatch(add_to_cart({ userId: userInfo.id, quantity: 1, productId: id}))

    } else {
      toast("Login to buy Products");
      navigate("/login");
    }
  }

  useEffect(() => {
    if(successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if(errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, messageClear,dispatch])

  return (
    <>
      <div className="w-[85%] flex flex-wrap mx-auto pt-10">
        <div className="w-full">
          <div className="flex font-bold relative justify-center items-center flex-col text-4xl text-center text-slate-700 dark:text-slate-300">
            <h2>Featured Products</h2>
            <div className="w-[100px] h-[8px] bg-blue-600 my-5 rounded-lg"></div>
          </div>
        </div>
      </div>
      <div
        className="w-full overflow-x-auto pl-4 py-4 hide-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex space-x-12">
          {products.map((product, index) => {
            const discountedPrice =
              product.price - (product.price * product.discount) / 100;

            return (
              <div
                key={index}
                className="relative mt-4 w-60 flex-shrink-0 transition-all duration-500 hover:transform hover:scale-110 cursor-pointer group"
              >
                {product.discount > 0 && (
                  <div className="flex justify-center z-10 items-center absolute text-white w-[38px] h-[38px] p-2 rounded-full bg-red-500 font-semibold text-xs -left-4 -top-4">
                    {product.discount}%
                  </div>
                )}
                <div className="relative">
                  <Link to={`/product/details/${product.slug}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-40 rounded-lg"
                    />
                  </Link>
                  <ul className="flex transition-all duration-700 -bottom-12 justify-center items-center gap-2 absolute w-full opacity-0 group-hover:bottom-3 group-hover:opacity-100">
                    <li className="w-10 h-10 md:w-12 md:h-12  cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:rotate-180">
                      <FaRegHeart />
                    </li>
                    <li className="w-10 h-10 md:w-12 md:h-12  cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:rotate-180">
                      <FaEye />
                    </li>
                    <li onClick={() => add_cart(product._id)} className="w-10 h-10 md:w-12 md:h-12  cursor-pointer bg-white dark:bg-slate-800 flex justify-center items-center rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:rotate-180">
                      <RiShoppingCartLine />
                    </li>
                  </ul>
                </div>

                <div className="my-2 text-slate-700 dark:text-slate-300">
                  <h2 className="font-bold">{product.name}</h2>
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
