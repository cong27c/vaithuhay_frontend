import { useState, useEffect } from "react";
import styles from "./AddressSection.module.scss";
import { getAddressesByCustomer } from "@/Services/addressService";
import ChangeAddressModal from "../ChangeAddressModal";

export default function AddressSection({
  currentUser,
  onAddressSelect,
  selectedAddress,
  setSelectedAddress,
  setValue,
}) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddressSelectorOpen, setIsAddressSelectorOpen] = useState(false);
  const [isChangeAddressModalOpen, setIsChangeAddressModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await getAddressesByCustomer();
        console.log(response);
        if (response.success) {
          setAddresses(response.data);
          // Set default address if available
          const defaultAddress =
            response.data.find((addr) => addr.is_default) || response.data[0];
          if (defaultAddress) {
            handleAddressSelect(defaultAddress);
          }
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [currentUser]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    if (setValue) {
      setValue("fullName", address.fullName);
      setValue("phone", address.phone);
      setValue("address", address.address);
      setValue("province", address.province);
      setValue("district", address.district);
      setValue("ward", address.ward);
    }
    if (onAddressSelect) {
      onAddressSelect(address);
    }
  };

  const handleAddAddress = async (newAddressData) => {
    try {
      const response = await addressService.createAddress({
        ...newAddressData,
        customerId: currentUser.id,
        is_default: addresses.length === 0,
      });

      if (response.success) {
        setAddresses((prev) => [...prev, response.data]);
        if (response.data.is_default) {
          handleAddressSelect(response.data);
        }
      }
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await addressService.deleteAddress(addressId);
      if (response.success) {
        setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
        if (selectedAddress?.id === addressId) {
          const newDefaultAddress = addresses[0];
          if (newDefaultAddress) {
            handleAddressSelect(newDefaultAddress);
          }
        }
      }
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  return (
    <div className={styles.addressSection}>
      {loading ? (
        <div className={styles.loading}>Loading addresses...</div>
      ) : (
        <>
          {addresses.length > 0 ? (
            <>
              <div className={styles.addressList}>
                <div className={styles.addressListHeader}>
                  <h3>Saved Addresses</h3>
                  <button
                    className={styles.addButton}
                    onClick={() => setIsChangeAddressModalOpen(true)}
                  >
                    Add New Address
                  </button>
                </div>

                {selectedAddress && (
                  <div className={styles.selectedAddress}>
                    <div className={styles.addressDetails}>
                      <div className={styles.name}>
                        {selectedAddress.fullName}
                      </div>
                      <div className={styles.phone}>
                        {selectedAddress.phone}
                      </div>
                      <div className={styles.address}>
                        {selectedAddress.address}
                      </div>
                      {selectedAddress.is_default && (
                        <span className={styles.defaultBadge}>Default</span>
                      )}
                    </div>
                    <div className={styles.addressActions}>
                      <button
                        onClick={() => setIsAddressSelectorOpen(true)}
                        className={styles.changeButton}
                      >
                        Change
                      </button>
                      {!selectedAddress.is_default && (
                        <button
                          onClick={() =>
                            handleDeleteAddress(selectedAddress.id)
                          }
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

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
                      <h3 className={styles.modalTitle}>
                        Chọn địa chỉ nhận hàng
                      </h3>
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
                              selectedAddress?.id === address.id
                                ? styles.selected
                                : ""
                            }`}
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
                                {address.street_address}, {address.ward},{" "}
                                {address.district}, {address.province}
                              </div>
                              <div className={styles.optionType}>
                                {getAddressTypeIcon(address.address_type)}{" "}
                                {getAddressTypeText(address.address_type)}
                              </div>

                              {/* Thêm nút Cập nhật */}
                              <button
                                type="button"
                                className={styles.updateButton}
                                onClick={(e) => {
                                  e.stopPropagation(); // Ngăn chặn sự kiện chọn địa chỉ
                                  handleOpenUpdateAddressModal(address);
                                }}
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
            </>
          ) : (
            <div className={styles.noAddress}>
              <p>No addresses saved yet.</p>
              <button
                onClick={() => setIsChangeAddressModalOpen(true)}
                className={styles.addButton}
              >
                Add New Address
              </button>
            </div>
          )}

          {isChangeAddressModalOpen && (
            <ChangeAddressModal
              isOpen={isChangeAddressModalOpen}
              onClose={() => setIsChangeAddressModalOpen(false)}
              onSubmit={handleAddAddress}
              customerId={currentUser.id}
            />
          )}
        </>
      )}
    </div>
  );
}
