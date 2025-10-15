"use client";

import { useState } from "react";
import styles from "./Checkout.module.scss";
import DeliveryInfo from "@/components/checkout/DeliveryInfo";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useSelector } from "react-redux";

export default function Checkout() {
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const userIn4 = useSelector((state) => state.auth.currentUser);
  const cartId = userIn4?.cartId || null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <DeliveryInfo />
        </div>
        <div className={styles.rightColumn}>
          <OrderSummary
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
