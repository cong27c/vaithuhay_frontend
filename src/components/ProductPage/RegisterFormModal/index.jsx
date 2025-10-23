"use client";

import { useState } from "react";
import styles from "./RegisterFormModal.module.scss";
import { toast } from "react-toastify";
import { preOderRegister } from "@/Services/preOrderService";

// Hàm gọi API đăng ký pre-order

const RegisterFormModal = ({
  isOpen,
  onClose,
  productId,
  tierId,
  originalPrice,
  discountedPrice,
  tierName,
  discountPercent,
  variantId,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Thêm state cho loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Vui lòng nhập tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true); // Bắt đầu loading

    try {
      // Chuẩn bị dữ liệu gửi đi
      const submissionData = {
        ...formData,
        product_id: productId,
        tier_id: tierId,
        timestamp: new Date().toISOString(),
        variant_id: variantId,
      };

      console.log("Form submitted:", submissionData);

      // Gọi API đăng ký pre-order
      const result = await preOderRegister(submissionData);
      if (result.success) {
        toast.success(result.message || "Đăng ký đặt trước thành công!");
      } else {
        toast.error(result.message || "Đăng ký đặt trước thất bại.");
      }

      // Reset form và đóng modal
      setFormData({ username: "", email: "", phone: "" });
      onClose();
    } catch (error) {
      toast.error("Đăng ký đặt trước thất bại. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Pricing Section */}
        <div className={styles.pricingSection}>
          <div className={styles.priceCard}>
            <p className={styles.priceLabel}>Giá dự kiến:</p>
            <p className={styles.priceValue}>{originalPrice}đ</p>
            <p className={styles.priceLabel}>Giá {tierName}:</p>
            <p className={styles.priceValue}>{discountedPrice}đ</p>
          </div>
          <div className={styles.savingBadge}>Saving {discountPercent}%</div>
        </div>

        {/* Form Section */}
        <div className={styles.formSection}>
          <h2 className={styles.title}>
            Đăng ký đặt trước để nhận ngay
            <br />
            gói giá Tiền Phong hấp dẫn
          </h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="username"
                placeholder="Họ và tên"
                value={formData.username}
                onChange={handleChange}
                className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
                disabled={isLoading} // Vô hiệu hóa input khi loading
              />
              {errors.username && (
                <span className={styles.errorMessage}>{errors.username}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                disabled={isLoading}
              />
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                disabled={isLoading}
              />
              {errors.phone && (
                <span className={styles.errorMessage}>{errors.phone}</span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading} // Vô hiệu hóa button khi loading
            >
              {isLoading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ PRE-ORDER"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormModal;
