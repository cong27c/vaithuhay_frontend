"use client";

import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import styles from "./CustomerInfo.module.scss";
import { convertAddressCodesToNames } from "@/components/Checkout/ConvertAddressCodesToNames";

const CustomerInfo = ({ customer, order }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatAddrress = convertAddressCodesToNames(customer);

  return (
    <div className={styles.customerInfo}>
      <div className={styles.header}>
        <div className={styles.title}>
          <User size={20} />
          <h3>Thông tin khách hàng</h3>
        </div>
      </div>

      <div className={styles.content}>
        {/* Thông tin cơ bản */}
        <Card>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <User size={18} />
              <h4>Thông tin liên hệ</h4>
            </div>
            <div className={styles.contactInfo}>
              {formatAddrress ? (
                <div className={styles.contactGrid}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <User size={16} />
                    </div>
                    <div className={styles.contactDetails}>
                      <label>Họ tên</label>
                      <span>{formatAddrress.full_name}</span>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Phone size={16} />
                    </div>
                    <div className={styles.contactDetails}>
                      <label>Số điện thoại</label>
                      <span>{formatAddrress.phone}</span>
                    </div>
                  </div>

                  {formatAddrress.email && (
                    <div className={styles.contactItem}>
                      <div className={styles.contactIcon}>
                        <Mail size={16} />
                      </div>
                      <div className={styles.contactDetails}>
                        <label>Email</label>
                        <span>{formatAddrress.email}</span>
                      </div>
                    </div>
                  )}

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Calendar size={16} />
                    </div>
                    <div className={styles.contactDetails}>
                      <label>Loại khách hàng</label>
                      <span>
                        {order.customer_id ? "Đã đăng ký" : "Khách vãng lai"}
                        {order.guest_session_id && (
                          <small>
                            {" "}
                            (Session: {order.guest_session_id.slice(0, 8)}...)
                          </small>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>Không có thông tin khách hàng</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Địa chỉ giao hàng */}
        <Card>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <MapPin size={18} />
              <h4>Địa chỉ giao hàng</h4>
            </div>
            <div className={styles.addressInfo}>
              {formatAddrress ? (
                <div className={styles.addressDetails}>
                  <div className={styles.addressField}>
                    <strong>Họ tên người nhận:</strong>
                    <span>{formatAddrress.full_name}</span>
                  </div>

                  <div className={styles.addressField}>
                    <strong>Số điện thoại:</strong>
                    <span>{formatAddrress.phone}</span>
                  </div>

                  {formatAddrress.email && (
                    <div className={styles.addressField}>
                      <strong>Email:</strong>
                      <span>{formatAddrress.email}</span>
                    </div>
                  )}

                  <div className={styles.addressField}>
                    <strong>Địa chỉ:</strong>
                    <span>{formatAddrress.street_address}</span>
                  </div>
                  {console.log("formatAddrress", formatAddrress)}
                  <div className={styles.addressField}>
                    <strong>Phường/Xã:</strong>
                    <span>{formatAddrress.wardName || "N/A"}</span>
                  </div>

                  <div className={styles.addressField}>
                    <strong>Quận/Huyện:</strong>
                    <span>{formatAddrress.districtName || "N/A"}</span>
                  </div>

                  <div className={styles.addressField}>
                    <strong>Tỉnh/Thành phố:</strong>
                    <span>{formatAddrress.provinceName || "N/A"}</span>
                  </div>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>Không có thông tin địa chỉ</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Thông tin đơn hàng */}
        <Card>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Calendar size={18} />
              <h4>Thông tin đơn hàng</h4>
            </div>
            <div className={styles.orderInfo}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>Mã đơn hàng</label>
                  <span className={styles.orderNumber}>
                    {order.order_number}
                  </span>
                </div>

                <div className={styles.infoItem}>
                  <label>Ngày đặt hàng</label>
                  <span>{formatDate(order.order_date)}</span>
                </div>

                <div className={styles.infoItem}>
                  <label>Ngày tạo</label>
                  <span>{formatDate(order.created_at)}</span>
                </div>

                <div className={styles.infoItem}>
                  <label>Ngày cập nhật</label>
                  <span>{formatDate(order.updated_at)}</span>
                </div>

                {order.voucher && (
                  <div className={styles.infoItem}>
                    <label>Mã giảm giá</label>
                    <span className={styles.voucher}>
                      {order.voucher.code} (-{order.voucher.discount_value}%)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CustomerInfo;
