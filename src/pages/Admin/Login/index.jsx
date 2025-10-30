"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailInputRef = useRef(null);

  // Focus input tự động khi component mount
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // Validate form
  const validateForm = () => {
    if (!email.trim()) {
      setError("Vui lòng nhập email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email không hợp lệ");
      return false;
    }
    if (!password) {
      setError("Vui lòng nhập mật khẩu");
      return false;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    return true;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Gọi API /admin/login
      const response = await fetch("/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Đăng nhập thất bại");
        return;
      }

      setSuccess("Đăng nhập thành công!");
      // Lưu token nếu cần
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }
      // Reset form
      setEmail("");
      setPassword("");
      // Redirect hoặc xử lý tiếp theo
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    } catch (err) {
      setError("Lỗi kết nối. Vui lòng thử lại.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚙️</span>
          </div>
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.subtitle}>Đăng nhập để tiếp tục</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Error Message */}
          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* Success Message */}
          {success && (
            <div className={styles.successMessage}>
              <span className={styles.successIcon}>✓</span>
              {success}
            </div>
          )}

          {/* Email Input */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              ref={emailInputRef}
              type="email"
              id="email"
              className={styles.input}
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="password.."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className={styles.formFooter}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span>Nhớ đăng nhập</span>
            </label>
            <a href="#" className={styles.forgotLink}>
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Đang đăng nhập...
              </>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p>
            Cần hỗ trợ?{" "}
            <a href="#" className={styles.supportLink}>
              Liên hệ với chúng tôi
            </a>
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className={styles.bgDecoration}></div>
    </div>
  );
};

export default Login;
