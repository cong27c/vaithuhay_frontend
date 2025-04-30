import styles from "./ProductProgress.module.scss";
import clsx from "clsx";

function ProductProgress() {
  return (
    <div className={styles["progress-container"]}>
      <div className={styles["progress-bar"]}>
        <div className={styles.progress} style={{ width: "33.33%" }}></div>

        <div
          className={clsx(styles.milestone, styles.active)}
          style={{ left: "0%" }}
        >
          <span className={styles["milestone-icon"]}>
            <img
              src="https://file.hstatic.net/1000269366/file/icon_rocket_4224d159d5a9488ab0de008571a0fc6e.svg"
              alt=""
            />
          </span>
        </div>

        <div
          className={clsx(styles.milestone, styles.active)}
          style={{ left: "33.33%" }}
        >
          <span className={styles["milestone-icon"]}>
            <img
              src="https://theme.hstatic.net/1000069970/1001119059/14/roadmap-location.svg?v=7221"
              alt=""
            />
          </span>
        </div>

        <div className={styles.milestone} style={{ left: "66.66%" }}>
          <span className={styles["milestone-icon"]}>
            <img
              src="https://file.hstatic.net/1000269366/file/icon_target_8fbae03a5ecc4e4387c072a02116668a.svg"
              alt=""
            />
          </span>
        </div>

        <div className={styles.milestone} style={{ left: "80%" }}>
          <span className={styles["milestone-icon"]}>
            <img
              src="https://file.hstatic.net/1000269366/file/ezgif-5-8da15b243e_9b82af2f401e4266911b7c105df7bfe7_compact.gif"
              alt=""
            />
          </span>
        </div>
        <div className={styles.milestone} style={{ left: "100%" }}>
          <span className={styles["milestone-icon"]}>
            <img
              src="https://theme.hstatic.net/1000069970/1001119059/14/roadmap-flag.svg?v=7221"
              alt=""
            />
          </span>
        </div>
      </div>

      <div className={styles["milestone-details"]}>
        <div className={clsx(styles.detail, styles.active)}>
          <p>
            MỞ BÁN CHÍNH THỨC
            <br />
            30/02/2025
            <br />
            <span className={styles.highlight}>SAVE 30%</span>
          </p>
        </div>

        <div className={clsx(styles.detail, styles.active)}>
          <p>
            TIẾN PHONG (ƯU ĐÃI SỚM)
            <br />
            SAVE 27%
          </p>
        </div>

        <div className={styles.detail}>
          <p>
            ƯU ĐÃI BẮT ĐẦU SỚM
            <br />
            SAVE 15%
          </p>
        </div>

        <div className={styles.detail}>
          <p>
            VẬN CHUYỂN
            <br />
            Kết thúc: 30/04/2025
          </p>
        </div>
      </div>

      <div className={styles["additional-info"]}>
        <p className={styles.target}>TARGET: 550</p>
        <p className={styles.status}>
          ĐỦ ĐIỀU KIỆN GIAO HÀNG
          <br />
          Ngày giao hàng: 12/04/2025
        </p>
      </div>
    </div>
  );
}

export default ProductProgress;
