import { createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "@/utils/httpRequest";
import { authMe, login, logout, register } from "@/Services/authServices";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authMe();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Lỗi khi lấy thông tin người dùng",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await register(payload);
      console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const checkEmailExisted = createAsyncThunk(
  "auth/checkEmailExists",
  async (email, { rejectWithValue }) => {
    try {
      const response = await httpRequest.get("/auth/check-email", {
        params: { email },
      });
      console.log(response);

      return response.data.exists;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Không kiểm tra được email");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi đăng nhập");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      return true;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Lỗi khi đăng xuất");
    }
  },
);
