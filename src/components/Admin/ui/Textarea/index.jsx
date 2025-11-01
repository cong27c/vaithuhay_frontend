// File: /components/Admin/ui/Textarea.jsx
"use client";

import React from "react";
import styles from "./Textarea.module.scss";

const Textarea = ({
  label,
  placeholder = "",
  rows = 3,
  error = "",
  register, // Thêm register prop
  className = "",
  ...props
}) => {
  return (
    <div className={styles.textareaWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={`${styles.textarea} ${error ? styles.error : ""} ${className}`}
        placeholder={placeholder}
        rows={rows}
        {...(register ? register : {})} // Spread register nếu có
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Textarea;
