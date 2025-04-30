import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./authAsync";
import { setToken, clearTokens } from "~/utils/httpRequest";

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
      clearTokens();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const {
          access_token: token,
          refresh_token: refreshToken,
          currentUser,
        } = action.payload;
        setToken(token, refreshToken);
        state.token = token;
        state.currentUser = currentUser;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { access_token: token, refresh_token: refreshToken } =
          action.payload;
        setToken(token, refreshToken);
        state.status = "succeeded";
        state.token = token;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.currentUser = null;
        clearTokens();
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
