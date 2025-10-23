"use client";

import { Link, useSearchParams } from "react-router-dom";
import styles from "./PreOrderVerify.module.scss";
import { useEffect } from "react";
import { preOrderVerify } from "@/Services/preOrderService";
import { toast } from "react-toastify";

// 🔹 import Redux
import { useDispatch } from "react-redux";
import { setCartItems } from "@/features/cart/cartSlice";

export default function PreOrderVerify() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVerify = async () => {
      if (!token) return;

      try {
        const result = await preOrderVerify(token);
        console.log(result);

        if (result.success) {
          toast.success(
            result.message || "Verify và add sản phẩm vào cart thành công",
          );

          // 🔹 set cartItems vào Redux store
          dispatch(setCartItems([result.data]));
        }
      } catch (error) {
        toast.error(
          error.message || "Verify và add sản phẩm vào cart thất bại",
        );
        console.error("❌ Verify error:", error.message);
      }
    };

    fetchVerify();
  }, [token, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Chúc mừng bạn đã tới Vaithuhay</h1>
        <p className={styles.description}>
          Sản phẩm bạn chờ bao lâu nay đã mở bán
        </p>

        <div className={styles.buttonGroup}>
          <Link to={"/cart"}>
            <button className={styles.buttonPrimary}>Tới giỏ hàng ngay</button>
          </Link>
          <Link to={"/"}>
            <button className={styles.buttonSecondary}>Về trang chủ</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
