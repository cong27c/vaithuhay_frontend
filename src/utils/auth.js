// src/utils/auth.js
import axiosInstance from "@/utils/axiosInstance";

export const setToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("access_token", token);
  }
};

export const clearTokens = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
  localStorage.removeItem("access_token");
};

export const getToken = () => localStorage.getItem("accessToken");
