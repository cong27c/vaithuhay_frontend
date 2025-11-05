"use client";

import { useState, useEffect } from "react";
import styles from "./Shipping.module.scss";
import { calculateShipping, getMethods } from "@/Services/shippingService";

export default function Shipping({ address, cartItems, onShippingSelect }) {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [availableMethods, setAvailableMethods] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState(null);

  // 🟢 Hàm chuẩn hóa dữ liệu cartItems
  const normalizeCartItems = (items) => {
    if (!items || !items.length) return [];

    // Nếu là combo (có thuộc tính isCombo hoặc comboId)
    if (items[0]?.isCombo || items[0]?.comboId) {
      console.log("🛒 Phát hiện COMBO, chuẩn hóa dữ liệu...");

      const normalizedItems = [];
      items.forEach((combo) => {
        if (combo.products && Array.isArray(combo.products)) {
          combo.products.forEach((product) => {
            normalizedItems.push({
              id: product.id,
              name: product.name,
              price: product.price || 0,
              quantity: product.quantity || combo.quantity || 1, // Sử dụng quantity của product hoặc combo
              weight: product.weight || 0,
              image: product.image,
              // Thêm các trường bắt buộc khác nếu API yêu cầu
              variant: product.variant || "N/A",
              slug: product.slug || "",
            });
          });
        }
      });
      console.log("📦 Danh sách sản phẩm sau chuẩn hóa:", normalizedItems);
      return normalizedItems;
    }
    // Nếu là sản phẩm riêng lẻ
    else {
      console.log("🛒 Phát hiện sản phẩm riêng lẻ");
      const normalizedItems = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price || 0,
        quantity: item.quantity || 1,
        weight: item.weight || 0,
        image: item.image,
        variant: item.variant || "N/A",
        slug: item.slug || "",
      }));
      return normalizedItems;
    }
  };

  // 🟢 1. Tải danh sách phương thức vận chuyển
  useEffect(() => {
    const loadShippingMethods = async () => {
      setLoading(true);
      try {
        const res = await getMethods();
        const methods = res.data || res;
        setShippingMethods(methods);
      } catch (err) {
        console.error("Failed to load shipping methods:", err);
        setError("Không thể tải phương thức vận chuyển");
      } finally {
        setLoading(false);
      }
    };

    loadShippingMethods();
  }, []);

  // 🟢 2. Tính phí vận chuyển khi có address + cartItems
  useEffect(() => {
    const fetchShippingCalculation = async () => {
      if (!address?.province || !cartItems?.length) {
        setAvailableMethods([]);
        setSelectedShipping(null);
        onShippingSelect?.(null);
        return;
      }

      setCalculating(true);
      setError(null);

      try {
        // Chuẩn hóa dữ liệu cartItems trước khi gửi API
        const normalizedItems = normalizeCartItems(cartItems);

        if (normalizedItems.length === 0) {
          setError("Không có sản phẩm hợp lệ để tính phí vận chuyển");
          return;
        }

        const shippingData = {
          province: address?.province,
          district: address?.district,
          ward: address?.ward,
          items: normalizedItems, // Sử dụng dữ liệu đã chuẩn hóa
        };

        console.log("🚀 Gửi dữ liệu tính phí vận chuyển:", shippingData);

        const result = await calculateShipping(shippingData);

        if (!result?.success && !result?.methods) {
          setAvailableMethods([]);
          setError(result?.message || "Không thể tính phí vận chuyển");
          return;
        }

        const methodsWithFee = result.methods?.map((method) => ({
          ...method,
          isAvailable: true,
        }));

        setAvailableMethods(methodsWithFee);

        // Chọn mặc định phương thức đầu tiên
        if (methodsWithFee.length > 0) {
          const defaultMethod = methodsWithFee[0];
          setSelectedShipping(defaultMethod);
          onShippingSelect?.({
            shippingMethodId: defaultMethod.id,
            shippingFee: defaultMethod.fee,
            shippingMethod: defaultMethod,
          });
        } else {
          setSelectedShipping(null);
          onShippingSelect?.(null);
        }
      } catch (err) {
        console.error("❌ Calculate shipping error:", err);
        setError(err.message || "Không thể tính phí vận chuyển");
        setAvailableMethods([]);
        setSelectedShipping(null);
        onShippingSelect?.(null);
      } finally {
        setCalculating(false);
      }
    };

    fetchShippingCalculation();
  }, [address?.province, address?.district, address?.ward, cartItems]);

  // 🟢 3. Chọn phương thức vận chuyển
  const handleSelectMethod = (method) => {
    setSelectedShipping(method);
    onShippingSelect?.({
      shippingMethodId: method.id,
      shippingFee: method.fee,
      shippingMethod: method,
    });
  };

  // ---------------- UI ----------------
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Phương thức giao hàng</h3>
        <p className={styles.subtitle}>
          Hệ thống tự động chọn phương thức khả dụng dựa trên địa chỉ của bạn.
        </p>
      </div>

      {loading || calculating ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>
            {loading
              ? "Đang tải phương thức..."
              : "Đang tính phí vận chuyển..."}
          </p>
        </div>
      ) : error ? (
        <div className={styles.errorState}>
          <p>❌ {error}</p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Thử lại
          </button>
        </div>
      ) : availableMethods.length > 0 ? (
        <div className={styles.methodsList}>
          {availableMethods?.map((method) => {
            const isSelected = selectedShipping?.id === method.id;
            return (
              <div
                key={method.id}
                className={`${styles.methodCard} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => handleSelectMethod(method)}
              >
                <div className={styles.methodHeader}>
                  <h4>{method.name}</h4>
                  <span className={styles.fee}>
                    {method.fee?.toLocaleString("vi-VN")} ₫
                  </span>
                </div>
                <p className={styles.description}>{method.description}</p>
                <div className={styles.methodFooter}>
                  <span className={styles.estimated}>
                    📦 Dự kiến: {method.estimated_days || "—"} ngày
                  </span>
                  {method.max_weight && (
                    <span className={styles.weightInfo}>
                      Trọng lượng phù hợp: {method.min_weight || 0} -{" "}
                      {method.max_weight}g
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className={styles.emptyText}>
          Không có phương thức vận chuyển phù hợp
        </p>
      )}

      {selectedShipping && (
        <div className={styles.selectedSummary}>
          <span>Đã chọn:</span>
          <strong>{selectedShipping.name}</strong>
          <span>{selectedShipping.fee?.toLocaleString("vi-VN")} ₫</span>
          <span className={styles.estimatedDays}>
            (Dự kiến {selectedShipping.estimated_days} ngày)
          </span>
        </div>
      )}
    </div>
  );
}
