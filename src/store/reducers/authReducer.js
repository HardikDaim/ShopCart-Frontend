import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

// Thunks
export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/customer/customer-register`, info);
      localStorage.setItem("customerToken", data.token);
      await api.post(`/customer/registerMail`, info);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/customer/customer-login`, info);
      localStorage.setItem("customerToken", data.token);
      await api.post(`/customer/loginMail`, info);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const change_password = createAsyncThunk(
  "auth/change_password",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/change-password", info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo;
  } else {
    return null;
  }
};

const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Customer register
      .addCase(customer_register.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(customer_register.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload?.message;
        const userInfo = decodeToken(action.payload.token);
        state.userInfo = userInfo;
      })
      .addCase(customer_register.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Customer login
      .addCase(customer_login.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(customer_login.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        const userInfo = decodeToken(action.payload.token);
        state.userInfo = userInfo;
      })
      .addCase(customer_login.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // change customer password
      .addCase(change_password.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(change_password.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload?.message;
        state.userInfo = action.payload?.userInfo;
      })
      .addCase(change_password.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      });
  },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
