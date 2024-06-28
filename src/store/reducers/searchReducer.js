import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const search_products = createAsyncThunk(
    "search/search_products",
    async (name, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await api.get(`/search/search-products?name=${name}`);
        return fulfillWithValue(data);
      } catch (error) {
        console.log(error.response?.data);
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const searchReducer = createSlice({
    name: "search",
    initialState: {
      successMessage: "",
      errorMessage: "",
      loader: false,
      products: [],
    },
    reducers: {
      messageClear: (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      },
    },
    extraReducers: (builder) => {
      builder 
        // search products
        .addCase(search_products.pending, (state) => {
          state.loader = true;
          state.errorMessage = "";
          state.successMessage = "";
        })
        .addCase(search_products.fulfilled, (state, action) => {
          state.loader = false;
          state.successMessage = action.payload.message;
          state.products = action.payload?.products;
       
        })
        .addCase(search_products.rejected, (state, action) => {
          state.loader = false;
          state.errorMessage = action.payload?.error;
        })
    },
  });
  
  export const { messageClear } = searchReducer.actions;
  export default searchReducer.reducer;