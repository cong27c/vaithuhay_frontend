import * as httpRequest from "@/utils/httpRequest";

const getCurrentUser = async () => {
  const response = await httpRequest.get("/auth/me");
  return response.data;
};

const getUser = async (username) => {
  const response = await httpRequest.get(`/users/${username}`);
  return response.data;
};

const checkDuplicate = async (endpoint) => {
  const response = await httpRequest.get(endpoint);
  return response.exists;
};

const updateUser = async (data) => {
  const response = await httpRequest.put(`/users/me`, data);
  return response.data;
};

const updateImage = async (data) => {
  const response = await httpRequest.put(`/users/me`, data);
  console.log(response);
  return response.data;
};

const checkEmail = async (email) => {
  const response = await httpRequest.get("/auth/check-email", {
    params: {
      email,
    },
  });
  console.log("API Response:", response);
  return response.data?.exists;
};

const postUser = async (url, userData) => {
  try {
    const response = await httpRequest.post(url, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

const register = async (data) => {
  const response = await httpRequest.post("/auth/register", data);

  return response;
};

const login = async (data) => {
  const response = await httpRequest.post("/auth/login", data, {
    withCredentials: true,
  });

  return response;
};

const logout = async () => {
  try {
    const response = await httpRequest.post("/auth/logout");

    return response;
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (data) => {
  try {
    const response = await httpRequest.post("/auth/reset-password", data);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (data) => {
  try {
    const response = await httpRequest.post("/auth/forgot-password", data);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const verify = async (token) => {
  try {
    const response = await httpRequest.get(`/auth/verify?token=${token}`);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

const authMe = async () => {
  try {
    const response = await httpRequest.get(`/auth/me`);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export {
  updateImage,
  verify,
  register,
  forgotPassword,
  resetPassword,
  logout,
  authMe,
  login,
  getCurrentUser,
  postUser,
  checkEmail,
  getUser,
  updateUser,
  checkDuplicate,
};
