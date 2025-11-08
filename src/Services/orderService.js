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

export const getPaymentByOrderId = async (orderId) => {
  try {
    const response = await httpRequest.get(`/orders/${orderId}/payment`);
    return response.data;
  } catch (error) {
    console.error("Get payment error:", error);
    return null;
  }
};

export { getOrderById, getPaymentStatus };
