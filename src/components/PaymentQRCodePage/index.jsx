"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PaymentQRCodePage.module.scss";
import { toast } from "react-toastify";
import { getPaymentStatus, getOrderById } from "@/Services/orderService"; // ĐÃ ĐỔI TÊN HÀM
import socketClient from "@/utils/socketClient";

const PaymentQRCodePage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [orderStatus, setOrderStatus] = useState("pending"); // THÊM ORDER STATUS
  const [connectionState, setConnectionState] = useState("disconnected");
  const channelRef = useRef(null);
  const hasRedirected = useRef(false); // NGĂN CHẶN CHUYỂN HƯỚNG TRÙNG LẶP

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

  // 📡 Khởi tạo Pusher channel cho order - ĐÃ CẬP NHẬT EVENT NAMES
  useEffect(() => {
    if (!orderId) return;

    const initializePusher = async () => {
      try {
        // Subscribe đến private channel của order
        const channel = socketClient.subscribe(`private-order-${orderId}`);
        channelRef.current = channel;

        // Listen event thanh toán thành công từ BE (GIỮ NGUYÊN)
        channel.bind("payment-success", (data) => {
          console.log("💰 Payment success received:", data);
          handlePaymentSuccess(data);
        });

        // Listen event payment error (GIỮ NGUYÊN)
        channel.bind("payment-error", (data) => {
          console.error("❌ Payment error received:", data);
          toast.error(`Lỗi thanh toán: ${data.error}`);
        });

        // THÊM EVENT MỚI: Cập nhật trạng thái order
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

    // Cleanup khi component unmount
    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        socketClient.unsubscribe(`private-order-${orderId}`);
      }
    };
  }, [orderId]);

  // 🧭 Lấy dữ liệu order từ BE khi vào trang - ĐÃ CẬP NHẬT
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const data = await getOrderById(orderId);

        if (!data || !data.success || !data.order) {
          toast.error("Không tìm thấy đơn hàng!");
          navigate("/");
          return;
        }
        console.log(data);

        setOrder(data.order);
        setPaymentStatus(data.order.payment_status || "pending");
        setOrderStatus(data.order.status || "pending"); // CẬP NHẬT ORDER STATUS

        // KIỂM TRA TRẠNG THÁI ĐỂ CHUYỂN HƯỚNG
        if (data.order.payment_status === "paid" && !hasRedirected.current) {
          handlePaymentSuccess({
            orderId: data.order.id,
            transactionId: data.order.transaction_id,
            paidAt: data.order.paid_at,
            amount: data.order.total_amount,
          });
        }

        // NẾU ORDER ĐÃ BỊ HỦY HOẶC LỖI
        if (
          data.order.status === "cancelled" ||
          data.order.payment_status === "amount_mismatch"
        ) {
          toast.error("Đơn hàng đã bị hủy do lỗi thanh toán!");
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
    fetchOrder();
  }, [orderId, navigate]);

  // 🎯 Xử lý khi nhận được thông báo thanh toán thành công - ĐÃ CẬP NHẬT
  const handlePaymentSuccess = (data) => {
    // Prevent multiple success handling
    if (paymentStatus === "paid" || hasRedirected.current) return;

    console.log("🎉 Handling payment success:", data);
    hasRedirected.current = true;

    toast.success("💰 Thanh toán thành công! Đang chuyển hướng...");

    // Cập nhật UI ngay lập tức
    setPaymentStatus("paid");
    setOrderStatus("confirmed"); // CẬP NHẬT ORDER STATUS

    // Cập nhật order data với thông tin mới nhất
    setOrder((prev) =>
      prev
        ? {
            ...prev,
            payment_status: "paid",
            status: "confirmed", // CẬP NHẬT ORDER STATUS
            paid_at: data.paidAt,
            transaction_id: data.transactionId,
          }
        : null,
    );

    // Chuyển hướng sau 2 giây
    setTimeout(() => {
      navigate(`/order-success/${orderId}`);
    }, 2000);
  };

  // 🔁 Hàm kiểm tra thanh toán thủ công - ĐÃ CẬP NHẬT SỬ DỤNG HÀM MỚI
  const handleCheckPayment = async () => {
    setIsLoading(true);
    try {
      const result = await getPaymentStatus(orderId); // SỬ DỤNG HÀM MỚI

      if (!result || !result.success) {
        toast.error("Không thể kiểm tra trạng thái thanh toán!");
        return;
      }

      // XỬ LÝ CÁC TRẠNG THÁI KHÁC NHAU
      if (result.payment_status === "paid") {
        handlePaymentSuccess({
          orderId: result.order_id,
          transactionId: result.transaction_id,
          paidAt: result.paid_at,
          amount: order?.total_amount,
        });
      } else if (result.payment_status === "amount_mismatch") {
        toast.error("Số tiền thanh toán không khớp với đơn hàng!");
        setPaymentStatus("amount_mismatch");
      } else if (result.order_status === "cancelled") {
        toast.error("Đơn hàng đã bị hủy!");
        setOrderStatus("cancelled");
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

  // ⏰ Tự động kiểm tra định kỳ - ĐÃ CẬP NHẬT
  useEffect(() => {
    if (!orderId || paymentStatus === "paid" || hasRedirected.current) return;

    const interval = setInterval(async () => {
      try {
        console.log("🕒 Auto-checking payment status...");
        const result = await getPaymentStatus(orderId); // SỬ DỤNG HÀM MỚI

        if (result?.success && result?.payment_status === "paid") {
          handlePaymentSuccess({
            orderId: result.order_id,
            transactionId: result.transaction_id,
            paidAt: result.paid_at,
            amount: order?.total_amount,
          });
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

  // Hàm hiển thị trạng thái - ĐÃ CẬP NHẬT
  const renderStatusText = () => {
    if (paymentStatus === "paid") return "Đã thanh toán ✅";
    if (paymentStatus === "amount_mismatch") return "Lỗi số tiền ❌";
    if (orderStatus === "cancelled") return "Đơn hàng đã hủy 🚫";
    return "Chờ thanh toán ⏳";
  };

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
  if (orderStatus === "cancelled" || paymentStatus === "amount_mismatch") {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorState}>
            <h2>Không thể tiếp tục thanh toán</h2>
            <p>
              {paymentStatus === "amount_mismatch"
                ? "Số tiền thanh toán không khớp với giá trị đơn hàng."
                : "Đơn hàng đã bị hủy."}
            </p>
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

          {/* Real-time Status Indicator - ĐÃ CẬP NHẬT */}
          <div
            className={`${styles.status} ${styles[paymentStatus]} ${styles[orderStatus]}`}
          >
            Trạng thái: {renderStatusText()}
          </div>

          {/* HIỂN THỊ THÔNG TIN BỔ SUNG */}
          {(paymentStatus === "amount_mismatch" ||
            orderStatus === "cancelled") && (
            <div className={styles.statusDetail}>
              <p>Vui lòng kiểm tra lại đơn hàng hoặc liên hệ hỗ trợ.</p>
            </div>
          )}
        </div>

        {/* QR Code Section - ẨN NẾU ĐÃ THANH TOÁN HOẶC LỖI */}
        {paymentStatus === "pending" && orderStatus === "pending" && (
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

        {/* Check Payment Button - ĐÃ CẬP NHẬT DISABLED STATES */}
        <button
          className={styles.checkButton}
          onClick={handleCheckPayment}
          disabled={
            isLoading || paymentStatus === "paid" || orderStatus === "cancelled"
          }
        >
          {isLoading
            ? "Đang kiểm tra..."
            : paymentStatus === "paid"
              ? "Đã thanh toán ✅"
              : orderStatus === "cancelled"
                ? "Đơn hàng đã hủy"
                : "Kiểm tra thanh toán"}
        </button>

        {/* Additional Info - ĐÃ CẬP NHẬT NỘI DUNG */}
        <div className={styles.footer}>
          <p>
            {paymentStatus === "paid"
              ? "Thanh toán đã được xác nhận. Đang chuyển hướng..."
              : paymentStatus === "amount_mismatch"
                ? "Số tiền thanh toán không khớp. Vui lòng liên hệ hỗ trợ."
                : orderStatus === "cancelled"
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
