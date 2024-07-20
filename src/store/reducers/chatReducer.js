import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunks
export const add_customer_friend = createAsyncThunk(
  "chat/add_customer_friend",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/chat/customer/add-customer-friend`,
        info
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/chat/customer/send-message-to-seller`,
        info
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

const chatReducer = createSlice({
  name: "chat",
  initialState: {
    successMessage: "",
    errorMessage: "",
    MyFriends: [],
    currentFd: "",
    fd_messages: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, action) => {
      state.fd_messages = [...state.fd_messages, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_customer_friend.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(add_customer_friend.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.fd_messages = action.payload.messages;
        state.MyFriends = action.payload.MyFriends;
        state.currentFd = action.payload.currentFd;
      })
      .addCase(add_customer_friend.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Send message to seller
      .addCase(send_message.pending, (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(send_message.fulfilled, (state, action) => {
        state.successMessage = "Message Send Successfully";
        let tempFriends = state.MyFriends;
        let index = tempFriends.findIndex(f => f.fdId === action.payload?.message?.receiverId);
        while(index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.MyFriends = tempFriends;
        state.fd_messages = [...state.fd_messages, action.payload?.message]
      })
      .addCase(send_message.rejected, (state, action) => {
        // state.loader = false;
        state.errorMessage = action.payload?.error;
      })
  },
});

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
