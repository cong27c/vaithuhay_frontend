import * as httpRequest from "@/utils/httpRequest";

const getOrderById = async (orderId) => {
  const response = await httpRequest.get(`/orders/${orderId}`);
  return response.data;
};

const checkTransactionExists = async (orderId) => {
  const response = await httpRequest.get(
    `/orders/${orderId}/check-transaction`,
  );
  return response.data;
};

export { getOrderById, checkTransactionExists };
