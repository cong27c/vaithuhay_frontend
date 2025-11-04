"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, HelpCircle, Check, X } from "lucide-react";
import Button from "@/components/Admin/ui/Button";
import styles from "./VoucherConditions.module.scss";

const conditionTypes = [
  {
    value: "min_order_value",
    label: "💰 Giá trị đơn hàng tối thiểu",
    description: "Áp dụng khi tổng giá trị đơn hàng đạt mức tối thiểu",
  },
  {
    value: "collection",
    label: "📁 Danh mục sản phẩm",
    description: "Chỉ áp dụng cho sản phẩm trong danh mục được chọn",
  },
  {
    value: "product",
    label: "🛍️ Sản phẩm áp dụng",
    description: "Chỉ áp dụng cho những sản phẩm cụ thể",
  },
  {
    value: "first_order",
    label: "🎯 Đơn hàng đầu tiên",
    description: "Chỉ áp dụng cho đơn hàng đầu tiên của khách hàng",
  },
  {
    value: "specific_user",
    label: "👤 Người dùng cụ thể",
    description: "Chỉ áp dụng cho những người dùng được chỉ định",
  },
  {
    value: "time_frame",
    label: "⏰ Khung thời gian",
    description: "Chỉ áp dụng trong khung giờ nhất định",
  },
];

const operators = [
  { value: "=", label: "Bằng" },
  { value: ">", label: "Lớn hơn" },
  { value: "<", label: "Nhỏ hơn" },
  { value: ">=", label: "Lớn hơn hoặc bằng" },
  { value: "<=", label: "Nhỏ hơn hoặc bằng" },
  { value: "in", label: "Nằm trong" },
  { value: "not_in", label: "Không nằm trong" },
];

// Mock data - Thay thế bằng API call thực tế
const mockCategories = [
  { id: 1, name: "Setup Góc Làm Việc" },
  { id: 2, name: "Bàn phím hay" },
  { id: 3, name: "Du Lịch Dã Ngoại" },
  { id: 4, name: "Loa - Tai Nghe" },
  { id: 5, name: "Sản phẩm độc đáo nhất" },
  { id: 6, name: "Sản phẩm HOT" },
  { id: 7, name: "Sản phẩm DIY Steampunk" },
  { id: 8, name: "Đèn tràn trí NID LIGHT" },
];

const mockProducts = [
  { id: 1, name: "iPhone 15", collection: "Điện tử" },
  { id: 2, name: "MacBook Pro", collection: "Điện tử" },
  { id: 3, name: "Sách lập trình", collection: "Sách" },
  { id: 4, name: "Áo thun basic", collection: "Quần áo" },
  { id: 5, name: "Máy xay sinh tố", collection: "Đồ gia dụng" },
];

const mockUsers = [
  { id: 1, email: "user1@example.com", name: "Nguyễn Văn A" },
  { id: 2, email: "user2@example.com", name: "Trần Thị B" },
  { id: 3, email: "user3@example.com", name: "Lê Văn C" },
];

const VoucherConditions = ({ conditions = [], onChange }) => {
  const [localConditions, setLocalConditions] = useState([]);

  useEffect(() => {
    if (conditions && conditions.length > 0 && localConditions.length === 0) {
      setLocalConditions(conditions);
    }
  }, [conditions]);

  const addCondition = () => {
    const newCondition = {
      condition_type: "min_order_value",
      operator: ">=",
      condition_value: "",
    };
    const updatedConditions = [...localConditions, newCondition];
    setLocalConditions(updatedConditions);
    onChange(updatedConditions);
  };

  const updateCondition = (index, field, value) => {
    const updatedConditions = localConditions?.map((condition, i) =>
      i === index ? { ...condition, [field]: value } : condition,
    );
    setLocalConditions(updatedConditions);
    onChange(updatedConditions);
  };

  const removeCondition = (index) => {
    const updatedConditions = localConditions.filter((_, i) => i !== index);
    setLocalConditions(updatedConditions);
    onChange(updatedConditions);
  };

  const getOperatorOptions = useCallback((conditionType) => {
    switch (conditionType) {
      case "min_order_value":
        return [
          { value: ">", label: "Lớn hơn" },
          { value: ">=", label: "Lớn hơn hoặc bằng" },
          { value: "=", label: "Bằng" },
          { value: "<", label: "Nhỏ hơn" },
          { value: "<=", label: "Nhỏ hơn hoặc bằng" },
        ];
      case "collection":
      case "product":
      case "specific_user":
        return [
          { value: "in", label: "Nằm trong" },
          { value: "not_in", label: "Không nằm trong" },
        ];
      case "first_order":
        return [{ value: "=", label: "Bằng" }];
      case "time_frame":
        return [{ value: "=", label: "Trong khoảng" }];
      default:
        return [{ value: "=", label: "Bằng" }];
    }
  }, []);

  const getConditionDescription = (conditionType) => {
    const condition = conditionTypes.find((c) => c.value === conditionType);
    return condition ? condition.description : "";
  };

  const renderConditionInput = (condition, index) => {
    const { condition_type, operator, condition_value } = condition;

    switch (condition_type) {
      case "min_order_value":
        return (
          <div className={styles.inputGroup}>
            <label>Giá trị tối thiểu (VND)</label>
            <div className={styles.inputWithAddon}>
              <input
                type="number"
                placeholder="Nhập số tiền..."
                value={condition_value || ""}
                onChange={(e) =>
                  updateCondition(index, "condition_value", e.target.value)
                }
                min="0"
              />
              <span className={styles.addon}>VND</span>
            </div>
            <small>Voucher chỉ áp dụng khi đơn hàng đạt giá trị này</small>
          </div>
        );

      case "collection":
        return (
          <div className={styles.inputGroup}>
            <label>Danh mục áp dụng</label>
            <div className={styles.multiSelect}>
              {mockCategories?.map((cat) => {
                const isSelected = condition_value?.includes(cat.id.toString());
                return (
                  <label key={cat.id} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        const currentValues = condition_value || [];
                        const updatedValues = isSelected
                          ? currentValues.filter((id) => id !== cat.id)
                          : [...currentValues, cat.id];
                        updateCondition(
                          index,
                          "condition_value",
                          updatedValues,
                        );
                      }}
                    />
                    <span className={styles.checkmark}></span>
                    {cat.name}
                  </label>
                );
              })}
            </div>
            <small>Chọn danh mục sản phẩm được áp dụng voucher</small>
          </div>
        );

      case "product":
        return (
          <div className={styles.inputGroup}>
            <label>Sản phẩm áp dụng</label>
            <div className={styles.multiSelect}>
              {mockProducts?.map((product) => {
                const isSelected = condition_value?.includes(
                  product.id.toString(),
                );
                return (
                  <label key={product.id} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        const currentValues = condition_value || [];
                        const updatedValues = isSelected
                          ? currentValues.filter(
                              (id) => id !== product.id.toString(),
                            )
                          : [...currentValues, product.id.toString()];
                        updateCondition(
                          index,
                          "condition_value",
                          updatedValues,
                        );
                      }}
                    />
                    <span className={styles.checkmark}></span>
                    <div className={styles.productInfo}>
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.productCategory}>
                        {product.collection}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            <small>Chọn sản phẩm cụ thể được áp dụng voucher</small>
          </div>
        );

      case "first_order":
        return (
          <div className={styles.inputGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={condition_value === "true"}
                onChange={(e) =>
                  updateCondition(
                    index,
                    "condition_value",
                    e.target.checked.toString(),
                  )
                }
              />
              <span className={styles.customCheckbox}>
                {condition_value === "true" && <Check size={12} />}
              </span>
              Chỉ áp dụng cho đơn hàng đầu tiên
            </label>
            <small>
              Voucher chỉ dành cho khách hàng mới (đơn hàng đầu tiên)
            </small>
          </div>
        );

      case "specific_user":
        return (
          <div className={styles.inputGroup}>
            <label>Người dùng cụ thể</label>
            <div className={styles.multiSelect}>
              {mockUsers?.map((user) => {
                const isSelected = condition_value?.includes(
                  user.id.toString(),
                );
                return (
                  <label key={user.id} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        const currentValues = condition_value || [];
                        const updatedValues = isSelected
                          ? currentValues.filter(
                              (id) => id !== user.id.toString(),
                            )
                          : [...currentValues, user.id.toString()];
                        updateCondition(
                          index,
                          "condition_value",
                          updatedValues,
                        );
                      }}
                    />
                    <span className={styles.checkmark}></span>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>{user.name}</div>
                      <div className={styles.userEmail}>{user.email}</div>
                    </div>
                  </label>
                );
              })}
            </div>
            <small>Chọn người dùng cụ thể được phép sử dụng voucher</small>
          </div>
        );

      case "time_frame":
        const timeValue = condition_value || { start: "", end: "" };
        return (
          <div className={styles.inputGroup}>
            <label>Khung giờ áp dụng</label>
            <div className={styles.timeInputs}>
              <div className={styles.timeGroup}>
                <label>Từ</label>
                <input
                  type="time"
                  value={timeValue.start}
                  onChange={(e) => {
                    const value = { ...timeValue, start: e.target.value };
                    updateCondition(index, "condition_value", value);
                  }}
                />
              </div>
              <div className={styles.timeGroup}>
                <label>Đến</label>
                <input
                  type="time"
                  value={timeValue.end}
                  onChange={(e) => {
                    const value = { ...timeValue, end: e.target.value };
                    updateCondition(index, "condition_value", value);
                  }}
                />
              </div>
            </div>
            <small>Voucher chỉ khả dụng trong khung giờ này</small>
          </div>
        );

      default:
        return (
          <div className={styles.unknownCondition}>
            Loại điều kiện không được hỗ trợ
          </div>
        );
    }
  };

  const getConditionDisplay = (condition) => {
    const conditionType = conditionTypes.find(
      (c) => c.value === condition.condition_type,
    );
    return conditionType ? conditionType.label : "Điều kiện không xác định";
  };

  return (
    <div className={styles.conditionsContainer}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h3>Điều kiện áp dụng</h3>
          <div className={styles.tooltip}>
            <HelpCircle size={16} />
            <div className={styles.tooltipText}>
              Thêm các điều kiện để giới hạn phạm vi áp dụng của voucher
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={addCondition}
          className={styles.addButton}
        >
          <Plus size={16} /> Thêm điều kiện
        </Button>
      </div>

      {localConditions.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎯</div>
          <h4>Chưa có điều kiện nào</h4>
          <p>Thêm điều kiện để giới hạn phạm vi áp dụng voucher</p>
          <Button variant="outline" onClick={addCondition}>
            <Plus size={16} /> Thêm điều kiện đầu tiên
          </Button>
        </div>
      ) : (
        <div className={styles.conditionsList}>
          {localConditions?.map((condition, index) => (
            <div key={condition.id} className={styles.conditionItem}>
              <div className={styles.conditionHeader}>
                <div className={styles.conditionTitle}>
                  <span className={styles.conditionNumber}>
                    Điều kiện {index + 1}
                  </span>
                  <span className={styles.conditionType}>
                    {getConditionDisplay(condition)}
                  </span>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeCondition(index)}
                  title="Xóa điều kiện"
                >
                  <X size={16} />
                </button>
              </div>

              <div className={styles.conditionDescription}>
                {getConditionDescription(condition.condition_type)}
              </div>

              <div className={styles.conditionControls}>
                <div className={styles.conditionSelects}>
                  <div className={styles.selectGroup}>
                    <label>Loại điều kiện</label>
                    <select
                      value={condition.condition_type}
                      onChange={(e) => {
                        const newType = e.target.value;
                        // Lấy danh sách toán tử hợp lệ cho loại mới
                        const validOps = getOperatorOptions(newType);
                        // Lấy toán tử đầu tiên làm mặc định
                        const defaultOp = validOps[0]?.value || "=";
                        // Reset lại cả condition_type + operator
                        updateCondition(index, "condition_type", newType);
                        updateCondition(index, "operator", defaultOp);
                      }}
                    >
                      {conditionTypes?.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.selectGroup}>
                    <label>Toán tử</label>
                    <select
                      value={condition.operator}
                      onChange={(e) =>
                        updateCondition(index, "operator", e.target.value)
                      }
                    >
                      {getOperatorOptions(condition.condition_type)?.map(
                        (op) => (
                          <option key={op.value} value={op.value}>
                            {op.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>

                <div className={styles.conditionInput}>
                  {renderConditionInput(condition, index)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {localConditions.length > 0 && (
        <div className={styles.conditionsFooter}>
          <span className={styles.conditionsCount}>
            {localConditions.length} điều kiện đã thêm
          </span>
          <Button variant="outline" onClick={addCondition}>
            <Plus size={16} /> Thêm điều kiện khác
          </Button>
        </div>
      )}
    </div>
  );
};

export default VoucherConditions;
