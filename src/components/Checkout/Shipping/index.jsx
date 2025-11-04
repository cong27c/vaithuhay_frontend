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

  // 🟢 1. Tải danh sách phương thức vận chuyển (chưa tính phí)
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

  // 🟢 2. Khi có address + cartItems → gọi calculateShipping
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
        const shippingData = {
          province: address?.province,
          district: address?.district,
          ward: address?.ward,
          items: cartItems,
        };

        const result = await calculateShipping(shippingData);
        console.log("Shipping calculate result:", result);

        if (!result?.success && !result?.methods) {
          setAvailableMethods([]);
          setError(result?.message || "Không thể tính phí vận chuyển");
          return;
        }

        // 🟢 SỬA LẠI: Sử dụng trực tiếp methods từ result (không cần map với shippingMethods)
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
        console.error("Failed to calculate shipping:", err);
        setError("Không thể tính phí vận chuyển");
        setAvailableMethods([]);
        setSelectedShipping(null);
        onShippingSelect?.(null);
      } finally {
        setCalculating(false);
      }
    };

    fetchShippingCalculation();
  }, [address?.province, address?.district, address?.ward, cartItems]); // 🟢 Loại bỏ shippingMethods khỏi dependency

  // 🟢 3. Chọn phương thức sau khi có danh sách khả dụng
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
        <div className={styles.errorState}>{error}</div>
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
