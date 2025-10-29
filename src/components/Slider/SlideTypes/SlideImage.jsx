import ProductsSetup from "@/pages/ProductsSetup";
import styles from "./SlideImage.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function SlideImage({
  image = "",
  title = "",
  status = "",
  date = "",
  variant = "default",
  nameBtn = [],
  totalSold = 0,
  totalLimit = 0,
  slug = "",
  comboId,
  onClick,
}) {
  const progressPercentage =
    totalLimit > 0 ? (totalSold / totalLimit) * 100 : 0;
  const handleClick = (e) => {
    e.preventDefault(); // Ngăn chặn navigation của Link nếu có
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {variant === "default" ? (
        <div className={styles["default"]}>
          <div className={styles.ribbon}>
            <span>PRE-ORDER</span>
          </div>
          <Link to={`/products/${slug}`}>
            <img src={image} alt="Product Image" />
          </Link>
          <div className={styles.content}>
            <h3>{title}</h3>
            <div className={styles.status}>{status}</div>
            <div
              className={styles.progress}
              style={{ "--progress-percentage": `${progressPercentage}%` }}
            >
              <div className={styles["progress-bar"]}></div>
            </div>
            <div className={styles.date}>{date}</div>
          </div>
        </div>
      ) : (
        <div className={styles["alternative"]} onClick={handleClick}>
          <img
            src={image}
            alt="Combo Góc Làm Việc"
            className={styles["carousel-image"]}
          />
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
