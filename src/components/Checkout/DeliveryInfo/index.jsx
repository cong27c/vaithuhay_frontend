"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./DeliveryInfo.module.scss";
import AddressSelector from "../AddressSelector";
import { useSelector } from "react-redux";
import { checkoutSchema } from "@/schema/checkoutSchema";
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { faTry } from "@fortawesome/free-solid-svg-icons";
import { checkout } from "@/Services/stuffService";

export default function DeliveryInfo() {
  const currentUser = useCurrentUser();

  const isLoggedIn = !!currentUser;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: "home",
      paymentMethod: "cod",
      fullName: currentUser
        ? `${currentUser.last_name} ${currentUser.first_name}`
        : "",
      email: currentUser ? currentUser.email : "",
      phone: currentUser ? currentUser.phone : "",
    },
  });

  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const result = await checkout(data, isLoggedIn);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddressSelect = (addressData) => {
    setValue("province", addressData.province);
    setValue("district", addressData.district);
    setValue("ward", addressData.ward);
    setValue("provinceName", addressData.provinceName);
    setValue("districtName", addressData.districtName);
    setValue("wardName", addressData.wardName);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Vài Thứ Hay</h1>
        <div className={styles.breadcrumb}>
          <span>Giỏ hàng</span>
          <span className={styles.separator}>›</span>
          <span>Thông tin giao hàng</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Thông tin giao hàng</h2>
          {currentUser ? (
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}></div>
              <div className={styles.userWelcome}>
                <span className={styles.userName}>
                  {currentUser.name || currentUser.email}
                </span>
                <a href="/logout" className={styles.logoutLink}>
                  Đăng xuất
                </a>
              </div>
            </div>
          ) : (
            <p className={styles.loginPrompt}>
              Bạn đã có tài khoản?{" "}
              <a href="/login" className={styles.link}>
                Đăng nhập
              </a>
            </p>
          )}

          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Họ và tên"
              {...register("fullName")}
              className={`${styles.input} ${errors.fullName ? styles.error : ""}`}
            />
            {errors.fullName && (
              <span className={styles.errorMessage}>
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`${styles.input} ${errors.email ? styles.error : ""}`}
              />
              {errors.email && (
                <span className={styles.errorMessage}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className={styles.formGroup}>
              <input
                type="tel"
                placeholder="Số điện thoại"
                {...register("phone")}
                className={`${styles.input} ${errors.phone ? styles.error : ""}`}
              />
              {errors.phone && (
                <span className={styles.errorMessage}>
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="home"
                {...register("deliveryMethod")}
                className={styles.radio}
              />
              <span>Giao tận nơi</span>
            </label>
          </div>

          {deliveryMethod === "home" && (
            <>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Địa chỉ chi tiết..."
                  {...register("address")}
                  className={`${styles.input} ${errors.address ? styles.error : ""}`}
                />
                {errors.address && (
                  <span className={styles.errorMessage}>
                    {errors.address.message}
                  </span>
                )}
              </div>

              <AddressSelector onAddressSelect={handleAddressSelect} />
              {errors.province && (
                <span className={styles.errorMessage}>
                  {errors.province.message}
                </span>
              )}
            </>
          )}

          <div className={styles.formGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="store"
                {...register("deliveryMethod")}
                className={styles.radio}
              />
              <span>Nhận tại cửa hàng</span>
            </label>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Phương thức vận chuyển</h2>
          <div className={styles.shippingBox}>
            <div className={styles.shippingIcon}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect
                  x="10"
                  y="30"
                  width="40"
                  height="30"
                  stroke="#ccc"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M50 40 L70 40 L70 60 L50 60 Z"
                  stroke="#ccc"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="25"
                  cy="65"
                  r="5"
                  stroke="#ccc"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="65"
                  r="5"
                  stroke="#ccc"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <p className={styles.shippingText}>
              Vui lòng chọn tỉnh / thành để có danh sách phương thức vận chuyển.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Phương thức thanh toán</h2>

          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="cod"
              {...register("paymentMethod")}
              className={styles.radio}
            />
            <div className={styles.paymentContent}>
              <div className={styles.paymentIcon}>💵</div>
              <span>Thanh toán khi giao hàng (COD)</span>
            </div>
          </label>

          <div className={styles.paymentNote}>
            Đơn hàng sẽ được giao cho khách hàng từ 2-4 ngày làm việc nếu khách
            hàng ở tỉnh xa, yêu cầu giao gấp liên hệ ngay hotline 0938223885
          </div>

          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="bank"
              {...register("paymentMethod")}
              className={styles.radio}
            />
            <div className={styles.paymentContent}>
              <div className={styles.paymentIcon}>🏦</div>
              <span>Chuyển khoản ngân hàng (Tự động xác nhận giao dịch)</span>
            </div>
          </label>

          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="momo"
              {...register("paymentMethod")}
              className={styles.radio}
            />
            <div className={styles.paymentContent}>
              <div className={styles.paymentIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#a50064" />
                  <text
                    x="12"
                    y="17"
                    fontSize="14"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    M
                  </text>
                </svg>
              </div>
              <span>Ví MoMo</span>
            </div>
          </label>

          <label className={styles.paymentOption}>
            <input
              type="radio"
              value="vnpay"
              {...register("paymentMethod")}
              className={styles.radio}
            />
            <div className={styles.paymentContent}>
              <div className={styles.paymentIcon}>🏦</div>
              <div className={styles.paymentLogos}>
                <span>Thanh toán online qua cổng VNPay</span>
                <div className={styles.cardLogos}>
                  <span className={styles.cardBadge}>VNPAY</span>
                  <span className={styles.cardBadge}>VISA</span>
                  <span className={styles.cardBadge}>MC</span>
                  <span className={styles.cardBadge}>JCB</span>
                </div>
              </div>
            </div>
          </label>
          {errors.paymentMethod && (
            <span className={styles.errorMessage}>
              {errors.paymentMethod.message}
            </span>
          )}
        </div>

        <div className={styles.footer}>
          <a href="#" className={styles.backLink}>
            Giỏ hàng
          </a>
          <button type="submit" className={styles.submitButton}>
            Hoàn tất đơn hàng
          </button>
        </div>
      </form>
    </div>
  );
}
