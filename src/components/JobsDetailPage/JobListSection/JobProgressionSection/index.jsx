import styles from "./JobProgressionSection.module.scss";

function JobProgressionSection() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        LỘ TRÌNH <br />
        PHÁT TRIỂN TẠI VAITHUHAY
      </div>
      <div className={styles.image}>
        <img
          src="https://w.ladicdn.com/s1550x900/5c0b681b8b014a0649e90d0a/lo-trinh-phat-trien-marketing-fulltime-20230227074347-pzim2.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default JobProgressionSection;
