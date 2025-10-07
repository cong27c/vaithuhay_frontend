import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./authAsync";
import { setToken, clearTokens } from "@/utils/auth";

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
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // REGISTER (chỉ lưu trạng thái, chưa có token)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.registerMessage =
          action.payload?.message ||
          "Registered successfully, please verify email";
        state.error = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || "Register failed";
      })

      // GET CURRENT USER
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Get current user failed";
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.currentUser = null;
        clearTokens();
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
