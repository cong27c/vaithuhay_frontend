import images from "~/assets/images";
import ButtonsList from "../ButtonsList";
import styles from "./Slider2.module.scss";

function Slider2() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["Slider-2"]}>
        <div className={styles["slider2-header"]}>
          <h2 className={styles.title}>COMBO GÓC LÀM VIỆC</h2>
          <button className={styles.btn}>
            Khám phá thêm <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className={styles["list-card"]}>
          <div className={styles.card}>
            <a href="">
              <img
                src={images.course1}
                alt="Combo Góc Làm Việc"
                className={styles["carousel-image"]}
              />
            </a>
            <div className={styles["tag-list"]}>
              <button className={styles.tag}>Đèn thanh</button>
              <button className={styles.tag}>Đèn ống</button>
              <button className={styles.tag}>Kệ màn hình</button>
              <button className={styles.tag}>Đồng hồ</button>
              <button className={styles.tag}>...</button>
            </div>
          </div>
          <div className={styles.card}>
            <a href="">
              <img
                src={images.course1}
                alt="Combo Góc Làm Việc"
                className={styles["carousel-image"]}
              />
            </a>
            <div className={styles["tag-list"]}>
              <button className={styles.tag}>Đèn thanh</button>
              <button className={styles.tag}>Đèn ống</button>
              <button className={styles.tag}>Kệ màn hình</button>
              <button className={styles.tag}>Đồng hồ</button>
              <button className={styles.tag}>...</button>
            </div>
          </div>
          <div className={styles.card}>
            <a href="">
              <img
                src={images.course1}
                alt="Combo Góc Làm Việc"
                className={styles["carousel-image"]}
              />
            </a>
            <div className={styles["tag-list"]}>
              <button className={styles.tag}>Đèn thanh</button>
              <button className={styles.tag}>Đèn ống</button>
              <button className={styles.tag}>Kệ màn hình</button>
              <button className={styles.tag}>Đồng hồ</button>
              <button className={styles.tag}>...</button>
            </div>
          </div>
          <div className={styles.card}>
            <a href="">
              <img
                src={images.course1}
                alt="Combo Góc Làm Việc"
                className={styles["carousel-image"]}
              />
            </a>
            <div className={styles["tag-list"]}>
              <button className={styles.tag}>Đèn thanh</button>
              <button className={styles.tag}>Đèn ống</button>
              <button className={styles.tag}>Kệ màn hình</button>
              <button className={styles.tag}>Đồng hồ</button>
              <button className={styles.tag}>...</button>
            </div>
          </div>
          <div className={styles.card}>
            <a href="">
              <img
                src={images.course1}
                alt="Combo Góc Làm Việc"
                className={styles["carousel-image"]}
              />
            </a>
            <div className={styles["tag-list"]}>
              <button className={styles.tag}>Đèn thanh</button>
              <button className={styles.tag}>Đèn ống</button>
              <button className={styles.tag}>Kệ màn hình</button>
              <button className={styles.tag}>Đồng hồ</button>
              <button className={styles.tag}>...</button>
            </div>
          </div>
          <div className={styles.card}>
            <a href="">
              <img
                src={images.course1}
                alt="Combo Góc Làm Việc"
                className={styles["carousel-image"]}
              />
            </a>
            <div className={styles["tag-list"]}>
              <button className={styles.tag}>Đèn thanh</button>
              <button className={styles.tag}>Đèn ống</button>
              <button className={styles.tag}>Kệ màn hình</button>
              <button className={styles.tag}>Đồng hồ</button>
              <button className={styles.tag}>...</button>
            </div>
          </div>
          <div className={styles.card}>
            <a href="">
              <img
                src={images.course1}
                alt="Combo Góc Làm Việc"
                className={styles["carousel-image"]}
              />
            </a>
            <div className={styles["tag-list"]}>
              <button className={styles.tag}>Đèn thanh</button>
              <button className={styles.tag}>Đèn ống</button>
              <button className={styles.tag}>Kệ màn hình</button>
              <button className={styles.tag}>Đồng hồ</button>
              <button className={styles.tag}>...</button>
            </div>
          </div>
          <div className={styles.card}>
            <a href="">
              <img
                src={images.course1}
                alt="Combo Góc Làm Việc"
                className={styles["carousel-image"]}
              />
            </a>
            <div className={styles["tag-list"]}>
              <button className={styles.tag}>Đèn thanh</button>
              <button className={styles.tag}>Đèn ống</button>
              <button className={styles.tag}>Kệ màn hình</button>
              <button className={styles.tag}>Đồng hồ</button>
              <button className={styles.tag}>...</button>
            </div>
          </div>
        </div>
        <div className={styles.dotList}>
          <div className={`${styles.dot} ${styles.active}`}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        <ButtonsList />
      </div>
    </div>
  );
}

export default Slider2;
