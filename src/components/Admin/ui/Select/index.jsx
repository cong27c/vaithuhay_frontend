// File: /components/Admin/ui/Select.jsx
"use client";

import React from "react";
import styles from "./Select.module.scss";

const Select = ({
  label,
  options = [],
  error = "",
  placeholder = "Chọn...",
  register, // Thêm register prop
  className = "",
  ...props
}) => {
  return (
    <div className={styles.selectWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={`${styles.select} ${error ? styles.error : ""} ${className}`}
        {...(register ? register : {})} // Spread register nếu có
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Select;
