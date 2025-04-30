import { createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "~/utils/httpRequest";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpRequest.get("/auth/me");
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Lỗi khi lấy thông tin người dùng"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await httpRequest.post("/auth/register", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkEmailExisted = createAsyncThunk(
  "auth/checkEmailExists",
  async (email, { rejectWithValue }) => {
    try {
      const response = await httpRequest.get("/auth/check-email", {
        params: { email },
      });
      return response.data.exists;
    } catch (error) {
      return rejectWithValue("Không kiểm tra được email");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await httpRequest.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi đăng nhập");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await httpRequest.post("/auth/logout");
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi đăng xuất");
    }
  }
);
