import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const send = async (method, url, data, config) => {
  try {
    const res = await httpRequest.request({
      method,
      url,
      data,
      config,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
  httpRequest.defaults.headers["Authorization"] = `Bearer ${token}`;
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
