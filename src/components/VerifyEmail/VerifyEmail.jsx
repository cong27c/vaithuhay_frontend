import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verify } from "@/Services/authServices";
import styles from "./VerifyEmail.module.scss";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVerify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Token không hợp lệ");
        return;
      }

      try {
        const data = await verify(token);
        setStatus("success");
        setMessage(
          "Xác thực email thành công! Bạn có thể đăng nhập ngay bây giờ.",
        );
        console.log("✅ Verify success:", data);
      } catch (error) {
        setStatus("error");
        setMessage(error.message || "Xác thực thất bại. Vui lòng thử lại.");
        console.error("❌ Verify error:", error.message);
      }
    };
    fetchVerify();
  }, [token]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <h1>Email Verification</h1>
        </div>

        <div className={styles.content}>
          {status === "loading" && (
            <div className={styles.status}>
              <div className={styles.spinner}></div>
              <p>Đang xác thực email...</p>
            </div>
          )}

          {status === "success" && (
            <div className={styles.status}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.successTitle}>Thành Công!</h2>
              <p className={styles.successMessage}>{message}</p>
              <Link to={"/login"} className={styles.homeButton}>
                Đăng nhập ngay
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className={styles.status}>
              <div className={styles.errorIcon}>✕</div>
              <h2 className={styles.errorTitle}>Lỗi</h2>
              <p className={styles.errorMessage}>{message}</p>
            </div>
          )}

          <Link to={"/"} className={styles.homeButton}>
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
