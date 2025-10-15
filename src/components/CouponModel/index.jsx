import React, { useEffect, useRef } from "react";
import styles from "./couponModel.module.scss";

const CouponModal = ({ coupons = [], onClose, onCopyCoupon, onGetCoupon }) => {
  const modalRef = useRef(null);

  const transformCoupons = (apiCoupons) => {
    return apiCoupons.map((coupon) => ({
      id: coupon.id,
      title: coupon.description,
      code: coupon.code,
      status: "copy", // Mặc định tất cả đều là "copy"
      available: coupon.status === "active", // Sử dụng trường status từ API
      // Giữ nguyên tất cả các trường từ API
      ...coupon,
    }));
  };

  const transformedCoupons = transformCoupons(coupons);

  const handleCouponAction = (coupon) => {
    console.log("Coupon clicked:", coupon);
    console.log("Coupon code:", coupon.code);
    console.log("Coupon available:", coupon.available);

    // SỬA LỖI Ở ĐÂY: Kiểm tra available thay vì status
    if (coupon.available && onCopyCoupon) {
      onCopyCoupon(coupon);
    } else if (!coupon.available) {
      console.log("Coupon is not available");
      // Có thể hiển thị thông báo tại sao không available
    }
  };

  // Xử lý click outside modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Xử lý phím ESC
  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      // 27 là keyCode của phím ESC
      onClose();
    }
  };

  useEffect(() => {
    // Thêm event listeners khi component mount
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    // Ngăn scroll body khi modal mở
    document.body.style.overflow = "hidden";

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, []); // Empty dependency array để chỉ chạy một lần khi mount/unmount

  console.log("Coupons in modal:", coupons);
  console.log("Transformed coupons:", transformedCoupons);

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContainer}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.header}>
          <button
            className={styles.backButton}
            onClick={onClose}
            aria-label="Đóng modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className={styles.ticketIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect
                x="4"
                y="10"
                width="24"
                height="12"
                rx="2"
                fill="currentColor"
              />
              <circle cx="4" cy="16" r="2" fill="#F4C430" />
              <circle cx="28" cy="16" r="2" fill="#F4C430" />
            </svg>
          </div>
          <h2 className={styles.title} id="modal-title">
            Mã giảm giá dành riêng cho bạn
          </h2>
        </div>
        <div className={styles.couponList}>
          {transformedCoupons?.map((coupon) => (
            <div
              key={coupon.id}
              className={`${styles.couponCard} ${!coupon.available ? styles.disabled : ""}`}
            >
              <div className={styles.couponBadge}>
                <div className={styles.badgeCircle}>
                  <span className={styles.percentIcon}>%</span>
                </div>
              </div>

              <div className={styles.dashedDivider}></div>

              <div className={styles.couponContent}>
                <p className={styles.couponTitle}>{coupon.title}</p>
                {/* THÊM HIỂN THỊ MÃ CODE ĐỂ DEBUG */}
                <p className={styles.couponCode}>Mã: {coupon.code}</p>
                <p className={styles.couponStatus}>
                  Trạng thái: {coupon.available ? "Khả dụng" : "Không khả dụng"}
                </p>
              </div>

              <div className={styles.verticalDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <button
                className={`${styles.actionButton} ${!coupon.available ? styles.disabledButton : ""}`}
                onClick={() => handleCouponAction(coupon)}
                disabled={!coupon.available}
              >
                {coupon.available ? "Sao chép" : "Không khả dụng"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
