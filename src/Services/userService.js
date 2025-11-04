import adminHttpRequest from "@/utils/adminHttpRequest";

// Lấy danh sách user
export const getAllUsers = async () => {
  const response = await adminHttpRequest.get("/users");
  return response.data;
};

// Lấy chi tiết user theo ID
export const getUserById = async (id) => {
  const response = await adminHttpRequest.get(`/users/${id}`);
  return response.data;
};

// Tạo mới user
export const createUser = async (data) => {
  const response = await adminHttpRequest.post("/users", data);
  return response.data;
};

// Cập nhật user
export const updateUser = async (id, data) => {
  const response = await adminHttpRequest.put(`/users/${id}`, data);
  return response.data;
};

// Xóa user
export const deleteUser = async (id) => {
  const response = await adminHttpRequest.del(`/users/${id}`);
  return response.data;
};
