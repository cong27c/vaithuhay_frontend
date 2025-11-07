"use client";

import { useState } from "react";
import { Package, Edit } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import StatusBadge from "../StatusBadge/StatusBadge";
import styles from "./OrderItems.module.scss";

const OrderItems = ({ items, onUpdateOrderStatus, orderId, currentStatus }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  const calculateSubtotal = () => {
    return (
      items?.reduce((sum, item) => {
        const unitPrice = item.unit_price || 0;
        const discount = item.discount_value || 0; // giảm giá theo VNĐ
        const quantity = item.quantity || 0;
        const total = (unitPrice - discount) * quantity;
        return sum + total;
      }, 0) || 0
    );
  };

  return (
    <div className={styles.orderItems}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Package size={20} />
          <h3>Danh sách sản phẩm</h3>
        </div>
        <StatusBadge type="order" status={currentStatus} />
      </div>
      {console.log("items", items)}
      <Card>
        <div className={styles.itemsList}>
          {items?.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemImage}>
                {item.product.mainImage?.image_url ? (
                  <img
                    src={item.product.mainImage?.image_url}
                    alt={item.product.name}
                    onError={(e) => {
                      e.target.src = "/images/placeholder-product.jpg";
                    }}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    <Package size={24} />
                  </div>
                )}
              </div>

              <div className={styles.itemDetails}>
                <div className={styles.itemName}>
                  <h4>{item.product?.name || "Sản phẩm không xác định"}</h4>
                  {item.variant && (
                    <div className={styles.variant}>
                      {item.variant.color && (
                        <span>Màu: {item.variant.color}</span>
                      )}
                      {item.variant.size && (
                        <span>Size: {item.variant.size}</span>
                      )}
                      {item.variant.sku && <span>SKU: {item.variant.sku}</span>}
                    </div>
                  )}
                </div>

                <div className={styles.itemPrice}>
                  <div className={styles.unitPrice}>
                    {formatCurrency(item.unit_price)} x {item.quantity}
                  </div>
                  {console.log("discount_amount", item.discount_amount)}
                  {item.discount_amount > 0 && (
                    <div className={styles.discount}>
                      Giảm: {item.discount_amount} %
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.itemTotal}>
                {formatCurrency(
                  item.unit_price * (1 - (item.discount_amount || 0) / 100),
                )}{" "}
                x {item.quantity}{" "}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          {/*     <div className={styles.summaryRow}>
            <span>Phí vận chuyển:</span>
            <span>{formatCurrency(0)}</span> </div> {/* Có thể lấy từ shipment */}

          {/* <div className={styles.summaryRow}>
            <span>Giảm giá:</span>
            <span className={styles.discount}>-{formatCurrency(0)}</span>{" "}
            </div> 
         */}
          <div className={styles.summaryRow + " " + styles.total}>
            <span>Tổng cộng:</span>
            <span>{formatCurrency(calculateSubtotal())}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderItems;
