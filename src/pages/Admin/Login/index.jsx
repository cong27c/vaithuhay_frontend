"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Login.module.scss";
import { login } from "@/Services/adminAuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailInputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input khi mount
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

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Gọi API login qua service
      const data = await login({ email, password });

      if (data?.access_token) {
        setSuccess("Đăng nhập thành công!");
        localStorage.setItem("admin_access_token", data?.access_token);
      }

      // Thành công

      // Reset form
      setEmail("");
      setPassword("");

      // Chuyển hướng sau 1.5s
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } catch (err) {
      setError(err?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  // Submit khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) handleSubmit(e);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚙️</span>
          </div>
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.subtitle}>Đăng nhập để tiếp tục</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && (
            <div className={styles.successMessage}>
              <span className={styles.successIcon}>✓</span>
              {success}
            </div>
          )}

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

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          <div className={styles.formFooter}>
            <label className={styles.checkbox}>
              {/* <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              /> */}
              {/* <span>Nhớ đăng nhập</span> */}
            </label>
            {/* <a href="#" className={styles.forgotLink}>
              Quên mật khẩu?
            </a> */}
          </div>

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
      </div>

      <div className={styles.bgDecoration}></div>
    </div>
  );
};

export default Login;
