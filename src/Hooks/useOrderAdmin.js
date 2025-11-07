import { useState } from "react";
import orderAdminService from "@/Services/orderAdminService";

const useOrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderAdminService.getAllOrders(filters);
      setOrders(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message);
      console.error("Lỗi khi lấy danh sách đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await orderAdminService.deleteOrder(orderId);
      return { success: true };
    } catch (err) {
      console.error("Lỗi khi xóa đơn hàng:", err);
      throw err;
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await orderAdminService.updateOrderStatus(orderId, status);
      return { success: true };
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      throw err;
    }
  };

  return {
    orders,
    pagination,
    loading,
    error,
    fetchOrders,
    deleteOrder,
    updateOrderStatus,
  };
};

export default useOrderAdmin;
