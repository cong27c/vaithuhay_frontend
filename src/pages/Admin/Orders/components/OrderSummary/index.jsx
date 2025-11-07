"use client";

import { useState } from "react";
import { DollarSign, Package, Truck, Edit, Save, X } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import StatusBadge from "../StatusBadge/StatusBadge";
import styles from "./OrderSummary.module.scss";

const OrderSummary = ({ order, onUpdateOrderStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: order?.status || "pending",
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  const calculateItemsTotal = () => {
    return (
      order?.items?.reduce((sum, item) => {
        const unitPrice = item.unit_price || 0;
        const discount = item.discount_value || 0; // giảm giá theo VNĐ
        const quantity = item.quantity || 0;
        const total = (unitPrice - discount) * quantity;
        return sum + total;
      }, 0) || 0
    );
  };

  const calculateTotalAmount = () => {
    const itemsTotal = calculateItemsTotal();
    const shippingFee = +order.shipment?.shipping_fee || 0;
    return itemsTotal + shippingFee;
  };

  const getNextStatusOptions = () => {
    const statusFlow = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["processing", "cancelled"],
      processing: ["shipped", "cancelled"],
      shipped: ["delivered"],
      delivered: [],
      cancelled: [],
    };

    return statusFlow[order.status] || [];
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      processing: "Đang xử lý",
      shipped: "Đang giao hàng",
      delivered: "Đã giao hàng",
      cancelled: "Đã hủy",
    };
    return labels[status] || status;
  };

  const handleSave = async () => {
    try {
      await onUpdateOrderStatus(order.id, editData.status);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  const handleCancel = () => {
    setEditData({ status: order.status });
    setIsEditing(false);
  };

  const nextStatusOptions = getNextStatusOptions();

  return (
    <div className={styles.orderSummary}>
      <div className={styles.header}>
        <div className={styles.title}>
          <DollarSign size={20} />
          <h3>Tổng quan đơn hàng</h3>
        </div>
      </div>

      <Card>
        {/* Trạng thái đơn hàng */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4>Trạng thái đơn hàng</h4>
            {!isEditing ? (
              <button
                className={styles.editBtn}
                onClick={() => setIsEditing(true)}
                disabled={nextStatusOptions.length === 0}
              >
                <Edit size={14} />
                Cập nhật
              </button>
            ) : (
              <div className={styles.editActions}>
                <button className={styles.saveBtn} onClick={handleSave}>
                  <Save size={14} />
                </button>
                <button className={styles.cancelBtn} onClick={handleCancel}>
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div className={styles.statusSection}>
            {isEditing ? (
              <div className={styles.statusEdit}>
                <select
                  value={editData.status}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className={styles.statusSelect}
                >
                  {nextStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {getStatusLabel(status)}
                    </option>
                  ))}
                </select>
                <p className={styles.statusHelp}>
                  Chuyển trạng thái từ{" "}
                  <strong>{getStatusLabel(order.status)}</strong>
                </p>
              </div>
            ) : (
              <div className={styles.statusDisplay}>
                <StatusBadge
                  type="order"
                  status={order.status}
                  withDot={true}
                />
                {nextStatusOptions.length > 0 && (
                  <p className={styles.statusHelp}>
                    Có thể chuyển sang:{" "}
                    {nextStatusOptions.map((s) => getStatusLabel(s)).join(", ")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tóm tắt thanh toán */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4>Tóm tắt thanh toán</h4>
          </div>

          <div className={styles.paymentSummary}>
            <div className={styles.summaryRow}>
              <div className={styles.summaryLabel}>
                <Package size={14} />
                <span>Tạm tính:</span>
              </div>
              <span className={styles.summaryValue}>
                {formatCurrency(calculateItemsTotal())}
              </span>
            </div>

            <div className={styles.summaryRow}>
              <div className={styles.summaryLabel}>
                <Truck size={14} />
                <span>Phí vận chuyển:</span>
              </div>
              <span className={styles.summaryValue}>
                {formatCurrency(order.shipment?.shipping_fee || 0)}
              </span>
            </div>

            {order.discount_amount > 0 && (
              <div className={styles.summaryRow}>
                <div className={styles.summaryLabel}>
                  <span>Giảm giá:</span>
                </div>
                <span className={styles.summaryValue + " " + styles.discount}>
                  -{formatCurrency(order.discount_amount)}
                </span>
              </div>
            )}

            {order.voucher && (
              <div className={styles.summaryRow}>
                <div className={styles.summaryLabel}>
                  <span>Mã giảm giá:</span>
                </div>
                <span className={styles.summaryValue + " " + styles.voucher}>
                  {order.voucher.code}
                </span>
              </div>
            )}

            <div className={styles.summaryDivider}></div>

            <div className={styles.summaryRow + " " + styles.total}>
              <div className={styles.summaryLabel}>
                <DollarSign size={16} />
                <span>Tổng cộng:</span>
              </div>
              <span className={styles.summaryValue}>
                {formatCurrency(calculateTotalAmount())}{" "}
              </span>
            </div>
          </div>
        </div>

        {/* Thông tin bổ sung */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4>Thông tin bổ sung</h4>
          </div>

          <div className={styles.additionalInfo}>
            <div className={styles.infoItem}>
              <label>Số sản phẩm:</label>
              <span>{order.items?.length || 0}</span>
            </div>

            <div className={styles.infoItem}>
              <label>Tổng số lượng:</label>
              <span>
                {order.items?.reduce(
                  (sum, item) => sum + (item.quantity || 0),
                  0,
                ) || 0}
              </span>
            </div>

            <div className={styles.infoItem}>
              <label>Phương thức TT:</label>
              <span className={styles.paymentMethod}>
                {order.payment?.method === "cod"
                  ? "COD"
                  : order.payment?.method === "bank"
                    ? "Chuyển khoản"
                    : order.payment?.method === "momo"
                      ? "MoMo"
                      : order.payment?.method === "vnpay"
                        ? "VNPay"
                        : order.payment?.method || "N/A"}
              </span>
            </div>

            <div className={styles.infoItem}>
              <label>Trạng thái Thanh Toán:</label>
              <StatusBadge
                type="payment"
                status={order.payment?.status}
                withDot={true}
                size="small"
              />
            </div>

            <div className={styles.infoItem}>
              <label>Trạng thái Vận Chuyển:</label>
              <StatusBadge
                type="shipment"
                status={order.shipment?.status}
                withDot={true}
                size="small"
              />
            </div>
          </div>
        </div>

        {/* Thông tin thời gian */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h4>Thời gian</h4>
          </div>

          <div className={styles.timeInfo}>
            <div className={styles.timeItem}>
              <label>Ngày đặt:</label>
              <span>
                {new Date(order.order_date).toLocaleDateString("vi-VN")}
              </span>
            </div>

            <div className={styles.timeItem}>
              <label>Ngày tạo:</label>
              <span>
                {new Date(order.created_at).toLocaleDateString("vi-VN")}
              </span>
            </div>

            {order.updated_at && (
              <div className={styles.timeItem}>
                <label>Cập nhật:</label>
                <span>
                  {new Date(order.updated_at).toLocaleDateString("vi-VN")}
                </span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderSummary;
