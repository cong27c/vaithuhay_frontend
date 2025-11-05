"use client";

import { useEffect, useState } from "react";
import styles from "./OrderSuccessPage.module.scss";
import { getOrderById } from "@/Services/orderService";
import { useParams } from "react-router-dom";

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        console.log("OrderSuccessPage", data);
        if (data) {
          // Map data từ API về đúng props cần dùng
          setOrder({
            orderId: data?.order.id,
            totalAmount: data?.order.total_amount,
            paymentMethod: data?.order.payment?.method || "cod",
            status: data?.order.payment?.status || "pending",
            transactionId: data?.order.payment?.transaction_id || null,
            orderAddress: data?.order.address
              ? {
                  fullName: data?.order.address.full_name,
                  phone: data?.order.address.phone,
                  email: data?.order.address.email,
                  streetAddress: data?.order.address.street_address,
                  ward: data?.order.address.ward,
                  district: data?.order.address.district,
                  province: data?.order.address.province,
                  note: data?.order.address.note || "",
                }
              : null,
            // Thêm thông tin sản phẩm
            items:
              data?.order.items?.map((item) => ({
                id: item.id,
                name: item.product_name,
                price: item.unit_price,
                ship:
                  +data?.order.total_amount - +item.unit_price * +item.quantity,
                quantity: item.quantity,
                image: item.product_image,
              })) || [],
          });
        }
      } catch (err) {
        console.error("Fetch order failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (!order) return <p>Không tìm thấy đơn hàng.</p>;

  const {
    totalAmount,
    paymentMethod,
    status,
    orderAddress,
    transactionId,
    items,
  } = order;

  // --- Giữ nguyên toàn bộ logic render từ component cũ ---
  const isOnlinePayment = paymentMethod === "bank";

  const getPaymentMessage = () => {
    if (paymentMethod === "cod") {
      return "Đơn hàng đã được xác nhận, vui lòng chuẩn bị thanh toán khi nhận hàng.";
    }
    if (status === "paid") {
      return "Thanh toán thành công! Đơn hàng của bạn đã được ghi nhận.";
    }
    if (status === "failed") {
      return "Thanh toán thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.";
    }
    return "Đơn hàng đang được xử lý.";
  };

  const getPaymentMethodName = () => {
    const methods = {
      cod: "Thanh toán khi nhận hàng (COD)",
      vnpay: "VNPay",
      momo: "Momo",
      bank: "Chuyển khoản ngân hàng",
    };
    return methods[paymentMethod] || paymentMethod;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusClass = () => {
    if (status === "paid" || status === "confirmed")
      return styles.statusSuccess;
    if (status === "failed") return styles.statusError;
    return styles.statusWarning;
  };

  const handleViewOrderDetail = () => setShowOrderDetail(true);
  const handleCloseOrderDetail = () => setShowOrderDetail(false);
  const handleBackToHome = () => (window.location.href = "/");
  const handleContinueShopping = () => (window.location.href = "/products");

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={`${styles.iconWrapper} ${getStatusClass()}`}>
          <span className={styles.icon}>{status === "failed" ? "✕" : "✓"}</span>
        </div>

        <h1 className={styles.header}>
          {status === "failed"
            ? "Thanh toán thất bại"
            : "Cảm ơn bạn đã đặt hàng!"}
        </h1>

        <p className={`${styles.message} ${getStatusClass()}`}>
          {getPaymentMessage()}
        </p>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Thông tin đơn hàng</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Mã đơn hàng:</span>
              <span className={styles.value}>{orderId}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Tổng tiền:</span>
              <span className={`${styles.value} ${styles.amount}`}>
                {formatCurrency(totalAmount)}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Phương thức thanh toán:</span>
              <span className={styles.value}>{getPaymentMethodName()}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Trạng thái:</span>
              <span className={`${styles.value} ${getStatusClass()}`}>
                {status === "paid"
                  ? "Đã thanh toán"
                  : status === "failed"
                    ? "Thanh toán thất bại"
                    : "Chờ xác nhận"}
              </span>
            </div>

            {isOnlinePayment && transactionId && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Mã giao dịch:</span>
                <span className={styles.value}>{transactionId}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={handleViewOrderDetail}
          >
            Xem chi tiết đơn hàng
          </button>
          <button
            className={`${styles.button} ${styles.buttonOutline}`}
            onClick={handleBackToHome}
          >
            Quay về trang chủ
          </button>
        </div>
      </div>

      {/* Modal chi tiết đơn hàng */}
      {showOrderDetail && (
        <div className={styles.modalOverlay} onClick={handleCloseOrderDetail}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Chi tiết đơn hàng #{orderId}
              </h2>
              <button
                className={styles.closeButton}
                onClick={handleCloseOrderDetail}
              >
                &times;
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Danh sách sản phẩm */}
              <div className={styles.productsSection}>
                <h3 className={styles.sectionTitle}>Sản phẩm</h3>
                <div className={styles.productsList}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.productItem}>
                      <div className={styles.productImage}>
                        {item.image && <img src={item.image} alt={item.name} />}
                      </div>
                      <div className={styles.productInfo}>
                        <h4 className={styles.productName}>{item.name}</h4>
                        <div className={styles.productDetails}>
                          <span className={styles.productPrice}>
                            {formatCurrency(item.price)}
                          </span>
                          <span className={styles.productQuantity}>
                            x {item.quantity}
                          </span>
                        </div>
                        <div className={styles.productDetails}>
                          <span className={styles.productPrice}>
                            Tiền ship :
                          </span>
                          <span className={styles.productQuantity}>
                            {formatCurrency(item.ship)}
                          </span>
                        </div>
                        <div className={styles.productTotal}>
                          Thành tiền: {formatCurrency(totalAmount)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thông tin địa chỉ */}
              {orderAddress && (
                <div className={styles.addressSection}>
                  <h3 className={styles.sectionTitle}>Thông tin đơn hàng</h3>
                  <div className={styles.addressContent}>
                    <p className={styles.addressLine}>
                      <strong>{orderAddress.fullName}</strong>
                    </p>
                    <p className={styles.addressLine}>{orderAddress.phone}</p>
                    {orderAddress.email && (
                      <p className={styles.addressLine}>{orderAddress.email}</p>
                    )}
                    <p className={styles.addressLine}>
                      {orderAddress.streetAddress}, {orderAddress.ward},{" "}
                      {orderAddress.district}, {orderAddress.province}
                    </p>
                    {orderAddress.note && (
                      <p className={styles.addressLine}>
                        <strong>Ghi chú:</strong> {orderAddress.note}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Tổng thanh toán */}
              <div className={styles.totalSection}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Tổng cộng:</span>
                  <span className={styles.totalAmount}>
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={`${styles.button} ${styles.buttonOutline}`}
                onClick={handleCloseOrderDetail}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSuccessPage;
