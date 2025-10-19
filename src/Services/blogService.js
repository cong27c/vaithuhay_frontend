// services/checkoutService.js
import * as httpRequest from "@/utils/httpRequest";

const getBlogsByType = async (type, page = 1, limit = 10) => {
  try {
    const response = await httpRequest.get(`/blogs/type/${type}`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBlogBySlug = async (slug) => {
  try {
    const response = await httpRequest.get(`/blogs/${slug}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getBlogsByType, getBlogBySlug };
