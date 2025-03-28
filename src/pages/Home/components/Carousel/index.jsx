import ButtonsList from "../ButtonsList";
import styles from "./Carousel.module.scss";
import CountDown from "../CountDown/index.jsx";
import images from "~/assets/images";
import Button from "~/components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Carousel() {
  return (
    <>
      <div className={styles["carousel-container"]}>
        <div className={styles["head-carousel"]}>
          <h2 className={styles.title}>
            CHỌN LỰA SẢN PHẨM MỞ BÁN
            <span>
              <i className="fa-solid fa-rocket"></i>
            </span>
          </h2>
          <Button discoverButton className={styles.btn} icon={faArrowRight}>
            Khám phá ngay
          </Button>
        </div>
        <div className={styles["body-carousel"]}>
          <div className={styles["list-item"]}>
            <div className={`${styles.item} ${styles.left}`}>
              <img src={images.course1} alt="" />
              <div className={styles.in4}>
                <h3 className={styles["title-carousel"]}>
                  Màn Hình Rời Đa Năng SOTSU FlipAction – Tối Ưu Không Gian Làm
                  Việc Di Động
                </h3>
                <div className={styles.notification}>
                  <i className="fa-regular fa-calendar"></i>
                  Dự kiến ra mắt
                </div>
                <div className={styles.title}>0 giờ sáng</div>
                <div className={styles.date}>26/03/2025</div>
                <CountDown />
                <button className={styles["btn-register"]}>
                  Đăng ký đặt trước
                </button>
              </div>
            </div>
            <div className={`${styles.item} ${styles.active}`}>
              <img src={images.course2} alt="" />
              <div className={styles.in4}>
                <h3 className={styles["title-carousel"]}>
                  Màn Hình Rời Đa Năng SOTSU FlipAction – Tối Ưu Không Gian Làm
                  Việc Di Động
                </h3>
                <div className={styles.notification}>
                  <i className="fa-regular fa-calendar"></i>
                  Dự kiến ra mắt
                </div>
                <div className={styles.title}>0 giờ sáng</div>
                <div className={styles.date}>26/03/2025</div>
                <CountDown />
                <button className={styles["btn-register"]}>
                  Đăng ký đặt trước
                </button>
              </div>
            </div>
            <div className={`${styles.item} ${styles.right}`}>
              <img src={images.course3} alt="" />
              <div className={styles.in4}>
                <h3 className={styles["title-carousel"]}>
                  Màn Hình Rời Đa Năng SOTSU FlipAction – Tối Ưu Không Gian Làm
                  Việc Di Động
                </h3>
                <div className={styles.notification}>
                  <i className="fa-regular fa-calendar"></i>
                  Dự kiến ra mắt
                </div>
                <div className={styles.title}>0 giờ sáng</div>
                <div className={styles.date}>26/03/2025</div>
                <CountDown />
                <button className={styles["btn-register"]}>
                  Đăng ký đặt trước
                </button>
              </div>
            </div>
          </div>

          <ButtonsList width="101%" />
        </div>
      </div>
    </>
  );
}

export default Carousel;
