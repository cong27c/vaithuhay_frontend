import * as httpRequest from "@/utils/httpRequest";

const login = async (data) => {
  const response = await httpRequest.post("/api/v1/auth/login", data);

  return response;
};
export { login };
