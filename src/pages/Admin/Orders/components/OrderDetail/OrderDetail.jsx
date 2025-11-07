"use client";

import { useState } from "react";
import { Package, CreditCard, Truck, User } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import styles from "./OrderDetail.module.scss";
import OrderItems from "../OrderItems.jsx";
import PaymentInfo from "../PaymentInfo";
import ShippingInfo from "../ShippingInfo";
import CustomerInfo from "../CustomerInfo";
import OrderSummary from "../OrderSummary";

const OrderDetail = ({
  order,
  onClose,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
  onUpdateShipmentStatus,
}) => {
  const [activeTab, setActiveTab] = useState("products");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const tabs = [
    { id: "products", label: "Sản phẩm", icon: Package },
    { id: "payment", label: "Thanh toán", icon: CreditCard },
    { id: "shipping", label: "Vận chuyển", icon: Truck },
    { id: "customer", label: "Khách hàng", icon: User },
  ];

  return (
    <div className={styles.orderDetail}>
      {/* Đã bỏ header vì Modal đã có title và close button */}

      <div className={styles.orderOverview}>
        <div className={styles.orderHeader}>
          <span className={styles.orderNumber}>{order.order_number}</span>
          <div className={styles.orderMeta}>
            <div className={styles.metaItem}>
              <span className={styles.label}>Ngày đặt:</span>
              <span className={styles.value}>
                {formatDate(order.order_date)}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.label}>Trạng thái:</span>
              <span className={`${styles.status} ${styles[order.status]}`}>
                {order.status}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.label}>Tổng tiền:</span>
              <span className={styles.amount}>
                {formatCurrency(order.final_amount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.tabContent}>
            {activeTab === "products" && (
              <OrderItems
                items={order.items}
                onUpdateOrderStatus={onUpdateOrderStatus}
                orderId={order.id}
                currentStatus={order.status}
              />
            )}

            {activeTab === "payment" && (
              <PaymentInfo
                payment={order.payment}
                onUpdatePaymentStatus={onUpdatePaymentStatus}
                orderId={order.id}
              />
            )}

            {activeTab === "shipping" && (
              <ShippingInfo
                shipment={order.shipment}
                address={order.orderAddress}
                onUpdateShipmentStatus={onUpdateShipmentStatus}
                orderId={order.id}
              />
            )}

            {activeTab === "customer" && (
              <CustomerInfo customer={order.orderAddress} order={order} />
            )}
          </div>
        </div>

        <div className={styles.sidebar}>
          <OrderSummary
            order={order}
            onUpdateOrderStatus={onUpdateOrderStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
