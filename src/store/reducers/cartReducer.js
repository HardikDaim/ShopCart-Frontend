import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

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

export const add_to_wishlist = createAsyncThunk(
  "cart/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/home/product/add-to-wishlist`, info);
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
      const { data } = await api.get(
        `/home/product/get-cart-products/${userId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_wishlist_products = createAsyncThunk(
  "cart/get_wishlist_products",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/get-wishlist-products/${userId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const delete_cart_product = createAsyncThunk(
  "cart/delete_cart_product",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-cart-product/${cartId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);


export const remove_wishlist = createAsyncThunk(
  "cart/remove_wishlist",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/remove-wishlist-product/${wishlistId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const quantity_inc = createAsyncThunk(
  "cart/quantity_inc",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-inc/${cartId}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const quantity_dec = createAsyncThunk(
  "cart/quantity_dec",
  async (cartId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-dec/${cartId}`);
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
    buy_product_item: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    reset_count: (state,_) => {
      state.cart_product_count = 0;
      state.wishlist_count = 0;
    }
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
      // delete cart product
      .addCase(delete_cart_product.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(delete_cart_product.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(delete_cart_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // quantity_inc
      .addCase(quantity_inc.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(quantity_inc.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(quantity_inc.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // quantity_dec
      .addCase(quantity_dec.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(quantity_dec.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(quantity_dec.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // add to wishlist
      .addCase(add_to_wishlist.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(add_to_wishlist.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.wishlist_count =
          state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
      })
      .addCase(add_to_wishlist.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get wishlists
      .addCase(get_wishlist_products.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_wishlist_products.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.wishlist = action.payload?.wishlists;
        state.wishlist_count = action.payload?.wishlist_count;
        
      })
      .addCase(get_wishlist_products.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // remove wishlist
      .addCase(remove_wishlist.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(remove_wishlist.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.wishlist = state.wishlist.filter(p => p._id !== action.payload?.wishlistId)
        state.wishlist_count = state.wishlist_count - 1;
      })
      .addCase(remove_wishlist.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
  },
});

export const { messageClear, reset_count } = cartReducer.actions;
export default cartReducer.reducer;
