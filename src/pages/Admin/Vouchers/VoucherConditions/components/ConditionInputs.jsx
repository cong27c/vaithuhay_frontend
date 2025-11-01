import { memo, useCallback, useEffect } from "react";
import { Check } from "lucide-react";
import styles from "../VoucherConditions.module.scss";
import PropTypes from "prop-types";

// Mock data
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
];

const mockUsers = [
  { id: 1, email: "user1@example.com", name: "Nguyễn Văn A" },
  { id: 2, email: "user2@example.com", name: "Trần Thị B" },
];

const ConditionInputs = memo(({ condition, index, onUpdate }) => {
  const { condition_type, condition_value } = condition;

  // Debug: log changes
  useEffect(() => {
    console.log(`Condition ${index} updated:`, condition);
  }, [condition, index]);

  const handleUpdate = useCallback(
    (field, value) => {
      console.log(`Updating condition ${index}:`, field, value);
      onUpdate(index, field, value);
    },
    [index, onUpdate],
  );

  const renderMinOrderValue = useCallback(
    () => (
      <div className={styles.inputGroup}>
        <label>Giá trị tối thiểu (VND)</label>
        <div className={styles.inputWithAddon}>
          <input
            type="number"
            placeholder="Nhập số tiền..."
            value={condition_value || ""}
            onChange={(e) => handleUpdate("condition_value", e.target.value)}
            min="0"
          />
          <span className={styles.addon}>VND</span>
        </div>
        <small>Voucher chỉ áp dụng khi đơn hàng đạt giá trị này</small>
      </div>
    ),
    [condition_value, handleUpdate],
  );

  const renderCollectionSelect = useCallback(
    () => (
      <div className={styles.inputGroup}>
        <label>Danh mục áp dụng</label>
        <div className={styles.multiSelect}>
          {mockCategories.map((cat) => {
            const isSelected = condition_value?.includes(cat.id.toString());
            return (
              <label key={cat.id} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={isSelected || false}
                  onChange={() => {
                    const currentValues = condition_value || [];
                    const updatedValues = isSelected
                      ? currentValues.filter((id) => id !== cat.id.toString())
                      : [...currentValues, cat.id.toString()];
                    handleUpdate("condition_value", updatedValues);
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
    ),
    [condition_value, handleUpdate],
  );

  const renderProductSelect = useCallback(
    () => (
      <div className={styles.inputGroup}>
        <label>Sản phẩm áp dụng</label>
        <div className={styles.multiSelect}>
          {mockProducts.map((product) => {
            const isSelected = condition_value?.includes(product.id.toString());
            return (
              <label key={product.id} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={isSelected || false}
                  onChange={() => {
                    const currentValues = condition_value || [];
                    const updatedValues = isSelected
                      ? currentValues.filter(
                          (id) => id !== product.id.toString(),
                        )
                      : [...currentValues, product.id.toString()];
                    handleUpdate("condition_value", updatedValues);
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
    ),
    [condition_value, handleUpdate],
  );

  const renderFirstOrder = useCallback(
    () => (
      <div className={styles.inputGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={condition_value === "true"}
            onChange={(e) =>
              handleUpdate("condition_value", e.target.checked.toString())
            }
          />
          <span className={styles.customCheckbox}>
            {condition_value === "true" && <Check size={12} />}
          </span>
          Chỉ áp dụng cho đơn hàng đầu tiên
        </label>
        <small>Voucher chỉ dành cho khách hàng mới (đơn hàng đầu tiên)</small>
      </div>
    ),
    [condition_value, handleUpdate],
  );

  const renderUserSelect = useCallback(
    () => (
      <div className={styles.inputGroup}>
        <label>Người dùng cụ thể</label>
        <div className={styles.multiSelect}>
          {mockUsers.map((user) => {
            const isSelected = condition_value?.includes(user.id.toString());
            return (
              <label key={user.id} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={isSelected || false}
                  onChange={() => {
                    const currentValues = condition_value || [];
                    const updatedValues = isSelected
                      ? currentValues.filter((id) => id !== user.id.toString())
                      : [...currentValues, user.id.toString()];
                    handleUpdate("condition_value", updatedValues);
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
    ),
    [condition_value, handleUpdate],
  );

  const renderTimeFrame = useCallback(() => {
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
                handleUpdate("condition_value", value);
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
                handleUpdate("condition_value", value);
              }}
            />
          </div>
        </div>
        <small>Voucher chỉ khả dụng trong khung giờ này</small>
      </div>
    );
  }, [condition_value, handleUpdate]);

  switch (condition_type) {
    case "min_order_value":
      return renderMinOrderValue();
    case "collection":
      return renderCollectionSelect();
    case "product":
      return renderProductSelect();
    case "first_order":
      return renderFirstOrder();
    case "specific_user":
      return renderUserSelect();
    case "time_frame":
      return renderTimeFrame();
    default:
      return (
        <div className={styles.unknownCondition}>
          Loại điều kiện không được hỗ trợ: {condition_type}
        </div>
      );
  }
});

ConditionInputs.propTypes = {
  condition: PropTypes.shape({
    condition_type: PropTypes.string.isRequired,
    condition_value: PropTypes.any,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

ConditionInputs.displayName = "ConditionInputs";

export default ConditionInputs;
