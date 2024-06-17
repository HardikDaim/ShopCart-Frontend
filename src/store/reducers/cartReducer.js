import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

// Thunks
export const add_to_cart = createAsyncThunk(
  "cart/add_to_cart",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/home/product/add-to-cart`, info);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_cart_products = createAsyncThunk(
  "cart/get_cart_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/get-cart-products/${userId}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    loader: false,
    successMessage: "",
    errorMessage: "",
    cart_products: [],
    cart_product_count: 0,
    wishlist: [],
    wishlist_count: 0,
    price: 0,
    shipping_fee: 0,
    outofstock_products: [],
    buy_product_item: 0
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // add to cart
      .addCase(add_to_cart.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(add_to_cart.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.cart_product_count = state.cart_product_count + 1;
      })
      .addCase(add_to_cart.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get cart products
      .addCase(get_cart_products.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_cart_products.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.cart_products = action.payload?.cart_products;
        state.price = action.payload?.price;
        state.cart_product_count = action.payload?.cart_product_count;
        state.shipping_fee = action.payload?.shipping_fee;
        state.outofstock_products = action.payload?.outOfStockProducts;
        state.buy_product_item = action.payload?.buy_product_item;
      })
      .addCase(get_cart_products.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
  },
});

export const { messageClear } = cartReducer.actions;
export default cartReducer.reducer;
