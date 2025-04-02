import * as httpRequest from "~/utils/httpRequest";

export const getCurrentUser = async () => {
  const response = await httpRequest.get("/auth/me");
  return response;
};

export const getUser = async (username) => {
  const response = await httpRequest.get(`/users/${username}`);
  return response;
};

export const checkDuplicate = async (endpoint) => {
  const response = await httpRequest.get(endpoint);
  return response.exists;
};

export const updateUser = async (username, data) => {
  const response = await httpRequest.put(`/users/${username}`, data);
  return response.data;
};

export const checkEmail = async (email) => {
  const response = await httpRequest.get("/auth/check-email", {
    params: {
      email,
    },
  });
  console.log("API Response:", response);
  return response.exists;
};

export const postUser = async (url, userData) => {
  try {
    const response = await httpRequest.post(url, userData);
    return response;
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
