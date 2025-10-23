"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PaymentQRCodePage.module.scss";
import { toast } from "react-toastify";
import { checkTransactionExists, getOrderById } from "@/Services/orderService";
import socketClient from "@/utils/socketClient";

const PaymentQRCodePage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [connectionState, setConnectionState] = useState("disconnected");
  const channelRef = useRef(null);

  // 📡 Theo dõi trạng thái kết nối Pusher
  useEffect(() => {
    const updateConnectionState = () => {
      setConnectionState(socketClient.connection.state);
    };

    socketClient.connection.bind("state_change", updateConnectionState);
    updateConnectionState(); // Set initial state

    return () => {
      socketClient.connection.unbind("state_change", updateConnectionState);
    };
  }, []);

  // 📡 Khởi tạo Pusher channel cho order
  useEffect(() => {
    if (!orderId) return;

    const initializePusher = async () => {
      try {
        // Subscribe đến private channel của order
        const channel = socketClient.subscribe(`private-order-${orderId}`);
        channelRef.current = channel;

        // Listen event thanh toán thành công từ BE
        channel.bind("payment-success", (data) => {
          console.log("💰 Payment success received:", data);
          handlePaymentSuccess(data);
        });

        // Listen event payment error
        channel.bind("payment-error", (data) => {
          console.error("❌ Payment error received:", data);
          toast.error(`Lỗi thanh toán: ${data.error}`);
        });

        // Listen event cập nhật trạng thái
        channel.bind("payment-status-update", (data) => {
          console.log("🔄 Payment status update:", data);
          setPaymentStatus(data.status);
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

    // Cleanup khi component unmount
    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        socketClient.unsubscribe(`private-order-${orderId}`);
      }
    };
  }, [orderId]);

  // 🧭 Lấy dữ liệu order từ BE khi vào trang
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const data = await getOrderById(orderId);
        if (!data || !data.success) {
          toast.error("Không tìm thấy đơn hàng!");
          navigate("/");
          return;
        }
        setOrder(data.order);
        setPaymentStatus(data.order.payment_status || "pending");

        // Nếu order đã paid, chuyển hướng luôn
        if (data.order.payment_status === "paid") {
          setTimeout(() => {
            navigate(`/order/success/${orderId}`);
          }, 1000);
        }
      } catch (err) {
        console.error("Fetch order error:", err);
        toast.error("Không thể tải thông tin đơn hàng!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, navigate]);

  // 🎯 Xử lý khi nhận được thông báo thanh toán thành công
  const handlePaymentSuccess = (data) => {
    // Prevent multiple success handling
    if (paymentStatus === "paid") return;

    console.log("🎉 Handling payment success:", data);

    toast.success("💰 Thanh toán thành công! Đang chuyển hướng...");

    // Cập nhật UI ngay lập tức
    setPaymentStatus("paid");

    // Cập nhật order data với thông tin mới nhất
    setOrder((prev) =>
      prev
        ? {
            ...prev,
            payment_status: "paid",
            paid_at: data.paidAt,
            transaction_id: data.transactionId,
          }
        : null,
    );

    // Chuyển hướng sau 2 giây
    setTimeout(() => {
      navigate(`/order/success/${orderId}`);
    }, 2000);
  };

  // 🔁 Hàm kiểm tra thanh toán thủ công
  const handleCheckPayment = async () => {
    setIsLoading(true);
    try {
      const result = await checkTransactionExists(orderId);

      if (result?.success && result?.status === "paid") {
        handlePaymentSuccess(result);
      } else {
        toast.info("Thanh toán chưa được xác nhận. Vui lòng thử lại sau!");

        // Có thể trigger client event để yêu cầu BE kiểm tra (nếu supported)
        if (channelRef.current && channelRef.current.trigger) {
          try {
            channelRef.current.trigger("client-payment-check", {
              orderId,
              timestamp: new Date().toISOString(),
            });
          } catch (triggerError) {
            console.log("Client events not enabled");
          }
        }
      }
    } catch (error) {
      console.error("Check payment error:", error);
      toast.error("Không thể kiểm tra trạng thái thanh toán!");
    } finally {
      setIsLoading(false);
    }
  };

  // ⏰ Tự động kiểm tra định kỳ (optional - có thể bỏ nếu real-time ổn định)
  useEffect(() => {
    if (!orderId || paymentStatus === "paid") return;

    const interval = setInterval(async () => {
      try {
        console.log("🕒 Auto-checking payment status...");
        const result = await checkTransactionExists(orderId);
        if (result?.success && result?.status === "paid") {
          handlePaymentSuccess(result);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Auto check payment error:", error);
      }
    }, 30000); // Kiểm tra mỗi 30 giây

    return () => clearInterval(interval);
  }, [orderId, paymentStatus]);

  // Hàm format tiền
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);

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
          <div className={`${styles.status} ${styles[paymentStatus]}`}>
            Trạng thái:{" "}
            {paymentStatus === "paid"
              ? "Đã thanh toán ✅"
              : "Chờ thanh toán ⏳"}
          </div>
        </div>

        {/* QR Code Section */}
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
            <span className={styles.value}>{order.bank_name || "SePay"}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Số tài khoản:</span>
            <span className={styles.value}>{order.virtual_account || "—"}</span>
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

        {/* Check Payment Button */}
        <button
          className={styles.checkButton}
          onClick={handleCheckPayment}
          disabled={isLoading || paymentStatus === "paid"}
        >
          {isLoading
            ? "Đang kiểm tra..."
            : paymentStatus === "paid"
              ? "Đã thanh toán ✅"
              : "Kiểm tra thanh toán"}
        </button>

        {/* Additional Info */}
        <div className={styles.footer}>
          <p>
            {paymentStatus === "paid"
              ? "Thanh toán đã được xác nhận. Đang chuyển hướng..."
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
