"use client";

import { useState } from "react";
import { CreditCard, Calendar, Edit, Save, X } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import StatusBadge from "../StatusBadge/StatusBadge";
import styles from "./PaymentInfo.module.scss";

const PaymentInfo = ({ payment, onUpdatePaymentStatus, orderId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: payment?.status || "pending",
    paid_at: payment?.paid_at || "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      cod: "Thanh toán khi nhận hàng (COD)",
      bank: "Chuyển khoản ngân hàng",
      momo: "Ví điện tử MoMo",
      vnpay: "VNPay",
    };
    return methods[method] || method;
  };

  const handleSave = async () => {
    try {
      await onUpdatePaymentStatus(orderId, editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật thanh toán:", error);
    }
  };

  const handleCancel = () => {
    setEditData({
      status: payment?.status || "pending",
      paid_at: payment?.paid_at || "",
    });
    setIsEditing(false);
  };

  if (!payment) {
    return (
      <div className={styles.paymentInfo}>
        <div className={styles.header}>
          <div className={styles.title}>
            <CreditCard size={20} />
            <h3>Thông tin thanh toán</h3>
          </div>
        </div>
        <Card>
          <div className={styles.emptyState}>
            <CreditCard size={48} />
            <p>Chưa có thông tin thanh toán</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.paymentInfo}>
      <div className={styles.header}>
        <div className={styles.title}>
          <CreditCard size={20} />
          <h3>Thông tin thanh toán</h3>
        </div>
        <div className={styles.actions}>
          {!isEditing ? (
            <button
              className={styles.editBtn}
              onClick={() => setIsEditing(true)}
            >
              <Edit size={16} />
              Chỉnh sửa
            </button>
          ) : (
            <div className={styles.editActions}>
              <button className={styles.saveBtn} onClick={handleSave}>
                <Save size={16} />
                Lưu
              </button>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                <X size={16} />
                Hủy
              </button>
            </div>
          )}
        </div>
      </div>

      <Card>
        <div className={styles.paymentDetails}>
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <label>Phương thức thanh toán</label>
              <span>{getPaymentMethodLabel(payment.method)}</span>
            </div>

            <div className={styles.detailItem}>
              <label>Trạng thái</label>
              {isEditing ? (
                <select
                  value={editData.status}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className={styles.statusSelect}
                >
                  <option value="pending">Chờ thanh toán</option>
                  <option value="paid">Đã thanh toán</option>
                  <option value="failed">Thất bại</option>
                  <option value="refunded">Đã hoàn tiền</option>
                </select>
              ) : (
                <StatusBadge type="payment" status={payment.status} />
              )}
            </div>

            <div className={styles.detailItem}>
              {console.log("payment", payment)}
              <label>Mã giao dịch</label>
              <span className={styles.transactionId}>
                {payment.transaction_id || "N/A"}
              </span>
            </div>

            <div className={styles.detailItem}>
              <label>Số tiền</label>
              <span className={styles.amount}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(payment.amount || 0)}
              </span>
            </div>

            <div className={styles.detailItem}>
              <label>Ngày thanh toán</label>
              {isEditing ? (
                <input
                  type="datetime-local"
                  value={
                    editData.paid_at
                      ? new Date(editData.paid_at).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      paid_at: e.target.value,
                    }))
                  }
                  className={styles.dateInput}
                />
              ) : (
                <span>{formatDate(payment.paid_at)}</span>
              )}
            </div>

            <div className={styles.detailItem}>
              <label>Ngày tạo</label>
              <span>{formatDate(payment.created_at)}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentInfo;
