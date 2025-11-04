"use client";

import { useEffect, useState } from "react";
import styles from "./OrderSummary.module.scss";
import DiscountModal from "../DiscountModal";
import { getCart } from "@/Services/cartService";
import { applyVoucher } from "@/Services/voucherService";
import { toast } from "react-toastify";
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { useSelector } from "react-redux";

export default function OrderSummary({
  onShowDiscounts,
  appliedDiscount,
  onApplyDiscount,
  showDiscountModal,
  onCloseDiscountModal,
  cartId,
  shippingFee = 0, // 🟢 CHỈ nhận shippingFee, mặc định = 0
}) {
  const [discountInput, setDiscountInput] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [applyingDiscount, setApplyingDiscount] = useState(false);
  const currentUser = useCurrentUser();
  const isLoggedIn = !!currentUser;

  // Thêm state để lưu thông tin discount từ API
  const [discountInfo, setDiscountInfo] = useState(null);

  // Tính toán giá trị
  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  // 🟢 TÍNH TOÁN ĐƠN GIẢN
  const discountAmount = discountInfo?.discount || 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const { selectedProducts } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setCartItems(selectedProducts || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedProducts]);

  const handleApplyDiscount = async () => {
    if (!discountInput.trim()) {
      setDiscountError("Vui lòng nhập mã giảm giá");
      return;
    }

    setApplyingDiscount(true);
    setDiscountError("");

    try {
      const result = await applyVoucher(cartId, discountInput.trim());
      console.log(result);

      if (result.success) {
        toast.success("Áp dụng mã giảm giá thành công!");
        setDiscountInfo(result.data);

        if (onApplyDiscount) {
          onApplyDiscount(discountInput.trim(), result.data);
        }

        setDiscountInput("");
      } else {
        setDiscountError(result.message || "Mã giảm giá không khả dụng");
      }
    } catch (error) {
      console.error("Error applying discount:", error);
      setDiscountError(
        error.response?.data?.message ||
          "Có lỗi xảy ra khi áp dụng mã giảm giá",
      );
    } finally {
      setApplyingDiscount(false);
    }
  };

  const handleApplyFromModal = async (voucherCode, voucherData) => {
    setDiscountInfo(voucherData);
    if (onApplyDiscount) {
      onApplyDiscount(voucherCode, voucherData);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.productList}>
          {cartItems?.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <div className={styles.productImage}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                />
                <span className={styles.quantity}>{product.quantity}</span>
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productCategory}>{product.variant}</p>
              </div>
              <div className={styles.productPrice}>
                {product.price.toLocaleString("vi-VN")}₫
              </div>
            </div>
          ))}
        </div>

        <div className={styles.discountSection}>
          <div className={styles.discountInput}>
            <input
              type="text"
              placeholder="Mã giảm giá"
              value={discountInput}
              onChange={(e) => {
                setDiscountInput(e.target.value);
                setDiscountError("");
              }}
              className={styles.input}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleApplyDiscount();
                }
              }}
            />
            <button
              onClick={handleApplyDiscount}
              className={styles.applyButton}
              disabled={applyingDiscount}
            >
              {applyingDiscount ? "Đang áp dụng..." : "Sử dụng"}
            </button>
          </div>
          {discountError && <p className={styles.error}>{discountError}</p>}

          {appliedDiscount && (
            <div className={styles.appliedDiscount}>
              ✓ Đã áp dụng mã: <strong>{appliedDiscount}</strong>
              {discountInfo?.discount && (
                <span className={styles.discountAmount}>
                  (Giảm {discountInfo.discount.toLocaleString("vi-VN")}₫)
                </span>
              )}
            </div>
          )}

          <button onClick={onShowDiscounts} className={styles.viewMoreLink}>
            Xem thêm mã giảm giá
          </button>
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString("vi-VN")}₫</span>
          </div>

          {discountInfo?.discount > 0 && (
            <div className={styles.summaryRow}>
              <span>Giảm giá</span>
              <span className={styles.discountText}>
                -{discountInfo.discount.toLocaleString("vi-VN")}₫
              </span>
            </div>
          )}

          {/* 🟢 HIỂN THỊ PHÍ VẬN CHUYỂN */}
          <div className={styles.summaryRow}>
            <span>Phí vận chuyển:</span>
            <span>
              {shippingFee > 0
                ? `${shippingFee.toLocaleString("vi-VN")}₫`
                : "Đang tính..."}
            </span>
          </div>
        </div>

        <div className={styles.total}>
          <span>Tổng cộng</span>
          <div className={styles.totalAmount}>
            <span className={styles.currency}>VND</span>
            <span className={styles.amount}>
              {finalTotal.toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>

        <div className={styles.loyaltyNote}>
          <h4>Khách hàng thân thiết</h4>
          <p>(Không thể sử dụng chung với các khuyến mãi khác.)</p>
        </div>
      </div>

      {showDiscountModal && (
        <DiscountModal
          onClose={onCloseDiscountModal}
          onApply={handleApplyFromModal}
          cartId={cartId}
        />
      )}
    </>
  );
}
