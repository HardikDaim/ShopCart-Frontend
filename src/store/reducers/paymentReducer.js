import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const generateQRCode = createAsyncThunk(
  "payment/generateQRCode",
  async ({ orderId, amount, upiId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/payment/generate-qr`, {
        orderId,
        amount,
        upiId,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const checkPaymentStatus = createAsyncThunk(
  "payment/checkPaymentStatus",
  async ({ orderId, navigate }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/payment/status/${orderId}`);
  
      if (data.status === "paid") {
        navigate("/success");
      } else if (data.status === "failed") {
        navigate("/failed");
      }
      
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

      .addCase(checkPaymentStatus.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(checkPaymentStatus.fulfilled, (state, action) => {
        state.loader = false;
        state.paymentStatus = action.payload.message;
        state.successMessage = action.payload.message;
      })
      .addCase(checkPaymentStatus.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage =
          action.payload?.error || "Payment processing failed";
      });
  },
});

export const { messageClear } = paymentReducer.actions;
export default paymentReducer.reducer;
