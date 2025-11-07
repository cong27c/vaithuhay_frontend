"use client";

import styles from "./StatusBadge.module.scss";

const StatusBadge = ({ type = "order", status, withDot = true }) => {
  const getStatusLabel = () => {
    const labels = {
      order: {
        pending: "Chờ xác nhận",
        confirmed: "Đã xác nhận",
        processing: "Đang xử lý",
        shipped: "Đang giao hàng",
        delivered: "Đã giao hàng",
        cancelled: "Đã hủy",
      },
      payment: {
        pending: "Chờ thanh toán",
        paid: "Đã thanh toán",
        failed: "Thất bại",
        refunded: "Đã hoàn tiền",
      },
      shipment: {
        waiting: "Chờ lấy hàng",
        shipping: "Đang vận chuyển",
        delivered: "Đã giao hàng",
        failed: "Thất bại",
      },
    };

    return labels[type]?.[status] || status;
  };

  const badgeClass = `${styles.badge} ${styles[type]} ${styles[status]} ${
    withDot ? styles.badgeWithDot : ""
  }`;

  return <span className={badgeClass}>{getStatusLabel()}</span>;
};

export default StatusBadge;
