import * as httpRequest from "@/utils/httpRequest";

const createReview = async (data) => {
  const response = await httpRequest.post(`/reviews`, data);
  return response.data;
};

export { createReview };
