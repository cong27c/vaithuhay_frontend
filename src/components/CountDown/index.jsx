import { useEffect, useState } from "react";
import styles from "./CountDown.module.scss";
import PropTypes from "prop-types";

function CountDown({ targetDate, type = "default" }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    if (!targetDate || !(targetDate instanceof Date)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <>
      {type === "default" ? (
        <div className={styles.defaultCountDown}>
          <div className={styles.time}>
            <span className={styles.number}>{formatNumber(timeLeft.days)}</span>
            <span className={styles.label}>Ngày</span>
          </div>
          <span className={styles.separator}>:</span>
          <div className={styles.time}>
            <span className={styles.number}>
              {formatNumber(timeLeft.hours)}
            </span>
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
        </div>
      ) : (
        <div className={styles.bannerCountDown}>
          <div className={styles["list-item"]}>
            <div className={styles["countdown-item"]}>
              <span className={styles.number}>
                {formatNumber(timeLeft.days)}
              </span>
              <span className={styles.label}>ngày</span>
            </div>
            <div className={styles.separator}>:</div>
            <div className={styles["countdown-item"]}>
              <span className={styles.number}>
                {" "}
                {formatNumber(timeLeft.hours)}
              </span>
              <span className={styles.label}>giờ</span>
            </div>
            <div className={styles.separator}>:</div>
            <div className={styles["countdown-item"]}>
              <span className={styles.number}>
                {" "}
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className={styles.label}>phút</span>
            </div>
            <div className={styles.separator}>:</div>
            <div className={styles["countdown-item"]}>
              <span className={styles.number}>
                {" "}
                {formatNumber(timeLeft.seconds)}
              </span>
              <span className={styles.label}>giây</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

CountDown.propTypes = {
  targetDate: PropTypes.object,
  type: PropTypes.oneOf(["default", "banner"]),
};
export default CountDown;
