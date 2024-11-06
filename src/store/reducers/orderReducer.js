import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunks
export const place_order = createAsyncThunk(
  "order/place_order",
  async (
    {
      price,
      products,
      shipping_fee,
      items,
      shippingInfo,
      customerId,
      sellerId,
      navigate,
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post(`/home/order/place-order`, {
        price,
        products,
        shipping_fee,
        items,
        shippingInfo,
        customerId,
        sellerId,
        navigate,
      });
      navigate("/payment", {
        state: {
          products,
          shippingInfo,
          customerId,
          sellerId,
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        },
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-orders/${customerId}/${status}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_order_details = createAsyncThunk(
  "order/get_order_details",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-order-details/${orderId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

const orderReducer = createSlice({
  name: "order",
  initialState: {
    loader: false,
    successMessage: "",
    errorMessage: "",
    myOrders: [],
    orderDetails: {},
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // place order
      .addCase(place_order.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(place_order.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(place_order.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get orders
      .addCase(get_orders.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_orders.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.myOrders = action.payload.orders;
      })
      .addCase(get_orders.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get order details
      .addCase(get_order_details.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_order_details.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.orderDetails = action.payload?.order;
      })
      .addCase(get_order_details.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      });
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
