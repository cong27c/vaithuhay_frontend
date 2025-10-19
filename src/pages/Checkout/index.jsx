"use client";

import { useState, useEffect } from "react";
import styles from "./Checkout.module.scss";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useSelector } from "react-redux";
import OrderInfor from "@/components/Checkout/OrderInfor";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAddressesByCustomer } from "@/Services/addressService";

export default function Checkout() {
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const userIn4 = useSelector((state) => state.auth.currentUser);
  const cartId = userIn4?.cartId || null;

  // Lấy selected products từ cartSlice
  const { selectedProducts } = useSelector((state) => state.cart);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  // Get user's addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAddressesByCustomer();
        if (response.success && response.data.length > 0) {
          // Set default address as selected
          const defaultAddress =
            response.data.find((addr) => addr.is_default) || response.data[0];
          setSelectedAddress(defaultAddress);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchAddresses();
  }, [userIn4]);

  // Kiểm tra nếu không có sản phẩm nào được chọn
  useEffect(() => {
    if (selectedProducts.length === 0) {
      toast.error("Không có sản phẩm nào được chọn để thanh toán");
      navigate("/cart");
    }
  }, [selectedProducts, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <OrderInfor selectedProducts={selectedProducts} />
        </div>
        <div className={styles.rightColumn}>
          <OrderSummary
            selectedProducts={selectedProducts}
            onShowDiscounts={() => setShowDiscountModal(true)}
            appliedDiscount={appliedDiscount}
            onApplyDiscount={setAppliedDiscount}
            showDiscountModal={showDiscountModal}
            onCloseDiscountModal={() => setShowDiscountModal(false)}
            cartId={cartId}
          />
        </div>
      </div>
    </div>
  );
}
