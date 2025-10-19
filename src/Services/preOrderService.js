import * as httpRequest from "@/utils/httpRequest";

const getUpcomingCampaigns = async () => {
  const response = await httpRequest.get("/preorder/upcoming");
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

export { getUpcomingCampaigns, preOderRegister };
