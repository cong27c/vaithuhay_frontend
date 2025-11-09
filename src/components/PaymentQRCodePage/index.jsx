"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PaymentQRCodePage.module.scss";
import { toast } from "react-toastify";
import {
  getPaymentStatus,
  getOrderById,
  getPaymentByOrderId,
} from "@/Services/orderService";
import socketClient from "@/utils/socketClient";

const PaymentQRCodePage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState(null); // THÊM STATE CHO PAYMENT
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [connectionState, setConnectionState] = useState("disconnected");
  const channelRef = useRef(null);
  const hasRedirected = useRef(false);

  // 📡 Theo dõi trạng thái kết nối Pusher
  useEffect(() => {
    const updateConnectionState = () => {
      setConnectionState(socketClient.connection.state);
    };

    socketClient.connection.bind("state_change", updateConnectionState);
    updateConnectionState();

    return () => {
      socketClient.connection.unbind("state_change", updateConnectionState);
    };
  }, []);

  // 📡 Khởi tạo Pusher channel cho order
  useEffect(() => {
    if (!orderId) return;

    const initializePusher = async () => {
      try {
        const channel = socketClient.subscribe(`private-order-${orderId}`);
        channelRef.current = channel;

        // Listen event thanh toán thành công
        channel.bind("payment-success", (data) => {
          console.log("💰 Payment success received:", data);
          handlePaymentSuccess(data);
        });

        // Listen event payment error
        channel.bind("payment-error", (data) => {
          console.error("❌ Payment error received:", data);
          toast.error(`Lỗi thanh toán: ${data.error}`);
        });

        // Event cập nhật trạng thái order
        channel.bind("order-status-update", (data) => {
          console.log("🔄 Order status update:", data);
          if (data.status) {
            setOrderStatus(data.status);
          }
        });

        // Xử lý subscription success/error
        channel.bind("pusher:subscription_succeeded", () => {
          console.log("✅ Successfully subscribed to channel");
        });

        channel.bind("pusher:subscription_error", (error) => {
          console.error("❌ Subscription error:", error);
          toast.error("Không thể kết nối real-time");
        });
      } catch (error) {
        console.error("❌ Pusher initialization error:", error);
      }
    };

    initializePusher();

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        socketClient.unsubscribe(`private-order-${orderId}`);
      }
    };
  }, [orderId]);

  // 🧭 Lấy dữ liệu order và payment từ BE
  useEffect(() => {
    const fetchOrderAndPayment = async () => {
      try {
        setIsLoading(true);

        // Lấy thông tin order
        const orderData = await getOrderById(orderId);
        if (!orderData || !orderData.success || !orderData.order) {
          toast.error("Không tìm thấy đơn hàng!");
          navigate("/");
          return;
        }

        console.log("fetchOrder", orderData);
        setOrder(orderData.order);
        setOrderStatus(orderData.order.status || "pending");

        // Lấy thông tin payment
        const paymentData = await getPaymentByOrderId(orderId);
        console.log("fetchPayment", paymentData);

        if (paymentData && paymentData.success) {
          setPayment(paymentData.payment);

          // KIỂM TRA NẾU ĐÃ THANH TOÁN THÀNH CÔNG
          if (
            paymentData.payment?.status === "paid" &&
            !hasRedirected.current
          ) {
            handlePaymentSuccess({
              orderId: orderData.order.id,
              transactionId: paymentData.payment.transaction_id,
              paidAt: paymentData.payment.paid_at,
              amount: paymentData.payment.amount,
            });
          }
        }

        // NẾU ORDER ĐÃ BỊ HỦY
        if (orderData.order.status === "cancelled") {
          toast.error("Đơn hàng đã bị hủy!");
          setTimeout(() => {
            navigate("/cart");
          }, 3000);
        }
      } catch (err) {
        console.error("Fetch order error:", err);
        toast.error("Không thể tải thông tin đơn hàng!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderAndPayment();
  }, [orderId, navigate]);

  // 🎯 Xử lý khi nhận được thông báo thanh toán thành công
  const handlePaymentSuccess = async (data) => {
    if (hasRedirected.current) return;

    console.log("🎉 handlePaymentSuccess", data);

    // Fetch lại thông tin payment để xác nhận
    try {
      const paymentData = await getPaymentByOrderId(orderId);
      if (paymentData?.success && paymentData.payment?.status === "paid") {
        hasRedirected.current = true;

        toast.success("💰 Thanh toán thành công! Đang chuyển hướng...");

        // Cập nhật UI ngay lập tức
        setOrderStatus("confirmed");
        setPayment(paymentData.payment);

        // Cập nhật order data
        setOrder((prev) =>
          prev
            ? {
                ...prev,
                status: "confirmed",
              }
            : null,
        );

        // Chuyển hướng sau 2 giây
        setTimeout(() => {
          navigate(`/order-success/${orderId}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  // 🔁 Hàm kiểm tra thanh toán thủ công
  const handleCheckPayment = async () => {
    setIsLoading(true);
    try {
      // Kiểm tra trạng thái payment
      const paymentData = await getPaymentByOrderId(orderId);

      if (!paymentData || !paymentData.success) {
        toast.error("Không thể kiểm tra trạng thái thanh toán!");
        return;
      }

      // XỬ LÝ CÁC TRẠNG THÁI
      if (paymentData.payment?.status === "paid") {
        handlePaymentSuccess({
          orderId: order.id,
          transactionId: paymentData.payment.transaction_id,
          paidAt: paymentData.payment.paid_at,
          amount: paymentData.payment.amount,
        });
      } else if (orderStatus === "cancelled") {
        toast.error("Đơn hàng đã bị hủy!");
      } else {
        toast.info("Thanh toán chưa được xác nhận. Vui lòng thử lại sau!");
      }
    } catch (error) {
      console.error("Check payment error:", error);
      toast.error("Không thể kiểm tra trạng thái thanh toán!");
    } finally {
      setIsLoading(false);
    }
  };

  // ⏰ Tự động kiểm tra định kỳ
  useEffect(() => {
    if (!orderId || hasRedirected.current) return;

    const interval = setInterval(async () => {
      try {
        console.log("🕒 Auto-checking payment status...");
        const paymentData = await getPaymentByOrderId(orderId);
        console.log("paymentData", paymentData);
        console.log("paymentData?.success", paymentData?.success);
        console.log(
          " paymentData.payment?.status",
          paymentData.payment?.status,
        );
        if (paymentData?.success && paymentData.payment?.status === "paid") {
          handlePaymentSuccess({
            orderId: order.id,
            transactionId: paymentData.payment.transaction_id,
            paidAt: paymentData.payment.paid_at,
            amount: paymentData.payment.amount,
          });
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Auto check payment error:", error);
      }
    }, 30000); // Kiểm tra mỗi 30 giây

    return () => clearInterval(interval);
  }, [orderId]);

  // Hàm format tiền
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);

  // Hàm hiển thị trạng thái - ĐÃ CẬP NHẬT
  const renderStatusText = () => {
    if (payment?.status === "paid") return "Đã thanh toán ✅";
    if (orderStatus === "cancelled") return "Đơn hàng đã hủy 🚫";
    if (payment?.status === "failed") return "Thanh toán thất bại ❌";
    return "Chờ thanh toán ⏳";
  };

  // Kiểm tra đã thanh toán chưa
  const isPaid = payment?.status === "paid";
  const isCancelled = orderStatus === "cancelled";

  // Nếu chưa có dữ liệu
  if (!order && isLoading) {
    return (
      <div className={styles.loading}>
        <p>Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.error}>
        <p>Không thể tải thông tin đơn hàng</p>
        <button onClick={() => window.location.reload()}>Thử lại</button>
      </div>
    );
  }

  // KIỂM TRA NẾU ORDER KHÔNG THỂ THANH TOÁN
  if (isCancelled) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorState}>
            <h2>Không thể tiếp tục thanh toán</h2>
            <p>Đơn hàng đã bị hủy.</p>
            <button
              className={styles.backButton}
              onClick={() => navigate("/cart")}
            >
              Quay lại giỏ hàng
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.title}>Thanh toán đơn hàng #{order.id}</h1>
          <div className={styles.totalAmount}>
            Tổng:{" "}
            <span className={styles.amount}>
              {formatCurrency(order.total_amount || 0)}
            </span>
          </div>

          {/* Real-time Status Indicator */}
          <div
            className={`${styles.status} ${styles[payment?.status]} ${styles[orderStatus]}`}
          >
            Trạng thái: {renderStatusText()}
          </div>

          {/* HIỂN THỊ THÔNG TIN THANH TOÁN NẾU ĐÃ THANH TOÁN */}
          {isPaid && payment && (
            <div className={styles.paymentInfo}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Mã giao dịch:</span>
                <span className={styles.value}>{payment.transaction_id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Số tiền thanh toán:</span>
                <span className={styles.value}>
                  {formatCurrency(payment.amount)}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Thời gian thanh toán:</span>
                <span className={styles.value}>
                  {new Date(payment.paid_at).toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* QR Code Section - ẨN NẾU ĐÃ THANH TOÁN HOẶC LỖI */}
        {!isPaid && !isCancelled && (
          <>
            <div className={styles.qrSection}>
              <div className={styles.qrContainer}>
                <img
                  src={order.qr_code_url || "/placeholder.svg"}
                  alt="QR Code thanh toán"
                  className={styles.qrCode}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>

            {/* Bank Information Section */}
            <div className={styles.bankInfo}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Ngân hàng:</span>
                <span className={styles.value}>
                  {order.bank_name || "SePay"}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Số tài khoản:</span>
                <span className={styles.value}>
                  {order.virtual_account || "—"}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Chủ tài khoản:</span>
                <span className={styles.value}>
                  {order.account_holder || "Công ty TNHH ABC"}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Nội dung chuyển khoản:</span>
                <span className={styles.value}>
                  {order.transfer_content || `DH${order.id}`}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Check Payment Button */}
        <button
          className={styles.checkButton}
          onClick={handleCheckPayment}
          disabled={isLoading || isPaid || isCancelled}
        >
          {isLoading
            ? "Đang kiểm tra..."
            : isPaid
              ? "Đã thanh toán ✅"
              : isCancelled
                ? "Đơn hàng đã hủy"
                : "Kiểm tra thanh toán"}
        </button>

        {/* Additional Info */}
        <div className={styles.footer}>
          <p>
            {isPaid
              ? "Thanh toán đã được xác nhận. Đang chuyển hướng..."
              : isCancelled
                ? "Đơn hàng đã bị hủy. Vui lòng đặt hàng lại."
                : "Vui lòng quét mã QR hoặc chuyển khoản theo thông tin trên để hoàn tất thanh toán."}
          </p>

          {/* Real-time Connection Status */}
          <div className={styles.connectionStatus}>
            <div
              className={`${styles.statusDot} ${
                connectionState === "connected"
                  ? styles.connected
                  : styles.disconnected
              }`}
            />
            <span>
              {connectionState === "connected"
                ? "Đang kết nối real-time"
                : connectionState === "connecting"
                  ? "Đang kết nối..."
                  : "Mất kết nối real-time"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentQRCodePage;
