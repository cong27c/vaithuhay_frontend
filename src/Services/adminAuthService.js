import adminHttpRequest from "@/utils/adminHttpRequest";

const login = async (data) => {
  const response = await adminHttpRequest.post("/auth/login", data);

  return response.data;
};
export { login };
