import * as httpRequest from "~/utils/httpRequest";

export const getCurrentUser = async () => {
  const response = await httpRequest.get("/auth.me");
  return response;
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
    const response = await httpRequest.post("/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    throw error.response?.data;
  }
};

export default {
  getCurrentUser,
  postUser,
  logoutUser,
};
