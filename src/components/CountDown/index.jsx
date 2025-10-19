import { useEffect, useState } from "react";
import styles from "./CountDown.module.scss";
import PropTypes from "prop-types";

function CountDown({ startDate, endDate, type = "default" }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function parseDate(dateString) {
    if (!dateString) return null;

    // Parse date từ định dạng "dd.mm.yyyy"
    const [day, month, year] = dateString.split(".").map(Number);
    return new Date(year, month - 1, day); // month - 1 vì Date month bắt đầu từ 0
  }

  function calculateTimeLeft() {
    // Parse startDate và endDate
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    // Kiểm tra tính hợp lệ của dates
    if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, hasEnded: true };
    }

    const now = new Date();

    // Tính khoảng thời gian còn lại từ now đến endDate
    // Nếu now < startDate, hiển thị thời gian chờ đến khi bắt đầu
    // Nếu startDate <= now < endDate, hiển thị thời gian còn lại
    // Nếu now >= endDate, hiển thị đã kết thúc

    if (now < start) {
      // Chưa bắt đầu - hiển thị thời gian chờ đến startDate
      const difference = start - now;
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        hasEnded: false,
        status: "waiting", // Trạng thái chờ bắt đầu
      };
    } else if (now >= start && now < end) {
      // Đang diễn ra - hiển thị thời gian còn lại đến endDate
      const difference = end - now;
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        hasEnded: false,
        status: "running", // Trạng thái đang chạy
      };
    } else {
      // Đã kết thúc
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        hasEnded: true,
        status: "ended", // Trạng thái đã kết thúc
      };
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  // Hiển thị thông báo theo trạng thái
  if (timeLeft.hasEnded) {
    return <div className={styles.ended}>Đã kết thúc</div>;
  }

  if (timeLeft.status === "waiting") {
    return (
      <div className={styles.waiting}>
        <div className={styles.waitingText}>Sự kiện sẽ bắt đầu sau:</div>
        {renderCountdown()}
      </div>
    );
  }

  function renderCountdown() {
    const countdownContent = (
      <>
        <div className={styles.time}>
          <span className={styles.number}>{formatNumber(timeLeft.days)}</span>
          <span className={styles.label}>Ngày</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.time}>
          <span className={styles.number}>{formatNumber(timeLeft.hours)}</span>
          <span className={styles.label}>Giờ</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.time}>
          <span className={styles.number}>
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className={styles.label}>Phút</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.time}>
          <span className={styles.number}>
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className={styles.label}>Giây</span>
        </div>
      </>
    );

    return type === "default" ? (
      <div className={styles.defaultCountDown}>{countdownContent}</div>
    ) : (
      <div className={styles.bannerCountDown}>
        <div className={styles["list-item"]}>
          <div className={styles["countdown-item"]}>
            <span className={styles.number}>{formatNumber(timeLeft.days)}</span>
            <span className={styles.label}>ngày</span>
          </div>
          <div className={styles.separator}>:</div>
          <div className={styles["countdown-item"]}>
            <span className={styles.number}>
              {formatNumber(timeLeft.hours)}
            </span>
            <span className={styles.label}>giờ</span>
          </div>
          <div className={styles.separator}>:</div>
          <div className={styles["countdown-item"]}>
            <span className={styles.number}>
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className={styles.label}>phút</span>
          </div>
          <div className={styles.separator}>:</div>
          <div className={styles["countdown-item"]}>
            <span className={styles.number}>
              {formatNumber(timeLeft.seconds)}
            </span>
            <span className={styles.label}>giây</span>
          </div>
        </div>
      </div>
    );
  }

  return renderCountdown();
}

CountDown.propTypes = {
  startDate: PropTypes.string, // Định dạng "dd.mm.yyyy"
  endDate: PropTypes.string, // Định dạng "dd.mm.yyyy"
  type: PropTypes.oneOf(["default", "banner"]),
};

export default CountDown;
