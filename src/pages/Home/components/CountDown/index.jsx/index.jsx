import styles from "./CountDown.module.scss";

function CountDown() {
  return (
    <>
      <div className={styles.countdown}>
        <div className={styles.time}>
          <span className={styles.number}>00</span>
          <span className={styles.label}>Ngày</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.time}>
          <span className={styles.number}>00</span>
          <span className={styles.label}>Giờ</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.time}>
          <span className={styles.number}>00</span>
          <span className={styles.label}>Phút</span>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.time}>
          <span className={styles.number}>00</span>
          <span className={styles.label}>Giây</span>
        </div>
      </div>
    </>
  );
}

export default CountDown;
