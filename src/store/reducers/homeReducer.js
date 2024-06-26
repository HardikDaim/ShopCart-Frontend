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

export const product_details = createAsyncThunk(
  "home/product_details",
  async (slug, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/details/${slug}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const customer_review = createAsyncThunk(
  "home/customer_review",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/home/customer/submit-review`,info);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_reviews = createAsyncThunk(
  "home/get_reviews",
  async ({productId}, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-reviews/${productId}`);
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
    product: {},
    relatedProducts: [],
    moreProducts: [],
    totalReview: 0,
    rating_review: [],
    reviews: [],
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
      })
      // Product details
      .addCase(product_details.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(product_details.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.product = action.payload?.product;
        state.relatedProducts = action.payload?.relatedProducts;
        state.moreProducts = action.payload?.moreProducts;
      })
      .addCase(product_details.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // customer review
      .addCase(customer_review.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(customer_review.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
     
      })
      .addCase(customer_review.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get reviews
      .addCase(get_reviews.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_reviews.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.reviews = action.payload.reviews;
        state.totalReview = action.payload.totalReview;
        state.rating_review = action.payload.rating_review;
      })
      .addCase(get_reviews.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      });
  },
});

export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;
