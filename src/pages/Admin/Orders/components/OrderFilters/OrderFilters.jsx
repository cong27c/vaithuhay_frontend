"use client";

import { useState } from "react";
import { Search, Filter, RefreshCw } from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import styles from "./OrderFilters.module.scss";

const OrderFilters = ({ filters, onFiltersChange, onRefresh }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const statusOptions = [
    { value: "", label: "Tất cả trạng thái" },
    { value: "pending", label: "Chờ xác nhận" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "processing", label: "Đang xử lý" },
    { value: "shipped", label: "Đang giao hàng" },
    { value: "delivered", label: "Đã giao hàng" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const paymentStatusOptions = [
    { value: "", label: "Tất cả TT thanh toán" },
    { value: "pending", label: "Chờ thanh toán" },
    { value: "paid", label: "Đã thanh toán" },
    { value: "failed", label: "Thanh toán thất bại" },
    { value: "refunded", label: "Đã hoàn tiền" },
  ];

  const shipmentStatusOptions = [
    { value: "", label: "Tất cả TT vận chuyển" },
    { value: "waiting", label: "Chờ lấy hàng" },
    { value: "shipping", label: "Đang vận chuyển" },
    { value: "delivered", label: "Đã giao hàng" },
    { value: "failed", label: "Giao hàng thất bại" },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value, page: 1 };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSearch = (value) => {
    handleFilterChange("search", value);
  };

  const clearFilters = () => {
    const clearedFilters = {
      page: 1,
      limit: 10,
      status: "",
      search: "",
      start_date: "",
      end_date: "",
      payment_status: "",
      shipment_status: "",
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <Card>
      <div className={styles.filters}>
        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Tìm theo mã đơn hàng, tên khách hàng..."
              value={localFilters.search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <button
            className={styles.filterToggle}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Filter size={16} />
            Bộ lọc
          </button>

          <button className={styles.refreshBtn} onClick={onRefresh}>
            <RefreshCw size={16} />
          </button>
        </div>

        {showAdvanced && (
          <div className={styles.advancedFilters}>
            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Trạng thái đơn hàng</label>
                <select
                  value={localFilters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label>Trạng thái thanh toán</label>
                <select
                  value={localFilters.payment_status}
                  onChange={(e) =>
                    handleFilterChange("payment_status", e.target.value)
                  }
                >
                  {paymentStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label>Trạng thái vận chuyển</label>
                <select
                  value={localFilters.shipment_status}
                  onChange={(e) =>
                    handleFilterChange("shipment_status", e.target.value)
                  }
                >
                  {shipmentStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.filterRow}>
              <div className={styles.filterGroup}>
                <label>Từ ngày</label>
                <input
                  type="date"
                  value={localFilters.start_date}
                  onChange={(e) =>
                    handleFilterChange("start_date", e.target.value)
                  }
                />
              </div>

              <div className={styles.filterGroup}>
                <label>Đến ngày</label>
                <input
                  type="date"
                  value={localFilters.end_date}
                  onChange={(e) =>
                    handleFilterChange("end_date", e.target.value)
                  }
                />
              </div>

              <div className={styles.filterGroup}>
                <label>Số lượng / trang</label>
                <select
                  value={localFilters.limit}
                  onChange={(e) =>
                    handleFilterChange("limit", parseInt(e.target.value))
                  }
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            <div className={styles.filterActions}>
              <button className={styles.clearBtn} onClick={clearFilters}>
                Xóa bộ lọc
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OrderFilters;
