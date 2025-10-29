"use client";

import { useState, useMemo } from "react";
import styles from "./ComboModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addCombo,
  fetchCartCombos,
  refreshCart,
} from "@/features/cart/cartThunks";

const ComboModal = ({
  products = [],
  onAddToCart,
  comboName = "COMBO ƯU ĐÃI",
  onClose,
  comboId,
  discountCombo, // % giảm giá combo (ví dụ: 10, 20, 30...)
}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.cart);
  // Chỉ lưu quantity cho combo, không cho từng sản phẩm
  const [comboQuantity, setComboQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    const numValue = Math.max(1, Number.parseInt(value) || 1);
    setComboQuantity(numValue);
  };

  const handleIncrement = () => {
    setComboQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setComboQuantity((prev) => Math.max(1, prev - 1));
  };

  const calculations = useMemo(() => {
    let originalTotal = 0;

    // Tính tổng giá gốc của tất cả sản phẩm trong combo
    products.forEach((product) => {
      const originalPrice = product.originalPrice || product.finalPrice;
      originalTotal += originalPrice;
    });

    // Tính giá sau giảm dựa trên discountCombo
    const discountRate = discountCombo ? discountCombo / 100 : 0;
    const discountedPricePerCombo = originalTotal * (1 - discountRate);

    // Nhân với số lượng combo
    const totalOriginal = originalTotal * comboQuantity;
    const totalDiscounted = discountedPricePerCombo * comboQuantity;
    const savings = totalOriginal - totalDiscounted;

    return {
      originalTotal: totalOriginal,
      discountedTotal: totalDiscounted,
      savings,
      actualDiscount: discountCombo || 0, // Sử dụng discountCombo từ prop
    };
  }, [products, comboQuantity, discountCombo]); // Thêm discountCombo vào dependency

  // Hàm xử lý thêm combo vào giỏ hàng
  const handleAddComboToCart = async () => {
    try {
      if (!comboId) {
        toast.error("Combo không xác định!");
        return;
      }

      // Chuẩn bị payload: comboId + products với quantity mặc định là 1 cho từng sản phẩm
      const comboProducts = products.map((product) => ({
        productId: product.id,
        variantId: product.variantId || null,
        quantity: 1, // Mỗi sản phẩm trong combo luôn có quantity = 1
      }));

      const payload = {
        comboId,
        quantity: comboQuantity, // Số lượng combo muốn thêm
      };

      // Dispatch addCombo
      const resultAction = await dispatch(addCombo(payload));

      if (addCombo.fulfilled.match(resultAction)) {
        toast.success("Thêm combo vào giỏ hàng thành công!");
        dispatch(refreshCart());
        onClose?.(); // đóng modal
      } else {
        throw new Error(resultAction.payload || "Thêm combo thất bại");
      }
    } catch (err) {
      console.error("Error adding combo to cart:", err);
      toast.error(err.message || "Thêm combo thất bại");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.modalTitle}>{comboName}</h2>

        {/* Products List - Hiển thị sản phẩm không có quantity control */}
        <div className={styles.productsList}>
          {products.map((product, index) => (
            <div key={product.id || index} className={styles.productItem}>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className={styles.productImage}
              />

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>

                <div className={styles.priceSection}>
                  {product.originalPrice > product.finalPrice && (
                    <span className={styles.originalPrice}>
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className={styles.currentPrice}>
                    {formatPrice(product.finalPrice)}
                  </span>
                </div>
              </div>

              {/* Đã xóa quantity control cho từng sản phẩm */}
            </div>
          ))}
        </div>

        {/* Combo Quantity Control */}

        {/* Summary Section */}
        <div className={styles.summarySection}>
          <div className={styles.summaryLeft}>
            <p className={styles.summaryLabel}>Giá gốc khi mua lẻ từng item:</p>
            <p className={styles.summaryPrice}>
              {formatPrice(calculations.originalTotal)}
            </p>
          </div>

          <div className={styles.summaryRight}>
            <p className={styles.summaryLabel}>Giá Ưu đãi khi mua Combo:</p>
            <div className={styles.discountedPriceWrapper}>
              <p className={styles.discountedPrice}>
                {formatPrice(calculations.discountedTotal)}
              </p>
              {calculations.actualDiscount > 0 && (
                <span className={styles.discountBadge}>
                  Tiết kiệm {calculations.actualDiscount}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Savings Info */}
        {calculations.savings > 0 && (
          <div className={styles.savingsInfo}>
            <span className={styles.savingsText}>
              Tiết kiệm: {formatPrice(calculations.savings)}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <div className={styles.comboQuantitySection}>
            <div className={styles.quantityControl}>
              <button
                className={styles.quantityBtn}
                onClick={handleDecrement}
                disabled={loading}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={comboQuantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className={styles.quantityInput}
                disabled={loading}
              />
              <button
                className={styles.quantityBtn}
                onClick={handleIncrement}
                disabled={loading}
              >
                +
              </button>
            </div>
          </div>
          <button
            className={styles.addToCartBtn}
            onClick={handleAddComboToCart}
            disabled={loading || !products.length}
          >
            <span className={styles.cartIcon}>🛒</span>
            {loading ? "ĐANG THÊM..." : "THÊM VÀO GIỎ HÀNG"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComboModal;
