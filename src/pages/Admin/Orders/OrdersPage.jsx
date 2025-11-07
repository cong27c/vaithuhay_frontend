"use client";

import { useState, useEffect } from "react";
import OrderList from "./components/OrderList/OrderList";
import OrderDetail from "./components/OrderDetail/OrderDetail";
import OrderFilters from "./components/OrderFilters/OrderFilters";
import Modal from "@/components/Admin/ui/Modal"; // Thêm component Modal
import styles from "./OrdersPage.module.scss";
import orderAdminService from "@/Services/orderAdminService";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false); // State cho modal
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "",
    search: "",
    start_date: "",
    end_date: "",
    payment_status: "",
    shipment_status: "",
  });

  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderAdminService.getAllOrders(filters);
      setOrders(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Lấy chi tiết đơn hàng và mở modal
  const fetchOrderDetail = async (orderId) => {
    try {
      const response = await orderAdminService.getOrderDetail(orderId);
      setSelectedOrder(response.data);
      setShowDetailModal(true); // Mở modal sau khi có data
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  // Cập nhật trạng thái đơn hàng
  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await orderAdminService.updateOrderStatus(orderId, status);
      await fetchOrders(); // Refresh danh sách
      if (selectedOrder?.id === orderId) {
        await fetchOrderDetail(orderId); // Refresh chi tiết
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      throw error;
    }
  };

  // Cập nhật trạng thái thanh toán
  const handleUpdatePaymentStatus = async (orderId, paymentData) => {
    try {
      await orderAdminService.updatePaymentStatus(orderId, paymentData);
      await fetchOrders();
      if (selectedOrder?.id === orderId) {
        await fetchOrderDetail(orderId);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thanh toán:", error);
      throw error;
    }
  };

  // Cập nhật trạng thái vận chuyển
  const handleUpdateShipmentStatus = async (orderId, shipmentData) => {
    try {
      await orderAdminService.updateShipmentStatus(orderId, shipmentData);
      await fetchOrders();
      if (selectedOrder?.id === orderId) {
        await fetchOrderDetail(orderId);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật vận chuyển:", error);
      throw error;
    }
  };

  // Xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    try {
      await orderAdminService.deleteOrder(orderId);
      await fetchOrders();
      if (selectedOrder?.id === orderId) {
        handleCloseModal();
      }
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  return (
    <div className={styles.ordersPage}>
      <div className={styles.header}>
        <h1>Quản lý Đơn hàng</h1>
        <p>Quản lý toàn bộ luồng từ đặt hàng → thanh toán → giao hàng</p>
      </div>

      <div className={styles.container}>
        <div className={styles.sidebar}>
          <OrderFilters
            filters={filters}
            onFiltersChange={setFilters}
            onRefresh={fetchOrders}
          />
        </div>

        <div className={styles.mainContent}>
          <OrderList
            orders={orders}
            loading={loading}
            onSelectOrder={fetchOrderDetail}
            onUpdateStatus={handleUpdateOrderStatus}
            onDeleteOrder={handleDeleteOrder}
            pagination={orders.pagination}
            onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </div>
      </div>

      {/* Modal chi tiết đơn hàng */}
      <Modal
        isOpen={showDetailModal}
        onClose={handleCloseModal}
        size="xl"
        title="Chi tiết đơn hàng"
      >
        {selectedOrder && (
          <OrderDetail
            order={selectedOrder}
            onClose={handleCloseModal}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdatePaymentStatus={handleUpdatePaymentStatus}
            onUpdateShipmentStatus={handleUpdateShipmentStatus}
          />
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;
