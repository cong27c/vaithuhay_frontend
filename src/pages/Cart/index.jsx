"use client";

import { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  removeCartItem,
  updateQuantity,
  updateCartItemVariant,
  getCart,
} from "@/Services/cartService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "@/components/ConfirmModal";
import VariantModel from "@/components/VariantModel";
import { getProductVariantsBySlug } from "@/Services/productService";
import CouponModal from "@/components/CouponModel";
import { getVouchers } from "@/Services/voucherService";
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartItems,
  setSelectedProducts,
  toggleSelectProduct,
  removeCartItem as removeCartItemAction,
  updateCartItemQuantity,
} from "@/features/cart/cartSlice";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  // Redux - sử dụng đúng tên state từ cartSlice
  const dispatch = useDispatch();
  const { cartItems, selectedProducts } = useSelector((state) => state.cart);

  // Modal states
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Variant data states
  const [variants, setVariants] = useState([]);
  const [attributes, setAttributes] = useState({});

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    itemToRemove: null,
  });
  const [vouchers, setVouchers] = useState([]);

  const currentUser = useCurrentUser();
  const isLoggedIn = !!currentUser;

  const handleCopyCoupon = (coupon) => {
    console.log("Copying coupon:", coupon);
    navigator.clipboard.writeText(coupon.code);
    toast.success("Đã sao chép mã giảm giá");
  };

  const handleGetCoupon = (coupon) => {
    toast.success("Đã nhận mã giảm giá thành công");
    setShowCouponModal(false);
  };

  const handleCloseCouponModal = () => {
    setShowCouponModal(false);
  };

  // Fetch cart data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cartRes, voucherRes] = await Promise.all([
          getCart(isLoggedIn),
          getVouchers(),
        ]);
        const cartData = cartRes?.data || [];

        // Cập nhật cart items vào Redux store - cartData đã có checked property
        dispatch(setCartItems(cartData));

        setVouchers(voucherRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, dispatch]);

  // Fetch variant data when a product is selected for variant change
  useEffect(() => {
    const fetchVariantData = async () => {
      if (!selectedProduct) return;

      try {
        const productVariants = await getProductVariantsBySlug(
          selectedProduct.slug,
        );
        setVariants(productVariants?.variants || []);
        setAttributes(productVariants?.attributes || {});
      } catch (error) {
        console.error("Error fetching variant data:", error);
        toast.error("Không thể tải thông tin biến thể sản phẩm");
      }
    };

    if (selectedProduct) {
      fetchVariantData();
    }
  }, [selectedProduct]);

  // Hàm mở confirm modal
  const handleRemoveClick = (id) => {
    const product = cartItems.find((item) => item.id === id);
    setConfirmModal({
      isOpen: true,
      itemToRemove: { id, name: product?.name },
    });
  };

  // Hàm xác nhận xóa - ĐÃ SỬA
  const confirmRemove = async () => {
    const { id } = confirmModal.itemToRemove;

    if (!id) {
      console.error("Invalid item ID");
      return;
    }

    try {
      // Tìm item trước khi xóa
      const removedItem = cartItems.find((item) => item.id === id);
      if (!removedItem) {
        console.error("Item not found");
        return;
      }

      // Optimistic update - sử dụng action removeCartItem từ slice
      dispatch(removeCartItemAction(id));

      // Đóng modal
      setConfirmModal({ isOpen: false, itemToRemove: null });

      // Gọi API xóa
      await removeCartItem(id, isLoggedIn);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (error) {
      console.error("Error removing item:", error);

      // Revert optimistic update on error
      try {
        const res = await getCart(isLoggedIn);
        const freshCartData = res?.data || [];
        dispatch(setCartItems(freshCartData));
      } catch (refreshError) {
        console.error("Error refreshing cart:", refreshError);
      }

      toast.error("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  // Hàm hủy xóa
  const cancelRemove = () => {
    setConfirmModal({ isOpen: false, itemToRemove: null });
  };

  // Hàm thay đổi số lượng - ĐÃ SỬA
  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      handleRemoveClick(id);
      return;
    }

    // Optimistic update - sử dụng action từ slice
    dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));

    setUpdatingItems((prev) => new Set(prev).add(id));

    try {
      await updateQuantity(id, newQuantity, isLoggedIn);
      // Refresh cart to get updated data
      const res = await getCart(isLoggedIn);
      const freshCartData = res?.data || [];
      dispatch(setCartItems(freshCartData));
      toast.success("Đã cập nhật số lượng");
    } catch (error) {
      console.error("Error updating quantity:", error);
      // Revert on error
      const res = await getCart(isLoggedIn);
      const freshCartData = res?.data || [];
      dispatch(setCartItems(freshCartData));
      toast.error("Có lỗi xảy ra khi cập nhật số lượng");
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  // Hàm toggle select - ĐÃ SỬA
  const handleCheckboxChange = (id) => {
    const product = cartItems.find((item) => item.id === id);
    if (product) {
      // Cập nhật Redux store - slice đã tự động cập nhật checked status
      dispatch(toggleSelectProduct(product));
    }
  };

  const handleChangeVariant = (product) => {
    setSelectedProduct(product);
    setShowVariantModal(true);
  };

  const handleVariantUpdate = async (variantData) => {
    if (!selectedProduct) return;

    const { matchedVariant } = variantData;

    try {
      // Kiểm tra nếu có matchedVariant
      if (!matchedVariant?.id) {
        toast.error("Không tìm thấy biến thể phù hợp");
        return;
      }

      // Hiển thị loading
      setUpdatingItems((prev) => new Set(prev).add(selectedProduct.id));

      // Gọi API update cart item variant
      const result = await updateCartItemVariant(
        selectedProduct.id,
        matchedVariant.id,
        isLoggedIn,
      );
      if (result?.success) {
        // Refresh cart để cập nhật toàn bộ data từ server
        const res = await getCart(isLoggedIn);
        const freshCartData = res?.data || [];
        dispatch(setCartItems(freshCartData));

        toast.success("Đã cập nhật thuộc tính sản phẩm");
      } else {
        throw new Error(result?.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating variant:", error);

      // Hiển thị thông báo lỗi cụ thể
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi khi cập nhật thuộc tính");
      }

      // Refresh cart để đồng bộ lại data
      try {
        const res = await getCart(isLoggedIn);
        const freshCartData = res?.data || [];
        dispatch(setCartItems(freshCartData));
      } catch (refreshError) {
        console.error("Error refreshing cart:", refreshError);
      }
    } finally {
      // Tắt loading và đóng modal
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedProduct.id);
        return newSet;
      });

      setShowVariantModal(false);
      setSelectedProduct(null);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.checked)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Hàm xử lý khi nhấn nút thanh toán
  const handleCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.checked);

    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
      return;
    }

    // Lưu selected products vào Redux store
    dispatch(setSelectedProducts(selectedItems));

    // Chuyển hướng đến trang checkout
    window.location.href = "/checkouts";
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
                      disabled={isUpdating(item.id)}
                    >
                      {isUpdating(item.id)
                        ? "Đang cập nhật..."
                        : "Thay đổi thuộc tính"}
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

        {/* Variant Modal */}
        {selectedProduct && (
          <VariantModel
            isOpen={showVariantModal}
            onClose={() => {
              setShowVariantModal(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct}
            variants={variants}
            attributes={attributes}
            onUpdate={handleVariantUpdate}
            isLoading={isUpdating(selectedProduct.id)}
          />
        )}

        {/* Bottom Checkout Bar - Only show if cart has items */}
        {cartItems?.length > 0 && (
          <div className={styles.checkoutBar}>
            <div className={styles.checkoutActions}>
              <button
                className={styles.couponBtn}
                onClick={() => setShowCouponModal(true)}
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
              <Link to={"/checkouts"}>
                <button className={styles.checkoutBtn} onClick={handleCheckout}>
                  THANH TOÁN
                </button>
              </Link>
            </div>
          </div>
        )}

        {showCouponModal && (
          <CouponModal
            coupons={vouchers}
            onClose={handleCloseCouponModal}
            onCopyCoupon={handleCopyCoupon}
            onGetCoupon={handleGetCoupon}
          />
        )}

        {/* Confirm Modal */}
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
