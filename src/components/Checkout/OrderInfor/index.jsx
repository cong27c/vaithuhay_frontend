"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./OrderInfor.module.scss";
import { checkoutSchema } from "@/schema/checkoutSchema";
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { checkout } from "@/Services/stuffService";
import * as addressService from "@/Services/addressService";
import ChangeAddressModal from "../ChangeAddressModal";
import { useSelector } from "react-redux";
import { convertAllAddressesToNames } from "../ConvertAddressCodesToNames";

export default function OrderInfor() {
  const currentUser = useCurrentUser();
  const [isChangeAddressModalOpen, setIsChangeAddressModalOpen] =
    useState(false);
  const [isAddressSelectorOpen, setIsAddressSelectorOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdateAddressModalOpen, setIsUpdateAddressModalOpen] =
    useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const isLoggedIn = !!currentUser;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: "home",
      paymentMethod: "cod",
      fullName: currentUser
        ? `${currentUser.last_name} ${currentUser.first_name}`
        : "",
      email: currentUser ? currentUser.email : "",
      phone: currentUser ? currentUser.phone : "",
      province: "",
      district: "",
      ward: "",
      provinceName: "",
      districtName: "",
      wardName: "",
    },
  });

  // Hàm mở modal thêm địa chỉ mới
  const handleOpenChangeAddressModal = () => {
    setEditingAddress(null);
    setIsChangeAddressModalOpen(true);
  };

  // Hàm đóng modal thêm địa chỉ mới
  const handleCloseChangeAddressModal = () => {
    setIsChangeAddressModalOpen(false);
  };

  // Hàm mở modal cập nhật địa chỉ
  const handleOpenUpdateAddressModal = (address) => {
    setEditingAddress(address);
    setIsUpdateAddressModalOpen(true);
  };

  // Hàm đóng modal cập nhật địa chỉ
  const handleCloseUpdateAddressModal = () => {
    setIsUpdateAddressModalOpen(false);
    setEditingAddress(null);
  };

  // Hàm xử lý sau khi thêm địa chỉ mới thành công
  const handleAddAddressSuccess = (newAddressData) => {
    // Tạo địa chỉ mới từ dữ liệu nhận được
    const newAddress = {
      id: Date.now(),
      full_name: newAddressData.fullName,
      phone: newAddressData.phoneNumber,
      email: newAddressData.email,
      street_address: newAddressData.specificAddress,
      province_code: newAddressData.province,
      district_code: newAddressData.district,
      ward_code: newAddressData.ward,
      province: newAddressData.provinceName,
      district: newAddressData.districtName,
      ward: newAddressData.wardName,
      is_default: newAddressData.isDefault,
      address_type: newAddressData.addressType,
    };

    // Cập nhật danh sách addresses
    if (newAddressData.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, is_default: false })),
      );
    }

    // Thêm địa chỉ mới vào danh sách
    setAddresses((prev) => [...prev, newAddress]);

    // Tự động chọn địa chỉ vừa thêm
    setSelectedAddress(newAddress);

    // Cập nhật form values
    setValue("fullName", newAddress.full_name);
    setValue("phone", newAddress.phone);
    setValue("email", newAddress.email);
    setValue("address", newAddress.street_address);
    setValue("province", newAddress.province_code);
    setValue("district", newAddress.district_code);
    setValue("ward", newAddress.ward_code);
    setValue("provinceName", newAddress.province);
    setValue("districtName", newAddress.district);
    setValue("wardName", newAddress.ward);

    setIsChangeAddressModalOpen(false);
  };

  // Hàm xử lý sau khi cập nhật địa chỉ thành công
  const handleUpdateAddressSuccess = (updatedAddress) => {
    // Cập nhật lại danh sách addresses
    const updatedAddresses = addresses.map((addr) =>
      addr.id === updatedAddress.id ? updatedAddress : addr,
    );
    const addressesWithNames = convertAllAddressesToNames(updatedAddresses);

    setAddresses(addressesWithNames);

    // Nếu địa chỉ đang chọn được cập nhật, cập nhật selectedAddress
    if (selectedAddress?.id === updatedAddress.id) {
      setSelectedAddress(updatedAddress);

      // Cập nhật form values với địa chỉ đã cập nhật
      setValue("fullName", updatedAddress.full_name);
      setValue("phone", updatedAddress.phone);
      setValue("email", updatedAddress.email);
      setValue("address", updatedAddress.street_address);
      setValue("province", updatedAddress.province_code);
      setValue("district", updatedAddress.district_code);
      setValue("ward", updatedAddress.ward_code);
      setValue("provinceName", updatedAddress.province);
      setValue("districtName", updatedAddress.district);
      setValue("wardName", updatedAddress.ward);
    }

    handleCloseUpdateAddressModal();
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    if (setValue) {
      setValue("fullName", address.full_name);
      setValue("phone", address.phone);
      setValue("email", address.email);
      setValue("address", address.street_address);
      setValue("province", address.province_code);
      setValue("district", address.district_code);
      setValue("ward", address.ward_code);
      setValue("provinceName", address.province);
      setValue("districtName", address.district);
      setValue("wardName", address.ward);
    }
    setIsAddressSelectorOpen(false);
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await addressService.getAddressesByCustomer();
        console.log("Raw addresses response:", response);

        if (response.success) {
          // Quy đổi mã số thành tên
          const addressesWithNames = convertAllAddressesToNames(response.data);
          console.log("Addresses with names:", addressesWithNames);

          setAddresses(addressesWithNames);

          // Set default address if available
          const defaultAddress =
            addressesWithNames.find((addr) => addr.is_default) ||
            addressesWithNames[0];

          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
            // Update form values với tên đã được quy đổi
            setValue("fullName", defaultAddress.full_name);
            setValue("phone", defaultAddress.phone);
            setValue("email", defaultAddress.email);
            setValue("address", defaultAddress.street_address);
            setValue("province", defaultAddress.province);
            setValue("district", defaultAddress.district);
            setValue("ward", defaultAddress.ward);
            setValue("provinceName", defaultAddress.provinceName);
            setValue("districtName", defaultAddress.districtName);
            setValue("wardName", defaultAddress.wardName);
          }
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [currentUser, setValue]);
  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    console.log("Dữ liệu gửi lên DB:", {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      province: data.province,
      district: data.district,
      ward: data.ward,
      provinceName: data.provinceName,
      districtName: data.districtName,
      wardName: data.wardName,
      deliveryMethod: data.deliveryMethod,
      paymentMethod: data.paymentMethod,
    });

    try {
      console.log(data);
      const result = await checkout(data, isLoggedIn);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);

    // Cập nhật thông tin vào useForm khi chọn địa chỉ - CẢ MÃ VÀ TÊN
    setValue("fullName", address.full_name);
    setValue("phone", address.phone);
    setValue("email", address.email);
    setValue("address", address.street_address);
    setValue("province", address.province_code);
    setValue("district", address.district_code);
    setValue("ward", address.ward_code);
    setValue("provinceName", address.province);
    setValue("districtName", address.district);
    setValue("wardName", address.ward);

    setIsAddressSelectorOpen(false);
  };

  const handleAddNewAddress = () => {
    handleOpenChangeAddressModal();
  };

  const getAddressTypeIcon = (type) => {
    switch (type) {
      case "home":
        return "🏠";
      case "office":
        return "🏢";
      default:
        return "📍";
    }
  };

  const getAddressTypeText = (type) => {
    switch (type) {
      case "home":
        return "Nhà riêng";
      case "office":
        return "Văn phòng";
      default:
        return "Địa chỉ";
    }
  };

  // Hàm format địa chỉ để hiển thị - DÙNG TÊN
  const formatAddressDisplay = (address) => {
    // Nếu address đã có provinceName (đã được quy đổi)
    if (address.provinceName && address.districtName && address.wardName) {
      return `${address.street_address}, ${address.wardName}, ${address.districtName}, ${address.provinceName}`;
    }

    // Fallback: dùng mã số nếu chưa quy đổi
    return `${address.street_address}, ${address.ward}, ${address.district}, ${address.province}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Vài Thứ Hay</h1>
        <div className={styles.breadcrumb}>
          <span>Giỏ hàng</span>
          <span className={styles.separator}>›</span>
          <span>Thông tin giao hàng</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Thông tin giao hàng</h2>
          </div>

          {currentUser ? (
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}></div>
              <div className={styles.userWelcome}>
                <span className={styles.userName}>
                  {currentUser.name || currentUser.email}
                </span>
                <a href="/logout" className={styles.logoutLink}>
                  Đăng xuất
                </a>
              </div>
            </div>
          ) : (
            <p className={styles.loginPrompt}>
              Bạn đã có tài khoản?{" "}
              <a href="/login" className={styles.link}>
                Đăng nhập
              </a>
            </p>
          )}

          {/* Phần hiển thị địa chỉ giống Shopee */}
          <div className={styles.addressSection}>
            <div className={styles.addressHeader}>
              <h3 className={styles.addressTitle}>Địa chỉ nhận hàng</h3>
              {addresses.length > 0 ? (
                <button
                  type="button"
                  className={styles.changeAddressBtn}
                  onClick={() => setIsAddressSelectorOpen(true)}
                >
                  Thay đổi
                </button>
              ) : null}
            </div>

            {addresses.length > 0 ? (
              <div className={styles.addressList}>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`${styles.addressItem} ${
                      selectedAddress?.id === address.id ? styles.selected : ""
                    } ${address.is_default ? styles.default : ""}`}
                    onClick={() => handleSelectAddress(address)}
                  >
                    <div className={styles.addressMain}>
                      <div className={styles.addressTop}>
                        <span className={styles.addressName}>
                          {address.full_name}
                        </span>
                        <span className={styles.addressPhone}>
                          {address.phone}
                        </span>
                        {address.is_default && (
                          <span className={styles.defaultBadge}>Mặc định</span>
                        )}
                      </div>
                      <div className={styles.addressDetail}>
                        <span className={styles.addressText}>
                          {formatAddressDisplay(address)}
                        </span>
                      </div>
                      <div className={styles.addressType}>
                        <span className={styles.typeIcon}>
                          {getAddressTypeIcon(address.address_type)}
                        </span>
                        <span className={styles.typeText}>
                          {getAddressTypeText(address.address_type)}
                        </span>
                      </div>
                      {/* Debug: Hiển thị mã số (có thể ẩn trong production) */}
                      <div className={styles.addressCodes}>
                        <small>
                          Mã: {address.province_code}/{address.district_code}/
                          {address.ward_code}
                        </small>
                      </div>
                    </div>
                    <div className={styles.addressRadio}>
                      <input
                        type="radio"
                        name="selectedAddress"
                        checked={selectedAddress?.id === address.id}
                        onChange={() => handleSelectAddress(address)}
                        className={styles.radioInput}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noAddress}>
                <div className={styles.noAddressContent}>
                  <div className={styles.noAddressIcon}>📍</div>
                  <div className={styles.noAddressText}>
                    <p>Bạn chưa có địa chỉ nào</p>
                    <button
                      type="button"
                      className={styles.addAddressBtn}
                      onClick={handleAddNewAddress}
                    >
                      + Thêm địa chỉ mới
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hiển thị thông tin từ form để debug */}
          <div style={{ display: "none" }}>
            <p>Full Name: {getValues("fullName")}</p>
            <p>Phone: {getValues("phone")}</p>
            <p>Email: {getValues("email")}</p>
            <p>Address: {getValues("address")}</p>
            <p>Province Code: {getValues("province")}</p>
            <p>District Code: {getValues("district")}</p>
            <p>Ward Code: {getValues("ward")}</p>
            <p>Province Name: {getValues("provinceName")}</p>
            <p>District Name: {getValues("districtName")}</p>
            <p>Ward Name: {getValues("wardName")}</p>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Phương thức thanh toán</h2>

          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="cod"
              {...register("paymentMethod")}
              className={styles.radio}
            />
            <div className={styles.paymentContent}>
              <div className={styles.paymentIcon}>💵</div>
              <span>Thanh toán khi giao hàng (COD)</span>
            </div>
          </label>

          <div className={styles.paymentNote}>
            Đơn hàng sẽ được giao cho khách hàng từ 2-4 ngày làm việc nếu khách
            hàng ở tỉnh xa, yêu cầu giao gấp liên hệ ngay hotline 0938223885
          </div>

          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="bank"
              {...register("paymentMethod")}
              className={styles.radio}
            />
            <div className={styles.paymentContent}>
              <div className={styles.paymentIcon}>🏦</div>
              <span>Chuyển khoản ngân hàng (Tự động xác nhận giao dịch)</span>
            </div>
          </label>

          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="momo"
              {...register("paymentMethod")}
              className={styles.radio}
            />
            <div className={styles.paymentContent}>
              <div className={styles.paymentIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#a50064" />
                  <text
                    x="12"
                    y="17"
                    fontSize="14"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    M
                  </text>
                </svg>
              </div>
              <span>Ví MoMo</span>
            </div>
          </label>

          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="vnpay"
              {...register("paymentMethod")}
              className={styles.radio}
            />
            <div className={styles.paymentContent}>
              <div className={styles.paymentIcon}>🏦</div>
              <div className={styles.paymentLogos}>
                <span>Thanh toán online qua cổng VNPay</span>
                <div className={styles.cardLogos}>
                  <span className={styles.cardBadge}>VNPAY</span>
                  <span className={styles.cardBadge}>VISA</span>
                  <span className={styles.cardBadge}>MC</span>
                  <span className={styles.cardBadge}>JCB</span>
                </div>
              </div>
            </div>
          </label>
          {errors.paymentMethod && (
            <span className={styles.errorMessage}>
              {errors.paymentMethod.message}
            </span>
          )}
        </div>

        <div className={styles.footer}>
          <a href="#" className={styles.backLink}>
            Giỏ hàng
          </a>
          <button type="submit" className={styles.submitButton}>
            Hoàn tất đơn hàng
          </button>
        </div>
      </form>

      {/* Address Selector Modal - chỉ hiện khi có địa chỉ */}
      {isAddressSelectorOpen && addresses.length > 0 && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsAddressSelectorOpen(false)}
        >
          <div
            className={styles.addressModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Chọn địa chỉ nhận hàng</h3>
              <button
                className={styles.modalClose}
                onClick={() => setIsAddressSelectorOpen(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.addressOptions}>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`${styles.addressOption} ${
                      selectedAddress?.id === address.id ? styles.selected : ""
                    }`}
                  >
                    <div
                      className={styles.optionMain}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <div className={styles.optionRadio}>
                        <input
                          type="radio"
                          name="modalAddress"
                          checked={selectedAddress?.id === address.id}
                          onChange={() => {}}
                        />
                      </div>
                      <div className={styles.optionContent}>
                        <div className={styles.optionTop}>
                          <span className={styles.optionName}>
                            {address.full_name}
                          </span>
                          <span className={styles.optionPhone}>
                            {address.phone}
                          </span>
                          {address.is_default && (
                            <span className={styles.optionDefault}>
                              Mặc định
                            </span>
                          )}
                        </div>
                        {console.log(address)}
                        <div className={styles.optionAddress}>
                          {address.street_address}, {address.wardName},{" "}
                          {address.districtName}, {address.provinceName}
                        </div>
                        <div className={styles.optionType}>
                          {getAddressTypeIcon(address.address_type)}{" "}
                          {getAddressTypeText(address.address_type)}
                        </div>
                      </div>
                    </div>
                    <div className={styles.optionActions}>
                      <button
                        className={styles.updateButton}
                        onClick={() => handleOpenUpdateAddressModal(address)}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={styles.addNewAddressBtn}
                onClick={handleOpenChangeAddressModal}
              >
                + Thêm địa chỉ mới
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Address Modal - hiện khi thêm địa chỉ mới */}
      <ChangeAddressModal
        isOpen={isChangeAddressModalOpen}
        onClose={handleCloseChangeAddressModal}
        onSubmit={handleAddAddressSuccess}
        customerId={currentUser?.id}
      />

      {/* Update Address Modal - hiện khi cập nhật địa chỉ */}
      <ChangeAddressModal
        isOpen={isUpdateAddressModalOpen}
        onClose={handleCloseUpdateAddressModal}
        onSubmit={handleUpdateAddressSuccess}
        customerId={currentUser?.id}
        editingAddress={editingAddress}
      />
    </div>
  );
}
