"use client";

import { useState } from "react";
import styles from "./ChangeAddressModal.module.scss";
import AddressSelector from "../AddressSelector";

export default function ChangeAddressModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    province: "",
    district: "",
    ward: "",
    specificAddress: "",
    addressType: "home",
    isDefault: false,
  });

  const handleAddressSelect = (addressData) => {
    setFormData((prev) => ({
      ...prev,
      province: addressData.province,
      district: addressData.district,
      ward: addressData.ward,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Địa chỉ mới (dùng thông tin trước sắp nhập)
          </h2>
        </div>

        <div className={styles.content}>
          {/* Họ và tên + Số điện thoại */}
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="fullName"
                placeholder="Họ và tên"
                value={formData.fullName}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Số điện thoại"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </div>

          {/* Address Selector */}
          <div className={styles.addressSelector}>
            <AddressSelector onAddressSelect={handleAddressSelect} />
          </div>

          {/* Địa chỉ cụ thể */}
          <div className={styles.inputGroup}>
            <textarea
              name="specificAddress"
              placeholder="Địa chỉ cụ thể"
              value={formData.specificAddress}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={3}
            />
          </div>

          {/* Thêm vị trí button */}
          <button className={styles.addLocationBtn}>
            <span className={styles.plusIcon}>+</span>
            Thêm vị trí
          </button>

          {/* Loại địa chỉ */}
          <div className={styles.addressTypeSection}>
            <label className={styles.sectionLabel}>Loại địa chỉ:</label>
            <div className={styles.addressTypeButtons}>
              <button
                type="button"
                className={`${styles.typeButton} ${formData.addressType === "home" ? styles.active : ""}`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, addressType: "home" }))
                }
              >
                Nhà Riêng
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${formData.addressType === "office" ? styles.active : ""}`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, addressType: "office" }))
                }
              >
                Văn Phòng
              </button>
            </div>
          </div>

          {/* Đặt làm địa chỉ mặc định */}
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleInputChange}
              className={styles.checkbox}
            />
            <label htmlFor="isDefault" className={styles.checkboxLabel}>
              Đặt làm địa chỉ mặc định
            </label>
          </div>
        </div>

        {/* Footer buttons */}
        <div className={styles.footer}>
          <button className={styles.backButton} onClick={onClose}>
            Trở Lại
          </button>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Hoàn thành
          </button>
        </div>
      </div>
    </div>
  );
}
