import CountDown from "~/pages/Home/components/CountDown/index.jsx";
import styles from "./Banner.module.scss";
import PropTypes from "prop-types";

function Carousel({ image = "", title = "", date = "" }) {
  return (
    <div className={`${styles.item} ${styles.left}`}>
      <img src={image} alt="" />
      <div className={styles.in4}>
        <h3 className={styles["title-carousel"]}>
          Màn Hình Rời Đa Năng SOTSU FlipAction – Tối Ưu Không Gian Làm Việc Di
          Động
        </h3>
        <div className={styles.notification}>
          <i className="fa-regular fa-calendar"></i>
          Dự kiến ra mắt
        </div>
        <div className={styles.title}>0 giờ sáng</div>
        <div className={styles.date}>{date}</div>
        <CountDown />
        <button className={styles["btn-register"]}>Đăng ký đặt trước</button>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
};

export default Carousel;
