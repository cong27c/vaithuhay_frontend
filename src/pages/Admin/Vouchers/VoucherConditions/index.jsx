"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, HelpCircle, Check, X } from "lucide-react";
import Button from "@/components/Admin/ui/Button";
import styles from "./VoucherConditions.module.scss";

const VoucherConditions = ({ conditions = [], onChange }) => {
  const [localConditions, setLocalConditions] = useState([]);

  useEffect(() => {
    setLocalConditions(conditions || []);
  }, [conditions]);

  const conditionTypes = [
    {
      value: "min_order_value",
      label: "💰 Giá trị đơn hàng tối thiểu",
      description: "Áp dụng khi tổng giá trị đơn hàng đạt mức tối thiểu",
    },
    {
      value: "category",
      label: "📁 Danh mục sản phẩm",
      description: "Chỉ áp dụng cho sản phẩm trong danh mục được chọn",
    },
    {
      value: "product",
      label: "🛍️ Sản phẩm áp dụng",
      description: "Chỉ áp dụng cho những sản phẩm cụ thể",
    },
    {
      value: "user_group",
      label: "👥 Nhóm người dùng",
      description: "Chỉ áp dụng cho nhóm người dùng nhất định",
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

  const userGroups = [
    { value: "all", label: "Tất cả người dùng" },
    { value: "new", label: "Người dùng mới" },
    { value: "vip", label: "Người dùng VIP" },
    { value: "regular", label: "Người dùng thường xuyên" },
  ];

  // Mock data - Thay thế bằng API call thực tế
  const mockCategories = [
    { id: 1, name: "Điện tử" },
    { id: 2, name: "Sách" },
    { id: 3, name: "Quần áo" },
    { id: 4, name: "Đồ gia dụng" },
    { id: 5, name: "Thể thao" },
  ];

  const mockProducts = [
    { id: 1, name: "iPhone 15", category: "Điện tử" },
    { id: 2, name: "MacBook Pro", category: "Điện tử" },
    { id: 3, name: "Sách lập trình", category: "Sách" },
    { id: 4, name: "Áo thun basic", category: "Quần áo" },
    { id: 5, name: "Máy xay sinh tố", category: "Đồ gia dụng" },
  ];

  const mockUsers = [
    { id: 1, email: "user1@example.com", name: "Nguyễn Văn A" },
    { id: 2, email: "user2@example.com", name: "Trần Thị B" },
    { id: 3, email: "user3@example.com", name: "Lê Văn C" },
  ];

  const addCondition = () => {
    const newCondition = {
      id: Date.now() + Math.random(),
      condition_type: "min_order_value",
      operator: ">=",
      condition_value: "",
    };
    const updatedConditions = [...localConditions, newCondition];
    setLocalConditions(updatedConditions);
    onChange(updatedConditions);
  };

  const updateCondition = (index, field, value) => {
    const updatedConditions = localConditions.map((condition, i) =>
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

  const getOperatorOptions = (conditionType) => {
    switch (conditionType) {
      case "min_order_value":
        return operators.filter((op) =>
          [">", ">=", "<", "<=", "="].includes(op.value),
        );
      case "category":
      case "product":
      case "user_group":
      case "specific_user":
        return operators.filter((op) => ["in", "not_in"].includes(op.value));
      case "first_order":
      case "time_frame":
        return operators.filter((op) => op.value === "=");
      default:
        return operators;
    }
  };

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

      case "category":
        return (
          <div className={styles.inputGroup}>
            <label>Danh mục áp dụng</label>
            <div className={styles.multiSelect}>
              {mockCategories.map((cat) => {
                const isSelected = condition_value?.includes(cat.id.toString());
                return (
                  <label key={cat.id} className={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        const currentValues = condition_value || [];
                        const updatedValues = isSelected
                          ? currentValues.filter(
                              (id) => id !== cat.id.toString(),
                            )
                          : [...currentValues, cat.id.toString()];
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
              {mockProducts.map((product) => {
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
                        {product.category}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            <small>Chọn sản phẩm cụ thể được áp dụng voucher</small>
          </div>
        );

      case "user_group":
        return (
          <div className={styles.inputGroup}>
            <label>Nhóm người dùng</label>
            <select
              value={condition_value || ""}
              onChange={(e) =>
                updateCondition(index, "condition_value", e.target.value)
              }
            >
              <option value="">Chọn nhóm người dùng</option>
              {userGroups.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
            <small>Chọn nhóm người dùng được phép sử dụng voucher</small>
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
              {mockUsers.map((user) => {
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
          {localConditions.map((condition, index) => (
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
                      onChange={(e) =>
                        updateCondition(index, "condition_type", e.target.value)
                      }
                    >
                      {conditionTypes.map((type) => (
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
                      {getOperatorOptions(condition.condition_type).map(
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
