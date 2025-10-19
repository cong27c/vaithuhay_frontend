"use client";

import styles from "./Input.module.scss"; // Đổi tên file cho đúng convention

const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error = "",
  label = "",
  className = "",
  ...props
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.input} ${error ? styles.errorInput : ""} ${className}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
