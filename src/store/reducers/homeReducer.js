import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunks
export const get_category = createAsyncThunk(
  "home/get_category",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-categories`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_product = createAsyncThunk(
  "home/get_product",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-products`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const price_range_product = createAsyncThunk(
  "home/price_range_product",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/price-range-latest-product`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const query_products = createAsyncThunk(
  "home/query_products",
  async (query, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&selectedOption=${query.selectedOption.value}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

const homeReducer = createSlice({
  name: "home",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categories: [],
    products: [],
    latestProducts: [],
    topRatedProducts: [],
    discountProducts: [],
    priceRange: { low: 0, high: 50 },
    totalProducts: 0,
    perPage: 3,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Home Category
      .addCase(get_category.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_category.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.categories = action.payload?.categories;
      })
      .addCase(get_category.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Get Home products
      .addCase(get_product.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_product.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.products = action.payload?.products;
        state.latestProducts = action.payload?.latestProducts;
        state.topRatedProducts = action.payload?.topRatedProducts;
        state.discountProducts = action.payload?.discountProducts;
      })
      .addCase(get_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Get Price Range products
      .addCase(price_range_product.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(price_range_product.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.latestProducts = action.payload?.latestProducts;
        state.priceRange = action.payload?.priceRange;
      })
      .addCase(price_range_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Query Products
      .addCase(query_products.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(query_products.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.products = action.payload?.products;
        state.totalProducts = action.payload?.totalProducts;
        state.perPage = action.payload?.perPage;
      })
      .addCase(query_products.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      });
  },
});

export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;
