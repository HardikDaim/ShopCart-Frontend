import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from 'jwt-decode';

// Thunks
export const get_dashboard_data = createAsyncThunk(
  "dashboard/get_dashboard_data",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-dashboard-data/${customerId}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    recentOrders: [],
    totalOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // get dashboard data
      .addCase(get_dashboard_data.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_dashboard_data.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.recentOrders = action.payload.recentOrders;
        state.totalOrders = action.payload.totalOrders;
        state.pendingOrders = action.payload.pendingOrders;
        state.cancelledOrders = action.payload.cancelledOrders;
      })
      .addCase(get_dashboard_data.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      
  },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
