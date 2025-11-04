// src/utils/adminAxios.js
import axios from "axios";

// 🔥 INSTANCE REFRESH TOKEN (chỉ dùng để gọi /auth/refresh)
const refreshAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/v1",
  withCredentials: true, // quan trọng để gửi cookie HttpOnly
});

// 🔥 INSTANCE CHÍNH CHO TẤT CẢ REQUEST
const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/v1",
  withCredentials: true,
});

// Thêm access token vào mọi request
adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue = [];

// Hàm xử lý queue request khi refresh token xong
const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

// Response interceptor
adminAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu không có config hoặc là refresh token request thì bỏ qua
    if (
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      console.log("🔄 401 detected, attempting token refresh...");

      if (isRefreshing) {
        // Nếu đang refresh, thêm request vào queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return adminAxios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gọi refresh token
        const res = await refreshAxios.post("/auth/refresh", {});
        const { access_token } = res.data;

        localStorage.setItem("admin_access_token", access_token);
        adminAxios.defaults.headers.Authorization = `Bearer ${access_token}`;

        processQueue(null, access_token);

        // Retry request gốc
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return adminAxios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("admin_access_token");
        console.log("❌ Refresh token failed:", refreshError);
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default adminAxios;
