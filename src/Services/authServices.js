import * as httpRequest from "~/utils/httpRequest";

export const getCurrentUser = async () => {
  const response = await httpRequest.get("/auth/me");
  return response.data;
};

export const getUser = async (username) => {
  const response = await httpRequest.get(`/users/${username}`);
  return response.data;
};

export const checkDuplicate = async (endpoint) => {
  const response = await httpRequest.get(endpoint);
  return response.exists;
};

export const updateUser = async (data) => {
  const response = await httpRequest.put(`/users/me`, data);
  return response.data;
};

export const updateImage = async (data) => {
  const response = await httpRequest.put(`/users/me`, data);
  console.log(response);
  return response.data;
};

export const checkEmail = async (email) => {
  const response = await httpRequest.get("/auth/check-email", {
    params: {
      email,
    },
  });
  console.log("API Response:", response);
  return response.data?.exists;
};

export const postUser = async (url, userData) => {
  try {
    const response = await httpRequest.post(url, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await httpRequest.post("/auth/logout");
    httpRequest.setToken(null);
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

export default {
  getCurrentUser,
  postUser,
  logoutUser,
  checkEmail,
  getUser,
  updateUser,
  checkDuplicate,
};
