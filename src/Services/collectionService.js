import * as httpRequest from "@/utils/httpRequest";

const getProductsByCollectionSlug = async (slug, page, limit, sort) => {
  const response = await httpRequest.get(
    `/collections/${slug}?page=${page}&limit=${limit}&sort=${sort}`,
  );
  return response.data;
};

export { getProductsByCollectionSlug };
