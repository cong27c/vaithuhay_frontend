"use client";

import { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  getCart,
  removeCartItem,
  updateQuantity,
} from "@/Services/cartService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "@/components/ConfirmModal";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  // Modal states
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    itemToRemove: null,
  });

  const vouchers = [
    {
      id: 1,
      title: "Giảm 200K kèm Freeship cho đơn hàng từ 4tr trở lên",
      status: "copied",
    },
    {
      id: 2,
      title: "Giảm chồng 5% khi mua 2 ổ cắm điện tại Vaithuhay",
      status: "expired",
    },
    {
      id: 3,
      title: "Giảm 400.000đ cho đơn hàng từ 6.5tr trở lên",
      status: "expired",
    },
    { id: 4, title: "Giảm 6% tối đa 50K cho đơn hàng 400K", status: "expired" },
    {
      id: 5,
      title: "Giảm 1.000.000đ cho đơn hàng từ 10tr trở lên",
      status: "expired",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getCart();
        setCartItems(res?.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Hàm mở confirm modal
  const handleRemoveClick = (id) => {
    const product = cartItems.find((item) => item.id === id);
    setConfirmModal({
      isOpen: true,
      itemToRemove: { id, name: product?.name },
    });
  };

  // Hàm xác nhận xóa
  const confirmRemove = async () => {
    const { id } = confirmModal.itemToRemove;

    // Optimistic update
    const removedItem = cartItems.find((item) => item.id === id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

    // Đóng modal
    setConfirmModal({ isOpen: false, itemToRemove: null });

    try {
      await removeCartItem(id);
      console.log("Item removed successfully");
    } catch (error) {
      console.error("Error removing item:", error);
      // Revert optimistic update on error
      setCartItems((prevItems) => [...prevItems, removedItem]);
      alert("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  // Hàm hủy xóa
  const cancelRemove = () => {
    setConfirmModal({ isOpen: false, itemToRemove: null });
  };

  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      handleRemoveClick(id);
      return;
    }

    // Optimistic update
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );

    setUpdatingItems((prev) => new Set(prev).add(id));

    try {
      await updateQuantity(id, newQuantity);
      const res = await getCart();
      setCartItems(res?.data || []);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity } : item,
        ),
      );
      alert("Có lỗi xảy ra khi cập nhật số lượng");
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleCheckboxChange = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleChangeVariant = (product) => {
    setSelectedProduct(product);
    setShowVariantModal(true);
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.checked)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const isUpdating = (id) => updatingItems.has(id);

  if (loading) {
    return <div className={styles.loading}>Đang tải giỏ hàng...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.cartContainer}>
        {/* Banner */}
        <div className={styles.banner}>
          <img
            src="https://theme.hstatic.net/1000069970/1001119059/14/banner-top-cart.png?v=7653"
            alt="Banner"
          />
        </div>

        {/* Cart Items */}
        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Giỏ hàng của bạn đang trống</p>
              <Link to="/products" className={styles.continueShopping}>
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <input
                  type="checkbox"
                  checked={item.checked || false}
                  onChange={() => handleCheckboxChange(item.id)}
                  className={styles.checkbox}
                />
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <Link to={`/products/${item.slug}`}>
                    <h3 className={styles.productName}>{item.name}</h3>
                  </Link>
                  <p className={styles.productVariant}>{item.variant}</p>
                  <div className={styles.flex}>
                    <p className={styles.productPrice}>
                      {item.price.toLocaleString("vi-VN")}đ
                    </p>
                    <button
                      className={styles.attributesChange}
                      onClick={() => handleChangeVariant(item)}
                    >
                      Thay đổi thuộc tính
                      <span>
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    </button>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemoveClick(item.id)}
                    disabled={isUpdating(item.id)}
                  >
                    ✕
                  </button>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={isUpdating(item.id)}
                    >
                      {isUpdating(item.id) ? "..." : "−"}
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      disabled={isUpdating(item.id)}
                    >
                      {isUpdating(item.id) ? "..." : "+"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout Bar - Only show if cart has items */}
        {cartItems.length > 0 && (
          <div className={styles.checkoutBar}>
            <div className={styles.checkoutActions}>
              <button
                className={styles.couponBtn}
                onClick={() => setShowVoucherModal(true)}
              >
                <span className={styles.ticketIcon}>
                  <img
                    src="https://file.hstatic.net/1000069970/file/icon-coupon_729d67f9b4104e21bf0085d87876ceb8.svg"
                    alt=""
                  />
                </span>{" "}
                Coupon
              </button>
              <button
                className={styles.giftBtn}
                onClick={() => setShowGiftModal(true)}
              >
                <span className={styles.giftIcon}>
                  <img
                    src="https://file.hstatic.net/1000069970/file/cart-black_db2c58128ec7499fb58396db0a832d34.svg"
                    alt=""
                  />
                </span>{" "}
                Đơn quà tặng
              </button>
            </div>
            <div className={styles.checkoutInfo}>
              <div className={styles.subtotal}>
                <span>Tạm tính</span>
                <span className={styles.totalAmount}>
                  {calculateTotal().toLocaleString("vi-VN")}đ
                </span>
              </div>
              <button className={styles.checkoutBtn}>THANH TOÁN</button>
            </div>
          </div>
        )}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={cancelRemove}
          onConfirm={confirmRemove}
          title="Xác nhận xóa"
          message={`Bạn chắc chắn muốn xóa sản phẩm "${confirmModal.itemToRemove?.name}" chứ?`}
          confirmText="Xóa"
          cancelText="Hủy"
          type="danger"
        />
      </div>
    </div>
  );
};

export default Cart;
