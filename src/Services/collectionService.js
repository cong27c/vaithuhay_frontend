import * as httpRequest from "@/utils/httpRequest";

const getProductsByCollectionSlug = async (slug, page, limit, sort) => {
  const response = await httpRequest.get(
    `/collections/${slug}?page=${page}&limit=${limit}&sort=${sort}`,
  );
  return response.data;
};

const getByProductsSlug = async (slug) => {
  const response = await httpRequest.get(`/collections/slide/${slug}`);
  return response.data;
};

const getCollections = async () => {
  const response = await httpRequest.get(`/collections`);
  return response.data;
};

export { getProductsByCollectionSlug, getCollections, getByProductsSlug };
