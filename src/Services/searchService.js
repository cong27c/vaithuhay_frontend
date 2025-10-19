// services/searchService.js
import * as httpRequest from "@/utils/httpRequest";

export const searchAll = async (keyword, options = {}) => {
  try {
    const { type, page = 1, limit = 10 } = options;
    const params = { q: keyword, page, limit };

    if (type && type !== "all") {
      params.type = type;
    }

    const response = await httpRequest.get("/search", { params });
    return response.data;
  } catch (error) {
    console.error("Search API error:", error);
    throw new Error(error.response?.data?.message || "Lỗi tìm kiếm");
  }
};

export const getHotTopics = async () => {
  try {
    const response = await httpRequest.get("/search/hot-topics");
    return response.data;
  } catch (error) {
    console.error("Hot topics API error:", error);
    throw new Error(error.response?.data?.message || "Lỗi lấy chủ đề hot");
  }
};

export const searchProducts = async (keyword, options = {}) => {
  try {
    const { page = 1, limit = 10 } = options;
    const params = {
      q: keyword,
      type: "products",
      page,
      limit,
    };

    const response = await httpRequest.get("/search", { params });
    return response.data;
  } catch (error) {
    console.error("Products search API error:", error);
    throw new Error(error.response?.data?.message || "Lỗi tìm kiếm sản phẩm");
  }
};

export const searchBlogs = async (keyword, options = {}) => {
  try {
    const { page = 1, limit = 10 } = options;
    const params = {
      q: keyword,
      type: "blogs",
      page,
      limit,
    };

    const response = await httpRequest.get("/search", { params });
    return response.data;
  } catch (error) {
    console.error("Blogs search API error:", error);
    throw new Error(error.response?.data?.message || "Lỗi tìm kiếm bài viết");
  }
};
