"use client";

import { Eye, Trash2 } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import StatusBadge from "../StatusBadge/StatusBadge";
import styles from "./OrderList.module.scss";

const OrderList = ({
  orders,
  loading,
  onSelectOrder,
  onUpdateStatus,
  onDeleteOrder,
  pagination,
  onPageChange,
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      cod: "COD",
      bank: "Chuyển khoản",
      momo: "Momo",
      vnpay: "VNPay",
    };
    return methods[method] || method;
  };

  if (loading) {
    return (
      <Card>
        <div className={styles.loading}>Đang tải danh sách đơn hàng...</div>
      </Card>
    );
  }

  return (
    <Card>
      <div className={styles.orderList}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Phương thức TT</th>
              <th>Trạng thái TT</th>
              <th>Trạng thái VC</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className={styles.orderRow}>
                <td className={styles.orderId}>
                  <strong>{order.order_number}</strong>
                </td>
                <td className={styles.customer}>
                  <div className={styles.customerInfo}>
                    <div className={styles.customerName}>
                      {order.orderAddress?.full_name || "Khách vãng lai"}
                    </div>
                    <div className={styles.customerPhone}>
                      {order.orderAddress?.phone || "N/A"}
                    </div>
                  </div>
                </td>
                <td className={styles.amount}>
                  {formatCurrency(order.final_amount)}
                </td>
                <td className={styles.paymentMethod}>
                  {getPaymentMethodLabel(order.payment?.method)}
                </td>
                <td className={styles.paymentStatus}>
                  <StatusBadge
                    type="payment"
                    status={order.payment?.status}
                    withDot={true}
                  />
                </td>
                <td className={styles.shipmentStatus}>
                  <StatusBadge
                    type="shipment"
                    status={order.shipment?.status}
                    withDot={true}
                  />
                </td>
                <td className={styles.date}>{formatDate(order.created_at)}</td>
                <td className={styles.actions}>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onSelectOrder(order.id)}
                      title="Xem chi tiết"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.danger}`}
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
                          onDeleteOrder(order.id);
                        }
                      }}
                      title="Xóa đơn hàng"
                      disabled={
                        !["pending", "cancelled"].includes(order.status)
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phần empty state và pagination giữ nguyên */}
      </div>
    </Card>
  );
};

export default OrderList;
