import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const setToken = (token, refreshToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refresh_token", refreshToken);
  httpRequest.defaults.headers.Authorization = `Bearer ${token}`;
};

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  delete httpRequest.defaults.headers.Authorization;
};

const send = async (method, url, data, config) => {
  try {
    const isPutOrPatch = ["put", "patch"].includes(method.toLowerCase());
    const effectiveMethod = isPutOrPatch ? "post" : method;
    const effectivePath = isPutOrPatch
      ? `${url}${url.includes("?") ? "&" : "?"}_method=${method}`
      : url;

    const res = await httpRequest.request({
      method: effectiveMethod,
      url: effectivePath,
      data,
      ...config,
    });

    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "An error occurred";
  }
};

httpRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refresh_token");
    const shouldRenewToken = error.response?.status === 401 && refreshToken;

    if (!shouldRenewToken) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        failedQueue.push(() => resolve(httpRequest(originalRequest)));
      });
    }

    isRefreshing = true;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
        { refresh_token: refreshToken }
      );

      const data = res.data.data;
      setToken(data.access_token, data.refresh_token);

      failedQueue.forEach((callback) => callback());
      return httpRequest(originalRequest);
    } catch (err) {
      clearTokens();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
      failedQueue = [];
    }
  }
);

export const get = (url, config) => send("get", url, null, config);
export const post = (url, data, config) => send("post", url, data, config);
export const put = (url, data, config) => send("put", url, data, config);
export const patch = (url, data, config) => send("patch", url, data, config);
export const del = (url, config) => send("delete", url, null, config);

export default {
  get,
  post,
  put,
  patch,
  del,
  setToken,
  clearTokens,
};
