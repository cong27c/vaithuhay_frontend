"use client";

import { useState, useEffect } from "react";
import styles from "./QuantityBar.module.scss";

export default function QuantityBar({
  totalSoldQuantity = 2,
  totalLimitQuantity = 80,
  endDate = "2025-01-11T23:59:59",
  description = "Đây là sản phẩm đang trong quá trình phát triển, cần đặt trước một số lượng tối thiểu để hỗ trợ nhà khởi nghiệp thuận lợi trong quá trình sản xuất, giúp đưa sản phẩm đến tay người tiêu dùng. Đông góp của bạn sẽ góp phần đưa những sản phẩm chất lượng đến với người Việt.",
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(endDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const progressPercentage =
    totalLimitQuantity > 0
      ? Math.min((totalSoldQuantity / totalLimitQuantity) * 100, 100)
      : 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.preOrderContainer}>
      <div className={styles.header}>
        <div className={styles.targetBadge}>
          <span className={styles.targetLabel}>Mục tiêu:</span>
          <span className={styles.targetValue}>{totalLimitQuantity}</span>
          <span
            className={styles.targetIcon}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            ⓘ
            {showTooltip && (
              <div className={styles.tooltip}>
                <div className={styles.tooltipContent}>{description}</div>
                <div className={styles.tooltipArrow}></div>
              </div>
            )}
          </span>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.quantitySection}>
          <div className={styles.quantityText}>
            Số lượng đã đặt: <strong>{totalSoldQuantity}</strong>
            {totalLimitQuantity > 0 && ` / ${totalLimitQuantity}`}
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className={styles.campaignInfo}>
          <div className={styles.endDateRow}>
            <span className={styles.label}>Chiến dịch kết thúc:</span>
            <span className={styles.value}>{formatDate(endDate)}</span>
          </div>
          <div className={styles.countdownRow}>
            <span className={styles.label}>Còn</span>
            <span className={styles.countdown}>
              {timeLeft.days} ngày {timeLeft.hours}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
