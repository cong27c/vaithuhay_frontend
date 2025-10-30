"use client";

import styles from "./Input.module.scss";

const Input = ({
  type = "text",
  placeholder = "",
  disabled = false,
  error = "",
  label = "",
  className = "",
  register, // Chỉ dùng cho react-hook-form
  // Không nhận value và onChange để tránh xung đột
  ...props
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...(register ? register : {})} // Chỉ spread register nếu có
        className={`${styles.input} ${error ? styles.errorInput : ""} ${className}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
