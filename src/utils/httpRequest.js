import axios from "axios";

let isRefreshing = false;
let tokenListeners = [];

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

httpRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = localStorage.getItem("refresh_token");
    const shouldRenewToken = error.response?.status === 401 && refreshToken;

    if (shouldRenewToken) {
      console.log("🛠 Token hết hạn. Đang thử làm mới...");
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
            {
              refresh_token: refreshToken,
            }
          );
          const data = res.data.data;
          console.log("✅ Refresh thành công:", data);

          localStorage.setItem("token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);

          tokenListeners.forEach((listener) => listener());
          tokenListeners = [];

          isRefreshing = false;

          return httpRequest(error.config);
        } catch (error) {
          console.log("❌ Refresh thất bại:", error);
          isRefreshing = false;

          tokenListeners = [];

          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
        }
      } else {
        console.log("⏳ Đang chờ refresh khác hoàn thành...");
        return new Promise((resolve) => {
          tokenListeners.push(() => {
            resolve(httpRequest(error.config));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

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

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    httpRequest.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete httpRequest.defaults.headers["Authorization"];
  }
};

export const get = (url, config) => {
  return send("get", url, null, config);
};

export const post = (url, data, config) => {
  return send("post", url, data, config);
};

export const put = (url, data, config) => {
  return send("put", url, data, config);
};

export const patch = (url, data, config) => {
  return send("patch", url, data, config);
};

export const del = (url, config) => {
  return send("delete", url, null, config);
};

export default {
  get,
  post,
  put,
  patch,
  del,
  setToken,
};
