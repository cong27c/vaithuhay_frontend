import adminHttpRequest from "@/utils/adminHttpRequest";

const login = async (data) => {
  const response = await adminHttpRequest.post("/auth/login", data);

  return response.data;
};

const logoutAdmin = async () => {
  const response = await adminHttpRequest.post("/auth/logout");

  return response.data;
};
export { login, logoutAdmin };
