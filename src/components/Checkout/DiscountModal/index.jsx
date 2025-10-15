"use client";

import { useEffect, useState } from "react";
import styles from "./DiscountModal.module.scss";
import { getVouchers } from "@/Services/voucherService";
import { applyVoucher } from "@/Services/voucherService"; // Import hàm applyVoucher
import { toast } from "react-toastify";

export default function DiscountModal({ onClose, onApply, cartId }) {
  // Thêm cartId prop
  const [vouchers, setVouchers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [applyingCoupon, setApplyingCoupon] = useState(null); // Track đang áp dụng coupon nào

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getVouchers();
        setVouchers(res || []);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        setVouchers([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApplyVoucher = async (voucherCode) => {
    if (!cartId) {
      toast.error("Không tìm thấy giỏ hàng");
      return;
    }

    setApplyingCoupon(voucherCode);

    try {
      // Gọi API apply voucher
      const result = await applyVoucher(cartId, voucherCode);
      console.log(result);

      if (result.success) {
        toast.success("Áp dụng mã giảm giá thành công!");
        // Gọi callback để cập nhật UI ở component cha
        if (onApply) {
          onApply(voucherCode, result.data); // Truyền thêm data từ server nếu có
        }

        onClose();
      } else {
        toast.error(result.message || "Áp dụng mã giảm giá thất bại");
      }
    } catch (error) {
      console.error("Error applying voucher:", error);
      toast.error(
        error.response?.data?.message ||
          "Có lỗi xảy ra khi áp dụng mã giảm giá",
      );
    } finally {
      setApplyingCoupon(null);
    }
  };

  // Hiển thị tối đa 2 voucher ban đầu, hoặc tất cả nếu showAll = true
  const displayedVouchers = showAll ? vouchers : vouchers.slice(0, 2);
  const hasMoreVouchers = vouchers.length > 2;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Chọn giảm giá</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <h3 className={styles.sectionTitle}>Mã giảm giá của shop</h3>

          {isLoading ? (
            <div className={styles.loading}>Đang tải mã giảm giá...</div>
          ) : vouchers.length === 0 ? (
            <div className={styles.emptyState}>
              Không có mã giảm giá khả dụng
            </div>
          ) : (
            <>
              <div className={styles.discountList}>
                {displayedVouchers.map((voucher, index) => (
                  <div
                    key={voucher.id || index}
                    className={styles.discountItem}
                  >
                    <div className={styles.discountHeader}>
                      <div className={styles.discountIcon}>
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="15"
                            stroke="#ff4d4f"
                            strokeWidth="2"
                            fill="none"
                          />
                          <text
                            x="16"
                            y="20"
                            fontSize="16"
                            fill="#ff4d4f"
                            textAnchor="middle"
                            fontWeight="bold"
                          >
                            %
                          </text>
                        </svg>
                      </div>
                      <div className={styles.discountInfo}>
                        <div className={styles.discountCode}>
                          {voucher.code}
                        </div>
                        <div className={styles.discountTitle}>
                          • {voucher.description}
                        </div>
                        {voucher.expiry && (
                          <div className={styles.expiry}>{voucher.expiry}</div>
                        )}
                      </div>
                      <button
                        className={styles.applyButton}
                        onClick={() => handleApplyVoucher(voucher.code)}
                        disabled={applyingCoupon === voucher.code}
                      >
                        {applyingCoupon === voucher.code
                          ? "Đang áp dụng..."
                          : "Áp dụng"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {hasMoreVouchers && (
                <button
                  className={styles.viewMoreButton}
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Thu gọn ▲" : `Xem thêm ▼`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
