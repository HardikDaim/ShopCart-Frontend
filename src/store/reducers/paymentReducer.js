import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const generateQRCode = createAsyncThunk(
    "payment/generateQRCode",
    async ({ orderId, amount, upiId }, { rejectWithValue, fulfillWithValue }) => {
      try {
        const { data } = await api.post(`/generate-qr`, { orderId, amount, upiId });
        return fulfillWithValue(data);
      } catch (error) {
        console.log(error.response?.data);
        return rejectWithValue(error.response?.data);
      }
    }
  );
  
  export const handlePaymentCallback = createAsyncThunk(
    "payment/handlePaymentCallback",
    async ({ orderId, status }, { rejectWithValue, fulfillWithValue }) => {
      try {
        console.log(orderId, status);
        const { data } = await api.post(`/payment-callback`, { orderId, status });
        return fulfillWithValue(data);
      } catch (error) {
        console.log(error.response?.data);
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const paymentReducer = createSlice({
    name: "payment",
    initialState: {
      successMessage: "",
      errorMessage: "",
      loader: false,
      qrImage: null,
      paymentStatus: null,
    },
    reducers: {
      messageClear: (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      },
    },
    extraReducers: (builder) => {
      builder
        // QR Code Generation
        .addCase(generateQRCode.pending, (state) => {
          state.loader = true;
          state.errorMessage = "";
          state.successMessage = "";
        })
        .addCase(generateQRCode.fulfilled, (state, action) => {
          state.loader = false;
          state.qrImage = action.payload.qrImage;
        })
        .addCase(generateQRCode.rejected, (state, action) => {
          state.loader = false;
          state.errorMessage = action.payload?.error;
        })

        // Payment Callback
        .addCase(handlePaymentCallback.pending, (state) => {
          state.loader = true;
          state.errorMessage = "";
          state.successMessage = "";
        })
        .addCase(handlePaymentCallback.fulfilled, (state, action) => {
          state.loader = false;
          state.paymentStatus = action.payload.message;
          state.successMessage = action.payload.message;
        })
        .addCase(handlePaymentCallback.rejected, (state, action) => {
          state.loader = false;
          state.errorMessage = action.payload?.error || "Payment processing failed";
        });
    },
  });
  
  export const { messageClear } = paymentReducer.actions;
  export default paymentReducer.reducer;

