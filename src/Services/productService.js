import * as httpRequest from "@/utils/httpRequest";

const getAll = async () => {
  const response = await httpRequest.get("/products");
  return response;
};

const getOne = async (id) => {
  const response = await httpRequest.get(`/products/${id}`);
  return response;
};

const update = async (id, data) => {
  const response = await httpRequest.put(`/products/${id}`, data);
  return response;
};

const del = async (id) => {
  const response = await httpRequest.del(`/products/${id}`);
  return response;
};

const getProductBySlug = async (slug) => {
  const response = await httpRequest.get(`/products/${slug}`);
  return response.data;
};

const getHighlightsProduct = async (productId) => {
  const response = await httpRequest.get(`/products/${productId}/highlights`);
  return response.data;
};

const getBlogsProduct = async (productId) => {
  const response = await httpRequest.get(`/products/${productId}/blogs`);
  return response.data;
};

const getProductVariantsBySlug = async (slug) => {
  const response = await httpRequest.get(`/products/${slug}/variants`);
  return response.data;
};
export {
  getAll,
  getOne,
  update,
  del,
  getProductVariantsBySlug,
  getProductBySlug,
  getHighlightsProduct,
  getBlogsProduct,
};
