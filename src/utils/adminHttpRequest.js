// src/utils/adminHttpRequest.js

import adminAxios from "./adminAxios";

export const get = (url, config = {}) => adminAxios.get(url, config);
export const post = (url, data, config = {}) =>
  adminAxios.post(url, data, config);
export const put = (url, data, config = {}) =>
  adminAxios.put(url, data, config);
export const patch = (url, data, config = {}) =>
  adminAxios.patch(url, data, config);
export const del = (url, config = {}) => adminAxios.delete(url, config);

export default {
  get,
  post,
  put,
  patch,
  del,
};
