import adminHttpRequest from "@/utils/adminHttpRequest";

// 📦 Order Admin Services - Đầy đủ 11 hàm tương ứng với 11 routes

/**
 * Lấy danh sách đơn hàng với phân trang và filter
 * GET /orders
 */
const getAllOrders = async (params = {}) => {
  const response = await adminHttpRequest.get("/orders", { params });
  return response.data;
};

/**
 * Tìm kiếm đơn hàng nâng cao
 * GET /orders/search
 */
const searchOrders = async (searchCriteria = {}) => {
  const response = await adminHttpRequest.get("/orders/search", {
    params: searchCriteria,
  });
  return response.data;
};

/**
 * Lấy thống kê đơn hàng
 * GET /orders/stats
 */
const getOrderStats = async (timeRange = "month") => {
  const response = await adminHttpRequest.get("/orders/stats", {
    params: { time_range: timeRange },
  });
  return response.data;
};

/**
 * Lấy danh sách trạng thái
 * GET /orders/statuses
 */
const getOrderStatuses = async () => {
  const response = await adminHttpRequest.get("/orders/statuses");
  return response.data;
};

/**
 * Lấy chi tiết đơn hàng theo ID
 * GET /orders/:id
 */
const getOrderDetail = async (orderId) => {
  const response = await adminHttpRequest.get(`/orders/${orderId}`);
  return response.data;
};

/**
 * Lấy analytics đơn hàng
 * GET /orders/:id/analytics
 */
const getOrderAnalytics = async (orderId) => {
  const response = await adminHttpRequest.get(`/orders/${orderId}/analytics`);
  return response.data;
};

/**
 * Cập nhật trạng thái đơn hàng
 * PUT /orders/:id/status
 */
const updateOrderStatus = async (orderId, status) => {
  const response = await adminHttpRequest.put(`/orders/${orderId}/status`, {
    status,
  });
  return response.data;
};

/**
 * Cập nhật thông tin thanh toán
 * PUT /orders/:id/payment
 */
const updatePaymentStatus = async (orderId, paymentData) => {
  const response = await adminHttpRequest.put(
    `/orders/${orderId}/payment`,
    paymentData,
  );
  return response.data;
};

/**
 * Cập nhật thông tin vận chuyển
 * PUT /orders/:id/shipment
 */
const updateShipmentStatus = async (orderId, shipmentData) => {
  const response = await adminHttpRequest.put(
    `/orders/${orderId}/shipment`,
    shipmentData,
  );
  return response.data;
};

/**
 * Cập nhật thông tin đơn hàng
 * PUT /orders/:id
 */
const updateOrder = async (orderId, updateData) => {
  const response = await adminHttpRequest.put(`/orders/${orderId}`, updateData);
  return response.data;
};

/**
 * Xóa đơn hàng
 * DELETE /orders/:id
 */
const deleteOrder = async (orderId) => {
  const response = await adminHttpRequest.del(`/orders/${orderId}`);
  return response.data;
};

export default {
  getAllOrders,
  searchOrders,
  getOrderStats,
  getOrderStatuses,
  getOrderDetail,
  getOrderAnalytics,
  updateOrderStatus,
  updatePaymentStatus,
  updateShipmentStatus,
  updateOrder,
  deleteOrder,
};
