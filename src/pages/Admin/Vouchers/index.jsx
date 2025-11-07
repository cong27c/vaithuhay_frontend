"use client";

import { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  Search,
  X,
  Eye,
  Calendar,
  Users,
  Tag,
} from "lucide-react";
import Card from "@/components/Admin/ui/Card";
import Button from "@/components/Admin/ui/Button";
import VoucherConditions from "./VoucherConditions";
import useVoucher from "@/Hooks/useVoucher";
import styles from "./Vouchers.module.scss";

const Vouchers = () => {
  const {
    vouchers,
    loading,
    error,
    pagination,
    fetchVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    updateStatus,
  } = useVoucher();

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [form, setForm] = useState({
    code: "",
    description: "",
    voucher_type: "percent",
    voucher_value: "",
    min_order_amount: 0,
    usage_limit: null,
    per_user_limit: 1,
    start_date: "",
    end_date: "",
    status: "active",
    conditions: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const callVouchers = async () => {
    await fetchVouchers();
  };
  useEffect(() => {
    callVouchers();
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Voucher Error:", error);
    }
  }, [error]);

  const handleSearch = () => {
    fetchVouchers({ search: searchTerm, page: 1 });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      fetchVouchers({ search: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!form.code.trim()) {
      errors.code = "Mã voucher là bắt buộc";
    } else if (form.code.length < 3) {
      errors.code = "Mã voucher phải có ít nhất 3 ký tự";
    }

    if (!form.voucher_value || form.voucher_value <= 0) {
      errors.voucher_value = "Giá trị voucher phải lớn hơn 0";
    }

    if (form.voucher_type === "percent" && form.voucher_value > 100) {
      errors.voucher_value = "Giá trị phần trăm không được vượt quá 100%";
    }

    if (form.min_order_amount < 0) {
      errors.min_order_amount = "Giá trị đơn tối thiểu không được âm";
    }

    if (form.usage_limit !== null && form.usage_limit <= 0) {
      errors.usage_limit = "Giới hạn sử dụng phải lớn hơn 0";
    }

    if (form.per_user_limit <= 0) {
      errors.per_user_limit = "Giới hạn mỗi người dùng phải lớn hơn 0";
    }

    if (
      form.start_date &&
      form.end_date &&
      new Date(form.start_date) > new Date(form.end_date)
    ) {
      errors.end_date = "Ngày kết thúc phải sau ngày bắt đầu";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const openModal = (voucher = null) => {
    if (voucher) {
      setEditingVoucher(voucher);
      setForm({
        code: voucher.code,
        description: voucher.description || "",
        voucher_type: voucher.voucher_type,
        voucher_value: voucher.voucher_value,
        min_order_amount: voucher.min_order_amount || 0,
        usage_limit: voucher.usage_limit,
        per_user_limit: voucher.per_user_limit || 1,
        start_date: voucher.start_date || "",
        end_date: voucher.end_date || "",
        status: voucher.status,
        conditions: voucher.conditions || [],
      });
    } else {
      setEditingVoucher(null);
      setForm({
        code: "",
        description: "",
        voucher_type: "percent",
        voucher_value: "",
        min_order_amount: 0,
        usage_limit: null,
        per_user_limit: 1,
        start_date: "",
        end_date: "",
        status: "active",
        conditions: [],
      });
    }
    setFormErrors({});
    setModalOpen(true);
  };

  const handleSaveVoucher = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formattedData = {
        ...form,
        voucher_value: parseFloat(form.voucher_value),
        min_order_amount: parseFloat(form.min_order_amount),
        usage_limit: form.usage_limit ? parseInt(form.usage_limit) : null,
        per_user_limit: parseInt(form.per_user_limit),
        start_date: form.start_date || null,
        end_date: form.end_date || null,
      };
      console.log(formattedData);

      if (editingVoucher) {
        await updateVoucher(editingVoucher.id, formattedData);
      } else {
        await createVoucher(formattedData);
      }
      setModalOpen(false);
      fetchVouchers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteVoucher = async (id, code) => {
    if (window.confirm(`Bạn có chắc muốn xóa voucher "${code}"?`)) {
      try {
        await deleteVoucher(id);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    console.log("End date changed:", form.end_date);
  }, [form.end_date]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus(id, newStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConditionsChange = (conditions) => {
    setForm((prev) => ({ ...prev, conditions }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Hoạt động", color: "success" },
      inactive: { label: "Không hoạt động", color: "warning" },
      expired: { label: "Hết hạn", color: "error" },
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`${styles.badge} ${styles[config.color]}`}>
        {config.label}
      </span>
    );
  };

  const getVoucherTypeDisplay = (voucher) => {
    if (voucher.voucher_type === "percent") {
      return ` ${voucher.voucher_value}%`;
    } else {
      return ` ${voucher.voucher_value?.toLocaleString()} VND`;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Không giới hạn";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className={styles.vouchersPage}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Quản lý Voucher</h1>
          <p>Quản lý mã giảm giá và khuyến mãi</p>
        </div>
        <Button variant="primary" onClick={() => openModal()}>
          <Plus size={18} /> Add Voucher
        </Button>
      </div>

      <Card className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã hoặc mô tả voucher..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button variant="outline" onClick={handleSearch} loading={loading}>
              Tìm kiếm
            </Button>
          </div>

          <div className={styles.stats}>
            <span>Tổng: {pagination.totalItems || 0} voucher</span>
          </div>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mã Voucher</th>
                <th>Loại / Giá trị</th>
                <th>Đơn tối thiểu</th>
                <th>Đã sử dụng</th>
                <th>Thời hạn</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading && vouchers.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.loadingCell}>
                    <div className={styles.spinner}></div>
                    Đang tải danh sách voucher...
                  </td>
                </tr>
              ) : vouchers.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyCell}>
                    <Tag size={48} className={styles.emptyIcon} />
                    <div>Chưa có voucher nào</div>
                    <Button
                      variant="primary"
                      onClick={() => openModal()}
                      className={styles.emptyButton}
                    >
                      <Plus size={16} /> Tạo voucher đầu tiên
                    </Button>
                  </td>
                </tr>
              ) : (
                vouchers?.map((voucher) => (
                  <tr key={voucher.id} className={styles.voucherRow}>
                    <td>
                      <div className={styles.codeCell}>
                        <strong className={styles.voucherCode}>
                          {voucher.code}
                        </strong>
                        {voucher.description && (
                          <div className={styles.voucherDescription}>
                            {voucher.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.typeCell}>
                        <span className={styles.voucherType}>
                          {getVoucherTypeDisplay(voucher)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.amountCell}>
                        {voucher.min_order_amount ? (
                          <>
                            <span className={styles.amount}>
                              {voucher.min_order_amount.toLocaleString()} VND
                            </span>
                          </>
                        ) : (
                          <span className={styles.noLimit}>Không giới hạn</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.usageCell}>
                        <Users size={14} />
                        <span>
                          {voucher.Usages?.length || 0}
                          {voucher.usage_limit && ` / ${voucher.usage_limit}`}
                        </span>
                        {voucher.per_user_limit > 1 && (
                          <small>({voucher.per_user_limit}/người)</small>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.dateCell}>
                        <Calendar size={14} />
                        <div className={styles.dateRange}>
                          <div>{formatDate(voucher.start_date)}</div>
                          <div className={styles.dateSeparator}>→</div>
                          <div>{formatDate(voucher.end_date)}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.statusCell}>
                        {getStatusBadge(voucher.status)}
                        <select
                          value={voucher.status}
                          onChange={(e) =>
                            handleStatusChange(voucher.id, e.target.value)
                          }
                          className={styles.statusSelect}
                        >
                          <option value="active">Hoạt động</option>
                          <option value="inactive">Tạm dừng</option>
                          <option value="expired">Hết hạn</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={`${styles.actionBtn} ${styles.view}`}
                          title="Xem chi tiết"
                          onClick={() => openModal(voucher)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className={`${styles.actionBtn} ${styles.edit}`}
                          title="Sửa"
                          onClick={() => openModal(voucher)}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className={`${styles.actionBtn} ${styles.delete}`}
                          title="Xóa"
                          onClick={() =>
                            handleDeleteVoucher(voucher.id, voucher.code)
                          }
                          disabled={voucher.Usages?.length > 0}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className={styles.pagination}>
            <Button
              variant="outline"
              disabled={pagination.currentPage === 1 || loading}
              onClick={() =>
                fetchVouchers({
                  page: pagination.currentPage - 1,
                  search: searchTerm,
                })
              }
            >
              ← Previous
            </Button>

            <div className={styles.pageInfo}>
              <span>
                Trang {pagination.currentPage} / {pagination.totalPages}
              </span>
              <span className={styles.totalItems}>
                ({pagination.totalItems} voucher)
              </span>
            </div>

            <Button
              variant="outline"
              disabled={
                pagination.currentPage === pagination.totalPages || loading
              }
              onClick={() =>
                fetchVouchers({
                  page: pagination.currentPage + 1,
                  search: searchTerm,
                })
              }
            >
              Next →
            </Button>
          </div>
        )}
      </Card>

      {/* Modal Create/Edit Voucher */}
      {modalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>
                {editingVoucher ? (
                  <>
                    Sửa Voucher{" "}
                    <span className={styles.voucherCode}>
                      #{editingVoucher.code}
                    </span>
                  </>
                ) : (
                  "Thêm Voucher Mới"
                )}
              </h2>
              <button
                className={styles.closeBtn}
                onClick={() => setModalOpen(false)}
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGrid}>
                {/* Thông tin cơ bản */}
                <div className={styles.formSection}>
                  <h3>Thông tin cơ bản</h3>

                  <div className={styles.formRow}>
                    <div
                      className={`${styles.inputGroup} ${formErrors.code ? styles.error : ""}`}
                    >
                      <label>Mã Voucher *</label>
                      <input
                        placeholder="VD: SUMMER2024, WELCOME10..."
                        value={form.code}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            code: e.target.value.toUpperCase(),
                          })
                        }
                      />
                      {formErrors.code && (
                        <span className={styles.errorText}>
                          {formErrors.code}
                        </span>
                      )}
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Trạng thái</label>
                      <select
                        value={form.status}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                      >
                        <option value="active">🟢 Hoạt động</option>
                        <option value="inactive">🟡 Tạm dừng</option>
                        <option value="expired">🔴 Hết hạn</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Mô tả</label>
                    <textarea
                      placeholder="Mô tả về voucher, điều kiện sử dụng..."
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      rows={2}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label>Loại voucher *</label>
                      <select
                        value={form.voucher_type}
                        onChange={(e) =>
                          setForm({ ...form, voucher_type: e.target.value })
                        }
                      >
                        <option value="percent">💯 Phần trăm (%)</option>
                        <option value="fixed">💰 Số tiền cố định (VND)</option>
                      </select>
                    </div>

                    <div
                      className={`${styles.inputGroup} ${formErrors.voucher_value ? styles.error : ""}`}
                    >
                      <label>Giá trị *</label>
                      <input
                        type="number"
                        placeholder={
                          form.voucher_type === "percent" ? "10" : "50000"
                        }
                        value={form.voucher_value}
                        onChange={(e) =>
                          setForm({ ...form, voucher_value: e.target.value })
                        }
                      />
                      {formErrors.voucher_value && (
                        <span className={styles.errorText}>
                          {formErrors.voucher_value}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`${styles.inputGroup} ${formErrors.min_order_amount ? styles.error : ""}`}
                  >
                    <label>Đơn hàng tối thiểu (VND)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={form.min_order_amount}
                      onChange={(e) =>
                        setForm({ ...form, min_order_amount: e.target.value })
                      }
                    />
                    {formErrors.min_order_amount && (
                      <span className={styles.errorText}>
                        {formErrors.min_order_amount}
                      </span>
                    )}
                    <small>Đặt 0 để áp dụng cho mọi đơn hàng</small>
                  </div>
                </div>

                {/* Điều kiện áp dụng */}
                <div className={styles.formSection}>
                  <VoucherConditions
                    conditions={form.conditions}
                    onChange={handleConditionsChange}
                  />
                </div>

                {/* Giới hạn sử dụng */}
                <div className={styles.formSection}>
                  <h3>Giới hạn sử dụng</h3>

                  <div className={styles.formRow}>
                    <div
                      className={`${styles.inputGroup} ${formErrors.usage_limit ? styles.error : ""}`}
                    >
                      <label>Tổng số lượt sử dụng</label>
                      <input
                        type="number"
                        placeholder="Không giới hạn"
                        value={form.usage_limit || ""}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            usage_limit: e.target.value
                              ? parseInt(e.target.value)
                              : null,
                          })
                        }
                      />
                      {formErrors.usage_limit && (
                        <span className={styles.errorText}>
                          {formErrors.usage_limit}
                        </span>
                      )}
                      <small>Để trống nếu không giới hạn</small>
                    </div>

                    <div
                      className={`${styles.inputGroup} ${formErrors.per_user_limit ? styles.error : ""}`}
                    >
                      <label>Giới hạn mỗi người dùng *</label>
                      <input
                        type="number"
                        placeholder="1"
                        min="1"
                        value={form.per_user_limit}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            per_user_limit: parseInt(e.target.value),
                          })
                        }
                      />
                      {formErrors.per_user_limit && (
                        <span className={styles.errorText}>
                          {formErrors.per_user_limit}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Thời gian hiệu lực */}
                <div className={styles.formSection}>
                  <h3>Thời gian hiệu lực</h3>

                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label>Ngày bắt đầu</label>
                      <input
                        type="date"
                        value={form.start_date}
                        onChange={(e) =>
                          setForm({ ...form, start_date: e.target.value })
                        }
                      />
                      <small>Để trống nếu có hiệu lực ngay</small>
                    </div>

                    <div className={`${styles.inputGroup}`}>
                      <label>Ngày kết thúc</label>
                      <input
                        type="date"
                        value={form.end_date}
                        onChange={(e) =>
                          setForm({ ...form, end_date: e.target.value })
                        }
                      />
                      {console.log("end_date", form.end_date)}
                      {formErrors.end_date && (
                        <span className={styles.errorText}>
                          {formErrors.end_date}
                        </span>
                      )}

                      <small>Để trống nếu không có hạn sử dụng</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <div className={styles.formActions}>
                <Button
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  disabled={loading}
                >
                  Hủy
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveVoucher}
                  loading={loading}
                  className={styles.saveButton}
                >
                  {editingVoucher ? "💾 Cập nhật" : "✨ Tạo"} Voucher
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vouchers;
