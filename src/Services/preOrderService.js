import * as httpRequest from "@/utils/httpRequest";

const getUpcomingCampaigns = async () => {
  const response = await httpRequest.get("/preorder/upcoming");
  return response.data;
};

const getPreOrderCampaigns = async () => {
  const response = await httpRequest.get("/preorder/preorderCampaigns");
  return response.data;
};

const preOderRegister = async (data) => {
  try {
    const response = await httpRequest.post("/preorder/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering preorder:", error);
    throw error;
  }
};

const addPreorderOpenItem = async (data) => {
  try {
    const response = await httpRequest.post("/preorder/open/add-to-cart", data);
    return response.data;
  } catch (error) {
    console.error("Error registering preorder:", error);
    throw error;
  }
};

const preOrderVerify = async (token) => {
  try {
    const response = await httpRequest.get(`/preorder/verify?token=${token}`);
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export {
  getUpcomingCampaigns,
  preOderRegister,
  preOrderVerify,
  getPreOrderCampaigns,
  addPreorderOpenItem,
};
