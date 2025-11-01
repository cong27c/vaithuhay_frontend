import { memo, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import styles from "../VoucherConditions.module.scss";
import ConditionInputs from "./ConditionInputs";

const ConditionItem = memo(
  ({
    condition,
    index,
    conditionTypes,
    operators,
    onUpdate,
    onRemove,
    getOperatorOptions,
    getConditionDisplay,
    getConditionDescription,
  }) => {
    // Tự động cập nhật toán tử khi loại điều kiện thay đổi
    useEffect(() => {
      const validOps = getOperatorOptions(condition.condition_type);
      const currentOp = condition.operator;

      // Kiểm tra nếu toán tử hiện tại không hợp lệ cho loại điều kiện mới
      const isValidOp = validOps.some((op) => op.value === currentOp);

      if (!isValidOp && validOps.length > 0) {
        const defaultOp = validOps[0]?.value || "=";
        onUpdate(index, "operator", defaultOp);
      }
    }, [
      condition.condition_type,
      condition.operator,
      index,
      onUpdate,
      getOperatorOptions,
    ]);

    const handleTypeChange = useCallback(
      (e) => {
        const newType = e.target.value;
        const validOps = getOperatorOptions(newType);
        const defaultOp = validOps[0]?.value || "=";

        // Cập nhật loại điều kiện và toán tử
        onUpdate(index, "condition_type", newType);
        onUpdate(index, "operator", defaultOp);

        // Reset condition_value khi thay đổi loại điều kiện
        switch (newType) {
          case "min_order_value":
            onUpdate(index, "condition_value", "");
            break;
          case "collection":
          case "product":
          case "specific_user":
            onUpdate(index, "condition_value", []);
            break;
          case "first_order":
            onUpdate(index, "condition_value", "false");
            break;
          case "time_frame":
            onUpdate(index, "condition_value", { start: "", end: "" });
            break;
          default:
            onUpdate(index, "condition_value", "");
        }
      },
      [index, onUpdate, getOperatorOptions],
    );

    const handleOperatorChange = useCallback(
      (e) => {
        onUpdate(index, "operator", e.target.value);
      },
      [index, onUpdate],
    );

    const handleRemove = useCallback(() => {
      onRemove(index);
    }, [index, onRemove]);

    return (
      <div className={styles.conditionItem}>
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
            onClick={handleRemove}
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
                onChange={handleTypeChange}
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
                onChange={handleOperatorChange}
              >
                {getOperatorOptions(condition.condition_type).map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.conditionInput}>
            <ConditionInputs
              condition={condition}
              index={index}
              onUpdate={onUpdate}
            />
          </div>
        </div>
      </div>
    );
  },
);

ConditionItem.displayName = "ConditionItem";

export default ConditionItem;
