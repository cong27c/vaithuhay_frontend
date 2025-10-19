import * as httpRequest from "@/utils/httpRequest";

const createAddress = async (data) => {
  const response = await httpRequest.post("/addresses", data);
  return response.data;
};

const getAddressesByCustomer = async () => {
  const response = await httpRequest.get(`/addresses`);
  return response.data;
};

const updateAddress = async (id, data) => {
  const response = await httpRequest.put(`/addresses/${id}`, data);
  return response.data;
};

const deleteAddress = async (id) => {
  const response = await httpRequest.del(`/addresses/${id}`);
  return response.data;
};

export { createAddress, getAddressesByCustomer, updateAddress, deleteAddress };
