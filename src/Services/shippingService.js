import * as httpRequest from "@/utils/httpRequest";

export const calculateShipping = async (data) => {
  try {
    const response = await httpRequest.post("/shipping/calculate", data);
    return response.data;
  } catch (error) {
    console.error("Calculate shipping error:", error);
    throw error;
  }
};

export const getMethods = async () => {
  try {
    const response = await httpRequest.get("/shipping/methods");
    return response.data;
  } catch (error) {
    console.error("Get shipping methods error:", error);
    throw error;
  }
};
