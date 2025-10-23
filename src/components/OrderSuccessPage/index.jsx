"use client";
import styles from "./OrderSuccessPage.module.scss";

const OrderSuccessPage = ({
  orderId,
  totalAmount,
  paymentMethod,
  status,
  orderAddress,
  transactionId,
}) => {
  // Determine if payment is online (vnpay or momo)
  const isOnlinePayment = paymentMethod === "vnpay" || paymentMethod === "momo";

  // Get payment status message
  const getPaymentMessage = () => {
    if (paymentMethod === "cod") {
      return "Đơn hàng đã được xác nhận, vui lòng chuẩn bị thanh toán khi nhận hàng.";
    }
    if (status === "paid") {
      return "Thanh toán thành công! Đơn hàng của bạn đã được ghi nhận.";
    }
    if (status === "payment_failed") {
      return "Thanh toán thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.";
    }
    return "Đơn hàng đang được xử lý.";
  };

  // Get payment method display name
  const getPaymentMethodName = () => {
    const methods = {
      cod: "Thanh toán khi nhận hàng (COD)",
      vnpay: "VNPay",
      momo: "Momo",
    };
    return methods[paymentMethod] || paymentMethod;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Get status class
  const getStatusClass = () => {
    if (status === "paid" || status === "confirmed") {
      return styles.statusSuccess;
    }
    if (status === "payment_failed") {
      return styles.statusError;
    }
    return styles.statusWarning;
  };

  // Navigation handlers using window.location
  const handleViewOrderDetail = () => {
    window.location.href = `/orders/${orderId}`;
  };

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const handleContinueShopping = () => {
    window.location.href = "/products";
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Success Icon */}
        <div className={`${styles.iconWrapper} ${getStatusClass()}`}>
          <span className={styles.icon}>
            {status === "payment_failed" ? "✕" : "✓"}
          </span>
        </div>

        {/* Header */}
        <h1 className={styles.header}>
          {status === "payment_failed"
            ? "Thanh toán thất bại"
            : "Cảm ơn bạn đã đặt hàng!"}
        </h1>

        {/* Payment Status Message */}
        <p className={`${styles.message} ${getStatusClass()}`}>
          {getPaymentMessage()}
        </p>

        {/* Order Information */}
        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Thông tin đơn hàng</h2>

          <div className={styles.infoGrid}>
            {/* Order ID */}
            <div className={styles.infoItem}>
              <span className={styles.label}>Mã đơn hàng:</span>
              <span className={styles.value}>{orderId}</span>
            </div>

            {/* Total Amount */}
            <div className={styles.infoItem}>
              <span className={styles.label}>Tổng tiền:</span>
              <span className={`${styles.value} ${styles.amount}`}>
                {formatCurrency(totalAmount)}
              </span>
            </div>

            {/* Payment Method */}
            <div className={styles.infoItem}>
              <span className={styles.label}>Phương thức thanh toán:</span>
              <span className={styles.value}>{getPaymentMethodName()}</span>
            </div>

            {/* Payment Status */}
            <div className={styles.infoItem}>
              <span className={styles.label}>Trạng thái:</span>
              <span className={`${styles.value} ${getStatusClass()}`}>
                {status === "paid"
                  ? "Đã thanh toán"
                  : status === "payment_failed"
                    ? "Thanh toán thất bại"
                    : "Chờ xác nhận"}
              </span>
            </div>

            {/* Transaction ID (only for online payment) */}
            {isOnlinePayment && transactionId && (
              <div className={styles.infoItem}>
                <span className={styles.label}>Mã giao dịch:</span>
                <span className={styles.value}>{transactionId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Address */}
        {orderAddress && (
          <div className={styles.addressSection}>
            <h2 className={styles.sectionTitle}>Địa chỉ giao hàng</h2>

            <div className={styles.addressContent}>
              <p className={styles.addressLine}>
                <strong className={styles.addressLineStrong}>
                  {orderAddress.fullName}
                </strong>
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

        {/* Next Steps */}
        <div className={styles.nextSteps}>
          <h3 className={styles.nextStepsTitle}>Bước tiếp theo</h3>
          <ul className={styles.nextStepsList}>
            {paymentMethod === "cod" && (
              <li>
                Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng trong vòng 24h
              </li>
            )}
            {status === "paid" && (
              <li>
                Đơn hàng của bạn sẽ được giao trong vòng 2-3 ngày làm việc
              </li>
            )}
            <li>Bạn sẽ nhận được email xác nhận đơn hàng trong vòng 5 phút</li>
            <li>Theo dõi đơn hàng để biết trạng thái cập nhật nhất</li>
          </ul>
        </div>

        {/* Action Buttons */}
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
    </div>
  );
};

export default OrderSuccessPage;
