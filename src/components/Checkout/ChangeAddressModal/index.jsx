"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ChangeAddressModal.module.scss";
import AddressSelector from "../AddressSelector";
import * as addressService from "@/Services/addressService";
import { toast } from "react-toastify";

export default function ChangeAddressModal({
  isOpen,
  onClose,
  onSubmit,
  customerId,
  editingAddress = null,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    provinceName: "",
    districtName: "",
    wardName: "",
    specificAddress: "",
    addressType: "home",
    isDefault: false,
  });

  const [addressSelectorKey, setAddressSelectorKey] = useState(0);
  const isInitialMount = useRef(true);
  const previousEditingAddress = useRef(editingAddress);

  // Khởi tạo form data khi editingAddress thay đổi
  useEffect(() => {
    // Chỉ khởi tạo khi modal mở và có editingAddress mới
    if (
      isOpen &&
      editingAddress &&
      previousEditingAddress.current?.id !== editingAddress.id
    ) {
      console.log("Editing address data:", editingAddress);

      // Parse address string để lấy specific address
      let specificAddress = "";
      if (editingAddress.address) {
        const addressParts = editingAddress.address.split(", ");
        specificAddress = addressParts[0] || "";
      } else if (editingAddress.street_address) {
        specificAddress = editingAddress.street_address;
      }

      const newFormData = {
        fullName: editingAddress.full_name || "",
        phoneNumber: editingAddress.phone || "",
        email: editingAddress.email || "",
        province: editingAddress.province_code || editingAddress.province || "",
        district: editingAddress.district_code || editingAddress.district || "",
        ward: editingAddress.ward_code || editingAddress.ward || "",
        provinceName: editingAddress.province || "",
        districtName: editingAddress.district || "",
        wardName: editingAddress.ward || "",
        specificAddress: specificAddress,
        addressType:
          editingAddress.address_type || editingAddress.type || "home",
        isDefault: editingAddress.is_default || false,
      };

      console.log("Form data to set:", newFormData);
      setFormData(newFormData);
      setAddressSelectorKey((prev) => prev + 1);

      previousEditingAddress.current = editingAddress;
    }
  }, [editingAddress, isOpen]);

  // Reset form khi mở modal tạo mới
  useEffect(() => {
    if (isOpen && !editingAddress && isInitialMount.current) {
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        province: "",
        district: "",
        ward: "",
        provinceName: "",
        districtName: "",
        wardName: "",
        specificAddress: "",
        addressType: "home",
        isDefault: false,
      });
      setAddressSelectorKey((prev) => prev + 1);
    }
    isInitialMount.current = false;
  }, [isOpen, editingAddress?.id]);

  const handleAddressSelect = (addressData) => {
    // Chỉ cập nhật các field địa chỉ, không cập nhật toàn bộ formData
    setFormData((prev) => ({
      ...prev,
      province: addressData.province,
      district: addressData.district,
      ward: addressData.ward,
      provinceName: addressData.provinceName,
      districtName: addressData.districtName,
      wardName: addressData.wardName,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    // Validate form trước khi submit
    if (!formData.fullName.trim()) {
      toast.error("Vui lòng nhập họ và tên");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }

    if (!formData.specificAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ cụ thể");
      return;
    }

    if (!formData.province || !formData.district || !formData.ward) {
      toast.error("Vui lòng chọn đầy đủ tỉnh/thành, quận/huyện, phường/xã");
      return;
    }

    try {
      const addressData = {
        fullName: formData.fullName.trim(),
        phone: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        address: formData.specificAddress.trim(),
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        is_default: formData.isDefault,
        customerId: customerId,
        type: formData.addressType,
      };

      console.log("Submitting address data:", addressData);

      let response;

      if (editingAddress) {
        response = await addressService.updateAddress(
          editingAddress.id,
          addressData,
        );
      } else {
        console.log("addressData create", addressData);
        response = await addressService.createAddress(addressData);
      }

      if (response.success) {
        if (onSubmit) {
          onSubmit(response.data);
        }

        const successMessage = editingAddress
          ? "Cập nhật địa chỉ thành công"
          : "Thêm địa chỉ thành công";
        toast.success(successMessage);

        onClose();
      }
    } catch (error) {
      console.error("Failed to save address:", error);
      const errorMessage = editingAddress
        ? "Cập nhật địa chỉ thất bại"
        : "Thêm địa chỉ thất bại";
      toast.error(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {editingAddress ? "Cập nhật địa chỉ" : "Địa chỉ mới"}
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Số điện thoại"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.addressSelector}>
            <AddressSelector
              key={addressSelectorKey}
              onAddressSelect={handleAddressSelect}
              initialValues={
                editingAddress && formData.province
                  ? {
                      province: formData.province,
                      district: formData.district,
                      ward: formData.ward,
                      provinceName: formData.provinceName,
                      districtName: formData.districtName,
                      wardName: formData.wardName,
                    }
                  : null
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <textarea
              name="specificAddress"
              placeholder="Địa chỉ cụ thể (số nhà, tên đường, ...)"
              value={formData.specificAddress}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={3}
              required
            />
          </div>

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

        <div className={styles.footer}>
          <button className={styles.backButton} onClick={onClose}>
            Trở Lại
          </button>
          <button className={styles.submitButton} onClick={handleSubmit}>
            {editingAddress ? "Cập nhật" : "Hoàn thành"}
          </button>
        </div>
      </div>
    </div>
  );
}
