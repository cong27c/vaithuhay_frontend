"use client";

import { useEffect, useState } from "react";
import styles from "./ComboSection.module.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "@/components/ConfirmModal";
import { useDispatch } from "react-redux";
import { toggleSelectCombo } from "@/features/cart/cartSlice";
import { removeCombo, updateComboQuantity } from "@/features/cart/cartThunks";

const ComboSection = ({ comboData, onComboChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [comboChecked, setComboChecked] = useState(false);

  // Redux
  const dispatch = useDispatch();

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    itemToRemove: null,
  });

  useEffect(() => {
    if (comboData) {
      setComboChecked(comboData.checked || false);
    }
  }, [comboData.checked]);

  const handleComboCheckboxChange = () => {
    const newCheckedState = !comboChecked;
    setComboChecked(newCheckedState);

    // Dispatch action để toggle combo
    dispatch(
      toggleSelectCombo({
        id: comboData.id,
        checked: newCheckedState,
      }),
    );

    if (onComboChange) {
      onComboChange(comboData.id, newCheckedState);
    }
  };

  // Hàm mở confirm modal để xóa cả combo
  const handleRemoveComboClick = () => {
    setConfirmModal({
      isOpen: true,
      itemToRemove: {
        id: comboData.id,
        name: comboData.name || "Combo sản phẩm",
      },
    });
  };

  // Hàm xác nhận xóa cả combo
  const confirmRemove = async () => {
    const { id } = confirmModal.itemToRemove;
    console.log("confirmModal.itemToRemove", id);

    if (!id) {
      console.error("Invalid combo ID");
      return;
    }

    try {
      setIsUpdating(true);
      // Dispatch action removeCombo từ Redux thunk
      await dispatch(removeCombo(id)).unwrap();

      setConfirmModal({ isOpen: false, itemToRemove: null });
      toast.success("Đã xóa combo khỏi giỏ hàng");
    } catch (error) {
      console.error("Error removing combo:", error);
      toast.error(error || "Có lỗi xảy ra khi xóa combo");
    } finally {
      setIsUpdating(false);
    }
  };

  // Hàm hủy xóa
  const cancelRemove = () => {
    setConfirmModal({ isOpen: false, itemToRemove: null });
  };

  // Hàm thay đổi số lượng cho cả combo
  const handleComboQuantityChange = async (delta) => {
    console.log(comboData);
    const newQuantity = Number(comboData.quantity) + delta;

    if (newQuantity <= 0) {
      handleRemoveComboClick();
      return;
    }

    try {
      setIsUpdating(true);

      // Gọi API qua Redux thunk - cập nhật số lượng cho cả combo
      await dispatch(
        updateComboQuantity({
          cartItemId: comboData.id,
          quantity: newQuantity,
        }),
      ).unwrap();

      toast.success("Đã cập nhật số lượng combo");
    } catch (error) {
      console.error("Error updating combo quantity:", error);
      toast.error(error || "Có lỗi xảy ra khi cập nhật số lượng combo");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!comboData || !comboData.items || comboData.items.length === 0) {
    return null;
  }

  const formatCurrency = (value) => {
    if (value == null) return null;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  return (
    <div className={styles.comboSection}>
      {/* Combo Header */}
      <div className={styles.comboHeader}>
        <input
          type="checkbox"
          checked={comboChecked}
          onChange={handleComboCheckboxChange}
          className={styles.comboCheckbox}
        />
        <div className={styles.comboInfo}>
          <h3 className={styles.comboTitle}>
            {comboData.name || "Combo Sản Phẩm"}
          </h3>
          {comboData.discount && (
            <span className={styles.comboDiscount}>
              Tiết kiệm {comboData.discount}%
            </span>
          )}
          <div className={styles.comboQuantity}>
            Số lượng combo: {comboData.quantity}
          </div>
        </div>
        <div className={styles.comboPrice}>
          <span className={styles.comboPriceLabel}>Tổng:</span>
          {console.log("comboData", comboData)}
          <span className={styles.comboPriceValue}>
            {formatCurrency(comboData?.discountedTotal)}
          </span>
          <span className={styles.comboOriginalPrice}>
            {formatCurrency(comboData?.originalTotal)}
          </span>
        </div>
      </div>

      {/* Combo Items */}
      <div className={styles.comboItems}>
        {comboData.items?.map((item) => (
          <div key={item.id} className={styles.comboItem}>
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className={styles.itemImage}
            />
            <div className={styles.itemInfo}>
              <Link to={`/products/${item.slug}`}>
                <h4 className={styles.itemName}>{item.name}</h4>
              </Link>
              {item.variant && (
                <p className={styles.itemVariant}>{item.variant}</p>
              )}
              <div className={styles.itemFlex}>
                <p className={styles.itemPrice}>
                  {item.price.toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>
            {/* Hiển thị số lượng sản phẩm trong combo */}
            <div className={styles.itemActions}>
              <div className={styles.quantityInfo}>
                Số lượng: {comboData.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Combo Controls - Chỉ hiển thị controls cho cả combo */}
      <div className={styles.comboControls}>
        <button
          className={styles.removeComboBtn}
          onClick={handleRemoveComboClick}
          disabled={isUpdating}
        >
          {isUpdating ? "Đang xử lý..." : "Xóa Combo"}
        </button>

        <div className={styles.comboQuantityControl}>
          <button
            onClick={() => handleComboQuantityChange(-1)}
            disabled={isUpdating}
          >
            {isUpdating ? "..." : "−"}
          </button>
          <span>Số lượng: {comboData.quantity}</span>
          <button
            onClick={() => handleComboQuantityChange(1)}
            disabled={isUpdating}
          >
            {isUpdating ? "..." : "+"}
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={cancelRemove}
        onConfirm={confirmRemove}
        title="Xác nhận xóa combo"
        message={`Bạn chắc chắn muốn xóa combo "${confirmModal.itemToRemove?.name}" khỏi giỏ hàng chứ?`}
        confirmText="Xóa Combo"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
};

export default ComboSection;
