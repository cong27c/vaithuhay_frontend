"use client";

import { useState } from "react";
import { Truck, MapPin, Edit, Save, X } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import StatusBadge from "../StatusBadge/StatusBadge";
import styles from "./ShippingInfo.module.scss";
import { convertAddressCodesToNames } from "@/components/Checkout/ConvertAddressCodesToNames";

const ShippingInfo = ({
  shipment,
  address,
  onUpdateShipmentStatus,
  orderId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: shipment?.status || "waiting",
    tracking_code: shipment?.tracking_code || "",
    carrier: shipment?.carrier || "",
  });
  const formatAddrress = convertAddressCodesToNames(address);

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  const handleSave = async () => {
    try {
      await onUpdateShipmentStatus(orderId, editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật vận chuyển:", error);
    }
  };

  const handleCancel = () => {
    setEditData({
      status: shipment?.status || "waiting",
      tracking_code: shipment?.tracking_code || "",
      carrier: shipment?.carrier || "",
    });
    setIsEditing(false);
  };

  return (
    <div className={styles.shippingInfo}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Truck size={20} />
          <h3>Thông tin vận chuyển</h3>
        </div>
        {shipment && (
          <div className={styles.actions}>
            {!isEditing ? (
              <button
                className={styles.editBtn}
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} />
                Chỉnh sửa
              </button>
            ) : (
              <div className={styles.editActions}>
                <button className={styles.saveBtn} onClick={handleSave}>
                  <Save size={16} />
                  Lưu
                </button>
                <button className={styles.cancelBtn} onClick={handleCancel}>
                  <X size={16} />
                  Hủy
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.content}>
        {/* Thông tin địa chỉ giao hàng */}
        <Card>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <MapPin size={18} />
              <h4>Địa chỉ giao hàng</h4>
            </div>
            <div className={styles.addressInfo}>
              {formatAddrress ? (
                <div className={styles.addressDetails}>
                  <div className={styles.addressRow}>
                    <strong>{formatAddrress.full_name}</strong>
                  </div>
                  <div className={styles.addressRow}>
                    <span>📞 {formatAddrress.phone}</span>
                    {formatAddrress.email && (
                      <span>✉️ {formatAddrress.email}</span>
                    )}
                  </div>
                  <div className={styles.addressLine}>
                    {formatAddrress.street_address}
                  </div>
                  <div className={styles.addressLine}>
                    {[
                      formatAddrress.wardName,
                      formatAddrress.districtName,
                      formatAddrress.provinceName,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>Chưa có thông tin địa chỉ</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Thông tin vận chuyển */}
        {shipment ? (
          <Card>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Truck size={18} />
                <h4>Thông tin vận chuyển</h4>
              </div>
              <div className={styles.shippingDetails}>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Đơn vị vận chuyển</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.carrier}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            carrier: e.target.value,
                          }))
                        }
                        placeholder="Nhập tên đơn vị vận chuyển"
                        className={styles.textInput}
                      />
                    ) : (
                      <span>{shipment.carrier || "N/A"}</span>
                    )}
                  </div>

                  <div className={styles.detailItem}>
                    <label>Mã vận đơn</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.tracking_code}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            tracking_code: e.target.value,
                          }))
                        }
                        placeholder="Nhập mã vận đơn"
                        className={styles.textInput}
                      />
                    ) : (
                      <span className={styles.trackingCode}>
                        {shipment.tracking_code || "Chưa có mã"}
                      </span>
                    )}
                  </div>

                  <div className={styles.detailItem}>
                    <label>Trạng thái</label>
                    {isEditing ? (
                      <select
                        value={editData.status}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className={styles.statusSelect}
                      >
                        <option value="waiting">Chờ lấy hàng</option>
                        <option value="shipping">Đang vận chuyển</option>
                        <option value="delivered">Đã giao hàng</option>
                        <option value="failed">Giao hàng thất bại</option>
                      </select>
                    ) : (
                      <StatusBadge type="shipment" status={shipment.status} />
                    )}
                  </div>

                  <div className={styles.detailItem}>
                    <label>Phí vận chuyển</label>
                    <span className={styles.shippingFee}>
                      {formatCurrency(shipment.shipping_fee)}
                    </span>
                  </div>

                  <div className={styles.detailItem}>
                    <label>Ngày giao hàng</label>
                    <span>{formatDate(shipment.delivered_at)}</span>
                  </div>

                  <div className={styles.detailItem}>
                    <label>Ngày gửi hàng</label>
                    <span>{formatDate(shipment.shipped_at)}</span>
                  </div>

                  {shipment.failed_reason && (
                    <div className={styles.detailItem + " " + styles.fullWidth}>
                      <label>Lý do thất bại</label>
                      <span className={styles.failedReason}>
                        {shipment.failed_reason}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card>
            <div className={styles.emptyState}>
              <Truck size={48} />
              <p>Chưa có thông tin vận chuyển</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ShippingInfo;
