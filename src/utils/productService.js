import httpRequest from "./httpRequest";

export const getAll = async (page = 1, perPage = 10) => {
  const response = await httpRequest.get("/products", {
    params: {
      page,
      per_page: perPage,
    },
  });
  return response;
};

export const getOne = async (id) => {
  const response = await httpRequest.get(`/products/${id}`);
  return response;
};

export default {
  getAll,
  getOne,
};
