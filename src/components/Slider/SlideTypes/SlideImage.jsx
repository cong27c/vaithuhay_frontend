import styles from "./SlideImage.module.scss";
import PropTypes from "prop-types";

function SlideImage({
  image = "",
  title = "",
  status = "",
  date = "",
  variant = "default",
  nameBtn = [],
}) {
  return (
    <>
      {variant === "default" ? (
        <div className={styles["default"]}>
          <div className={styles.ribbon}>
            <span>PRE-ORDER</span>
          </div>
          <a href="#!">
            <img src={image} alt="Product Image" />
          </a>
          <div className={styles.content}>
            <h3>{title}</h3>
            <div className={styles.status}>{status}</div>
            <div className={styles.progress}>
              <div className={styles["progress-bar"]}></div>
            </div>
            <div className={styles.date}>{date}</div>
          </div>
        </div>
      ) : (
        <div className={styles["alternative"]}>
          <a href="">
            <img
              src={image}
              alt="Combo Góc Làm Việc"
              className={styles["carousel-image"]}
            />
          </a>
          <div className={styles["tag-list"]}>
            {nameBtn.map((item, index) => (
              <button key={index} className={styles.tag}>
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

SlideImage.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  status: PropTypes.string,
  date: PropTypes.string,
  nameBtn: PropTypes.array,
  variant: PropTypes.oneOf(["default", "alternative"]),
};

export default SlideImage;
