import * as httpRequest from "@/utils/httpRequest";

const getOrderById = async (orderId) => {
  const response = await httpRequest.get(`/orders/${orderId}`);
  return response.data;
};

const getPaymentStatus = async (orderId) => {
  try {
    const response = await httpRequest.get(
      `/orders/${orderId}/check-transaction`,
    );
    return response.data;
  } catch (error) {
    console.error("Get payment status error:", error);
    throw error;
  }
};

export { getOrderById, getPaymentStatus };
