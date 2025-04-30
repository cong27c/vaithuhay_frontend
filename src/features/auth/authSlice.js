import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./authAsync";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutSuccess: (state) => {
      state.token = null;
      state.currentUser = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const token = action.payload.access_token;
        const user = action.payload.currentUser;
        console.log(token);
        state.token = token;
        state.currentUser = user;
        localStorage.setItem("token", token);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const token = action.payload.access_token;
        state.status = "succeeded";
        state.token = token;
        localStorage.setItem("token", token);
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.currentUser = null;
        localStorage.removeItem("token");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
