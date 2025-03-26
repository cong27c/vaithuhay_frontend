import httpRequest from "~/utils/httpRequest";

export const getCurrentUser = async () => {
  const response = await httpRequest.get("/auth.me");
  return response;
};

export default {
  getCurrentUser,
};
