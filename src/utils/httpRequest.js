import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const send = async (method, url, data = null, config = {}) => {
  try {
    const isPutOrPatch = ["put", "patch"].includes(method.toLowerCase());
    const effectiveMethod = isPutOrPatch ? "post" : method.toLowerCase();
    const effectivePath = isPutOrPatch
      ? `${url}${url.includes("?") ? "&" : "?"}_method=${method.toUpperCase()}`
      : url;

    const res = await httpRequest.request({
      method: effectiveMethod,
      url: effectivePath,
      data,
      headers: {
        ...config.headers,
        ...(isPutOrPatch && { "X-HTTP-Method-Override": method.toUpperCase() }), // Đảm bảo API nhận dạng đúng PUT/PATCH
      },
      ...config,
    });

    return res.data;
  } catch (error) {
    console.error("HTTP Request Error:", error.response || error);
    throw error; // Ném lỗi ra ngoài để có thể bắt lỗi và xử lý ở UI
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
