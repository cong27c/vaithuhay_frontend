"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./OrderInfor.module.scss";
import { checkoutSchema } from "@/schema/checkoutSchema";
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { checkout } from "@/Services/stuffService";
import ChangeAddressModal from "../ChangeAddressModal";
import {
  convertAddressCodesToNames,
  convertAllAddressesToNames,
} from "../ConvertAddressCodesToNames";
import {
  deleteAddress,
  getAddressesByCustomer,
} from "@/Services/addressService";
import { toast } from "react-toastify";
import AddressSelector from "../AddressSelector"; // Import AddressSelector component
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Shipping from "../Shipping";

// Thêm hàm xóa địa chỉ

export default function OrderInfor({ onShippingFeeUpdate }) {
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
  const navigate = useNavigate();
  // State cho guest session
  const [addressSelectorKey, setAddressSelectorKey] = useState(0);
  const [guestFormData, setGuestFormData] = useState({
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
  });

  const isLoggedIn = !!currentUser;
  const { selectedProducts } = useSelector((state) => state.cart);
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

  const [shippingFee, setShippingFee] = useState(0);
  const [shippingMethodId, setShippingMethodId] = useState(0);

  const handleShippingSelect = (data) => {
    const fee = data?.shippingFee || 0;

    setShippingMethodId(data?.shippingMethod.id);
    setShippingFee(fee);
    if (onShippingFeeUpdate) {
      onShippingFeeUpdate(fee);
    }
  };

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await getAddressesByCustomer();

      if (response.success) {
        // Quy đổi mã số thành tên
        const addressesWithNames = convertAllAddressesToNames(response.data);

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

  // Hàm xử lý xóa địa chỉ
  const handleDeleteAddress = async (addressId, event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra phần tử cha

    if (!window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      return;
    }

    try {
      setLoading(true);
      const res = await deleteAddress(addressId);
      if (res.success) {
        toast.success(res.message || "Xóa địa chỉ thành công");
      } else {
        toast.error(res.message || "Xóa địa chỉ thất bại");
      }

      // Nếu đang xóa địa chỉ được chọn, reset selectedAddress
      if (selectedAddress?.id === addressId) {
        setSelectedAddress(null);
      }

      // Refresh danh sách địa chỉ
      await fetchAddresses();

      console.log("Address deleted successfully");
    } catch (error) {
      console.error("Failed to delete address:", error);
      alert("Có lỗi xảy ra khi xóa địa chỉ");
    } finally {
      setLoading(false);
    }
  };

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
  const handleOpenUpdateAddressModal = (address, event) => {
    if (event) event.stopPropagation(); // Ngăn chặn sự kiện click lan ra phần tử cha
    setEditingAddress(address);
    setIsUpdateAddressModalOpen(true);
  };

  // Hàm đóng modal cập nhật địa chỉ
  const handleCloseUpdateAddressModal = () => {
    setIsUpdateAddressModalOpen(false);
    setEditingAddress(null);
  };

  // Hàm xử lý sau khi thêm địa chỉ mới thành công
  const handleAddAddressSuccess = async (newAddressData) => {
    try {
      console.log("Adding new address, refreshing addresses list...");

      // Fetch lại toàn bộ addresses từ server để đảm bảo dữ liệu đồng bộ
      await fetchAddresses();

      setIsChangeAddressModalOpen(false);

      // Hiển thị thông báo thành công
      console.log("Address added successfully and list refreshed");
    } catch (error) {
      console.error("Failed to refresh addresses after adding:", error);
    }
  };

  // Hàm xử lý sau khi cập nhật địa chỉ thành công
  const handleUpdateAddressSuccess = async (updatedAddress) => {
    try {
      console.log("Updating address, refreshing addresses list...");

      // Fetch lại toàn bộ addresses từ server
      await fetchAddresses();

      handleCloseUpdateAddressModal();

      // Hiển thị thông báo thành công
      console.log("Address updated successfully and list refreshed");
    } catch (error) {
      console.error("Failed to refresh addresses after updating:", error);
    }
  };

  // Hàm xử lý input change cho guest session
  const handleGuestInputChange = (e) => {
    const { name, value } = e.target;
    setGuestFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm xử lý chọn địa chỉ từ AddressSelector cho guest session
  const handleGuestAddressSelect = (addressData) => {
    setGuestFormData((prev) => ({
      ...prev,
      province: addressData.province,
      district: addressData.district,
      ward: addressData.ward,
      provinceName: addressData.provinceName,
      districtName: addressData.districtName,
      wardName: addressData.wardName,
    }));
  };

  // Hàm chuẩn bị dữ liệu checkout theo format yêu cầu
  const prepareCheckoutData = (formData, isGuest) => {
    const checkoutData = {
      isGuest: isGuest,
      cartItems: selectedProducts,
      formData: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        streetAddress: formData.address || formData.specificAddress,
        deliveryMethod: formData.deliveryMethod || "home",
      },
      paymentMethod: formData.paymentMethod || "cod",
      shippingMethodId: shippingMethodId,
      shippingFee: shippingFee,
      shippingInfo: convertAddressCodesToNames({
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        street_address: formData.address || formData.specificAddress,
      }),
    };

    return checkoutData;
  };

  // Hàm checkout chung
  const handleCheckout = async (formData, isGuest = false) => {
    try {
      const checkoutData = prepareCheckoutData(formData, isGuest);

      const result = await checkout(checkoutData);

      // Nếu đơn hàng thanh toán COD thành công
      if (
        result.success &&
        result.orderId &&
        !result?.paymentSession?.qrCodeUrl
      ) {
        toast.success("Đặt hàng thành công! Đơn hàng sẽ được giao sớm.");
        navigate(`/order-success/${result.orderId}`);
        return;
      }

      // Nếu thanh toán online — trả về dữ liệu QR
      if (
        result?.paymentSession?.qrCodeUrl &&
        result?.paymentSession?.orderId
      ) {
        toast.info("Đang chuyển đến trang thanh toán...");
        navigate(`/order/payment/${result?.paymentSession?.orderId}`, {
          state: result,
        });
        return;
      }

      // Nếu có lỗi hoặc không xác định loại thanh toán
      toast.error(
        result.message || "Không thể xử lý đơn hàng, vui lòng thử lại!",
      );
      return result;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Đặt hàng thất bại. Vui lòng thử lại!");
    }
  };

  // Hàm submit cho logged-in user
  const onSubmit = async (data) => {
    await handleCheckout(data, false);
  };

  // Hàm submit cho guest session
  const handleGuestSubmit = (e) => {
    e.preventDefault();

    // Chuẩn bị dữ liệu từ guest form
    const guestData = {
      fullName: guestFormData.fullName,
      phone: guestFormData.phoneNumber,
      email: guestFormData.email,
      address: guestFormData.specificAddress,
      province: guestFormData.province,
      district: guestFormData.district,
      ward: guestFormData.ward,
      provinceName: guestFormData.provinceName,
      districtName: guestFormData.districtName,
      wardName: guestFormData.wardName,
      deliveryMethod: "home",
      paymentMethod: getValues("paymentMethod"),
    };

    handleCheckout(guestData, true);
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

  useEffect(() => {
    if (currentUser) {
      fetchAddresses();
    }
  }, [currentUser, setValue]);

  // Render phần address section dựa trên trạng thái đăng nhập
  const renderAddressSection = () => {
    if (currentUser) {
      // Customer đã đăng nhập - giữ nguyên logic cũ
      return (
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

          {loading ? (
            <div className={styles.loading}>Đang tải địa chỉ...</div>
          ) : addresses.length > 0 ? (
            <div className={styles.addressList}>
              {addresses?.map((address) => (
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
          <Shipping
            address={
              currentUser
                ? selectedAddress
                : {
                    province: guestFormData.province,
                    district: guestFormData.district,
                    ward: guestFormData.ward,
                  }
            }
            cartItems={selectedProducts}
            onShippingSelect={handleShippingSelect}
          />
        </div>
      );
    } else {
      // Guest session - hiển thị form nhập thông tin
      return (
        <div className={styles.addressSection}>
          <h3 className={styles.addressTitle}>Thông tin giao hàng</h3>

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={guestFormData.fullName}
              onChange={handleGuestInputChange}
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
                value={guestFormData.phoneNumber}
                onChange={handleGuestInputChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={guestFormData.email}
                onChange={handleGuestInputChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.addressSelector}>
            <AddressSelector
              key={addressSelectorKey}
              onAddressSelect={handleGuestAddressSelect}
              initialValues={
                guestFormData.province
                  ? {
                      province: guestFormData.province,
                      district: guestFormData.district,
                      ward: guestFormData.ward,
                      provinceName: guestFormData.provinceName,
                      districtName: guestFormData.districtName,
                      wardName: guestFormData.wardName,
                    }
                  : null
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              name="specificAddress"
              placeholder="Địa chỉ cụ thể (số nhà, tên đường, ...)"
              value={guestFormData.specificAddress}
              onChange={handleGuestInputChange}
              className={styles.textarea}
              rows={3}
              required
            />
          </div>

          <Shipping
            address={
              currentUser
                ? selectedAddress
                : {
                    province: guestFormData.province,
                    district: guestFormData.district,
                    ward: guestFormData.ward,
                  }
            }
            cartItems={selectedProducts}
            onShippingSelect={handleShippingSelect}
          />
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Vài Thứ Hay</h1>
        <div className={styles.breadcrumb}>
          <Link to={"/cart"}>Giỏ hàng</Link>
          <span className={styles.separator}>›</span>
          <span>Thông tin giao hàng</span>
        </div>
      </div>

      {currentUser ? (
        // Form cho customer đã đăng nhập
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Thông tin giao hàng</h2>
            </div>

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

            {renderAddressSection()}

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

          {/* Phương thức thanh toán - Dùng chung cho cả 2 luồng */}
          <PaymentMethods register={register} errors={errors} />

          <div className={styles.footer}>
            <Link to={"/cart"} className={styles.backLink}>
              Giỏ hàng
            </Link>

            <button type="submit" className={styles.submitButton}>
              Hoàn tất đơn hàng
            </button>
          </div>
        </form>
      ) : (
        // Form cho guest session
        <form onSubmit={handleGuestSubmit}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Thông tin giao hàng</h2>
            </div>

            <p className={styles.loginPrompt}>
              Bạn đã có tài khoản?{" "}
              <a href="/login" className={styles.link}>
                Đăng nhập
              </a>
            </p>

            {renderAddressSection()}
          </div>

          {/* Phương thức thanh toán - Dùng chung cho cả 2 luồng */}
          <PaymentMethods register={register} errors={errors} />

          <div className={styles.footer}>
            <a href="#" className={styles.backLink}>
              Giỏ hàng
            </a>
            <button type="submit" className={styles.submitButton}>
              Hoàn tất đơn hàng
            </button>
          </div>
        </form>
      )}

      {/* Các modal chỉ hiển thị cho customer đã đăng nhập */}
      {currentUser && (
        <>
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
                    {addresses?.map((address) => (
                      <div
                        key={address.id}
                        className={`${styles.addressOption} ${
                          selectedAddress?.id === address.id
                            ? styles.selected
                            : ""
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
                            onClick={(e) =>
                              handleOpenUpdateAddressModal(address, e)
                            }
                          >
                            Cập nhật
                          </button>
                          {!address.is_default && (
                            <button
                              className={styles.deleteButton}
                              onClick={(e) =>
                                handleDeleteAddress(address.id, e)
                              }
                              disabled={loading}
                            >
                              {loading ? "Đang xóa..." : "Xóa"}
                            </button>
                          )}
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
        </>
      )}
    </div>
  );
}

// Component tách riêng cho phần phương thức thanh toán
function PaymentMethods({ register, errors }) {
  return (
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

      <label className={styles.paymentOption}>
        <input
          type="radio"
          value="bank"
          {...register("paymentMethod")}
          className={styles.radio}
        />
        <div className={styles.paymentContent}>
          <div className={styles.paymentIcon}>🏦</div>
          <span>Sepay</span>
        </div>
      </label>
      {errors.paymentMethod && (
        <span className={styles.errorMessage}>
          {errors.paymentMethod.message}
        </span>
      )}
    </div>
  );
}
