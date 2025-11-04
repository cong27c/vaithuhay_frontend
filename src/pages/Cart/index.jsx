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
  // Thêm actions cho combo
  toggleSelectCombo,
} from "@/features/cart/cartSlice";

import {
  fetchCartCombos,
  fetchCartItems,
  refreshCart,
  removeCombo,
  updateComboQuantity,
} from "@/features/cart/cartThunks";

import ComboSection from "./ComboSection";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  // Redux
  const dispatch = useDispatch();
  const { cartItems, selectedProducts, combos } = useSelector(
    (state) => state.cart,
  );
  console.log("cartItems", cartItems);
  console.log("selectedProducts", selectedProducts);
  console.log("combos", combos);
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

  // Fetch cart data và combos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cartRes, voucherRes] = await Promise.all([
          getCart(isLoggedIn),
          getVouchers(),
        ]);
        const cartData = cartRes?.data || [];

        // Cập nhật cart items vào Redux store
        const resultAction = dispatch(setCartItems(cartData)).unwrap();

        if (setCartItems.fulfilled.match(resultAction)) {
          toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
          dispatch(refreshCart());
        } else {
          throw new Error(resultAction.payload || "Thêm sản phẩm thất bại");
        }

        // Fetch combos từ API
        await dispatch(fetchCartCombos()).unwrap();

        setVouchers(voucherRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, dispatch]);

  // Fetch variant data
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

  // Hàm xử lý khi combo thay đổi trạng thái chọn
  const handleComboChange = (comboId, isChecked) => {
    // Dispatch action để cập nhật trạng thái chọn của combo
    dispatch(toggleSelectCombo(comboId));
  };

  // Hàm mở confirm modal cho cả sản phẩm và combo
  const handleRemoveClick = (id, isCombo = false) => {
    let item;
    if (isCombo) {
      // Tìm combo item
      const combo = combos.find((combo) => combo.id === id);
      if (combo) {
        item = { id, name: combo.name, isCombo: true };
      }
    } else {
      // Tìm sản phẩm đơn
      item = cartItems.find((item) => item.id === id);
    }

    if (item) {
      setConfirmModal({
        isOpen: true,
        itemToRemove: {
          id,
          name: item.name,
          isCombo: item.isCombo || false,
        },
      });
    }
  };

  // Hàm xác nhận xóa
  const confirmRemove = async () => {
    const { id, isCombo } = confirmModal.itemToRemove;

    if (!id) {
      console.error("Invalid item ID");
      return;
    }

    try {
      if (isCombo) {
        // Xóa combo sử dụng Redux thunk
        await dispatch(removeCombo(id)).unwrap();
        toast.success("Đã xóa combo khỏi giỏ hàng");
      } else {
        // Xóa sản phẩm đơn
        const removedItem = cartItems.find((item) => item.id === id);
        if (!removedItem) {
          console.error("Item not found");
          return;
        }

        // Optimistic update
        dispatch(removeCartItemAction(id));

        // Gọi API xóa
        const resultAction = await removeCartItem(id, isLoggedIn);
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
        dispatch(refreshCart());
      }

      // Đóng modal
      setConfirmModal({ isOpen: false, itemToRemove: null });
    } catch (error) {
      console.error("Error removing item:", error);

      // Revert optimistic update on error
      try {
        const res = await getCart(isLoggedIn);
        const freshCartData = res?.data || [];
        dispatch(setCartItems(freshCartData));

        // Refresh combos nếu có lỗi
        if (isCombo) {
          await dispatch(fetchCartCombos()).unwrap();
        }
      } catch (refreshError) {
        console.error("Error refreshing cart:", refreshError);
      }

      toast.error("Có lỗi xảy ra khi xóa");
    }
  };

  // Hàm hủy xóa
  const cancelRemove = () => {
    setConfirmModal({ isOpen: false, itemToRemove: null });
  };

  // Hàm thay đổi số lượng cho combo
  const handleComboQuantityChange = async (comboId, delta) => {
    const combo = combos.find((combo) => combo.id === comboId);
    if (!combo) return;

    const newQuantity = combo.quantity + delta;

    if (newQuantity <= 0) {
      handleRemoveClick(comboId, true);
      return;
    }

    // Optimistic update - cần thêm action updateComboQuantity trong slice
    dispatch(updateComboQuantity({ id: comboId, quantity: newQuantity }));

    setUpdatingItems((prev) => new Set(prev).add(comboId));

    try {
      // Cập nhật số lượng combo qua Redux thunk
      await dispatch(
        updateComboQuantity({
          cartItemId: comboId,
          quantity: newQuantity,
        }),
      ).unwrap();

      toast.success("Đã cập nhật số lượng combo");
    } catch (error) {
      console.error("Error updating combo quantity:", error);

      // Revert on error - refresh combos
      await dispatch(fetchCartCombos()).unwrap();

      toast.error("Có lỗi xảy ra khi cập nhật số lượng combo");
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(comboId);
        return newSet;
      });
    }
  };

  // Hàm thay đổi số lượng cho sản phẩm đơn
  const handleProductQuantityChange = async (id, delta) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      handleRemoveClick(id);
      return;
    }

    // Optimistic update
    dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));

    setUpdatingItems((prev) => new Set(prev).add(id));

    try {
      await updateQuantity(id, newQuantity, isLoggedIn);
      // Refresh cart để get updated data
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

  // Hàm toggle select sản phẩm
  const handleCheckboxChange = (id) => {
    const product = cartItems.find((item) => item.id === id);
    if (product) {
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
      if (!matchedVariant?.id) {
        toast.error("Không tìm thấy biến thể phù hợp");
        return;
      }

      setUpdatingItems((prev) => new Set(prev).add(selectedProduct.id));

      const result = await updateCartItemVariant(
        selectedProduct.id,
        matchedVariant.id,
        isLoggedIn,
      );
      if (result?.success) {
        const res = await getCart(isLoggedIn);
        const freshCartData = res?.data || [];
        dispatch(setCartItems(freshCartData));

        toast.success("Đã cập nhật thuộc tính sản phẩm");
      } else {
        throw new Error(result?.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating variant:", error);

      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi khi cập nhật thuộc tính");
      }

      try {
        const res = await getCart(isLoggedIn);
        const freshCartData = res?.data || [];
        dispatch(setCartItems(freshCartData));
      } catch (refreshError) {
        console.error("Error refreshing cart:", refreshError);
      }
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedProduct.id);
        return newSet;
      });

      setShowVariantModal(false);
      setSelectedProduct(null);
    }
  };

  // Tính tổng tiền cho cả sản phẩm đơn và combo
  const calculateTotal = () => {
    const singleProductsTotal = cartItems
      .filter((item) => item.checked)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const combosTotal = combos
      .filter((combo) => combo.checked)
      .reduce((sum, combo) => sum + combo.discountedTotal, 0);

    return singleProductsTotal + combosTotal;
  };

  // Hàm xử lý khi nhấn nút thanh toán
  const handleCheckout = () => {
    const selectedSingleItems = cartItems.filter((item) => item.checked);
    const selectedCombos = combos.filter((combo) => combo.checked);

    if (selectedSingleItems.length === 0 && selectedCombos.length === 0) {
      toast.error(
        "Vui lòng chọn ít nhất một sản phẩm hoặc combo để thanh toán",
      );
      return;
    }

    // Lưu selected products và combos vào Redux store
    const checkoutData = [
      ...selectedSingleItems?.map((item) => ({ ...item, isCombo: false })),
      ...selectedCombos?.map((combo) => ({ ...combo, isCombo: true })),
    ];

    dispatch(setSelectedProducts(checkoutData));

    // Chuyển hướng đến trang checkout
    window.location.href = "/checkouts";
  };

  const isUpdating = (id) => updatingItems.has(id);

  if (loading) {
    return <div className={styles.loading}>Đang tải giỏ hàng...</div>;
  }

  const hasItems = cartItems.length > 0 || combos.length > 0;

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

        {/* Combo Sections */}
        {combos.length > 0 && (
          <div className={styles.combosSection}>
            <h2 className={styles.sectionTitle}>Combo Ưu Đãi</h2>
            {combos?.map((combo) => (
              <ComboSection
                key={combo.id}
                comboData={{
                  id: combo.id,
                  name: combo.name,
                  discount: combo.discountValue,
                  quantity: combo.quantity,
                  items: combo.products?.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    checked: combo.checked || false,
                    // Thêm các trường cần thiết khác cho ComboSection
                    image: product.image || "/placeholder.svg",
                    slug: product.slug || "",
                    variant: product.variant || "",
                  })),
                  // Thêm thông tin giá cho combo
                  originalTotal: combo.originalTotal,
                  discountedTotal: combo.discountedTotal,
                  discountPrice: combo.discountPrice,
                }}
                onComboChange={handleComboChange}
                onRemoveItem={(comboId) => handleRemoveClick(comboId, true)}
                onQuantityChange={(comboId, delta) =>
                  handleComboQuantityChange(comboId, delta)
                }
              />
            ))}
          </div>
        )}

        {/* Single Product Items */}
        <div className={styles.cartItems}>
          {cartItems.length === 0 && combos.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Giỏ hàng của bạn đang trống</p>
              <Link to="/products" className={styles.continueShopping}>
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : cartItems.length > 0 ? (
            <>
              <h2 className={styles.sectionTitle}>Sản Phẩm Đơn Lẻ</h2>
              {cartItems?.map((item) => (
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
                        onClick={() => handleProductQuantityChange(item.id, -1)}
                        disabled={isUpdating(item.id)}
                      >
                        {isUpdating(item.id) ? "..." : "−"}
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleProductQuantityChange(item.id, 1)}
                        disabled={isUpdating(item.id)}
                      >
                        {isUpdating(item.id) ? "..." : "+"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : null}
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
        {hasItems && (
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
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                THANH TOÁN
              </button>
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
          message={`Bạn chắc chắn muốn xóa ${
            confirmModal.itemToRemove?.isCombo ? "combo" : "sản phẩm"
          } "${confirmModal.itemToRemove?.name}" chứ?`}
          confirmText="Xóa"
          cancelText="Hủy"
          type="danger"
        />
      </div>
    </div>
  );
};

export default Cart;
