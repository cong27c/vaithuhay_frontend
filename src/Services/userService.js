import * as httpRequest from "@/utils/httpRequest";

// Lấy danh sách user
export const getAllUsers = async () => {
  const response = await httpRequest.get("/api/v1/users");
  return response.data;
};

// Lấy chi tiết user theo ID
export const getUserById = async (id) => {
  const response = await httpRequest.get(`/api/v1/users/${id}`);
  return response.data;
};

// Tạo mới user
export const createUser = async (data) => {
  const response = await httpRequest.post("/api/v1/users", data);
  return response.data;
};

// Cập nhật user
export const updateUser = async (id, data) => {
  const response = await httpRequest.put(`/api/v1/users/${id}`, data);
  return response.data;
};

// Xóa user
export const deleteUser = async (id) => {
  const response = await httpRequest.del(`/api/v1/users/${id}`);
  return response.data;
};
