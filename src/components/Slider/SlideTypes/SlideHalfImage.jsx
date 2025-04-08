import styles from "./SlideHalfImage.module.scss";
import PropTypes from "prop-types";

function SlideHalfImage({
  image = "",
  title = "",
  desc = "",
  price = "",
  notification = "",
  sale = "",
  cost = "",
  content = "Nhận ưu đãi ngay",
  variant = "default",
  show = false,
}) {
  return (
    <>
      {variant === "default" ? (
        <div className={styles.default}>
          <div className={styles.images}>
            <img src={image} alt="" />
            <div className={styles.price}>
              <div className={styles.sale}>{sale}</div>
              <div className={styles.cost}>{cost}</div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.desc}>{desc}</div>
            {show && (
              <div className={styles.buttonList}>
                <button className={styles.btn}>{content}</button>
                <div className={styles["cart-icon"]}>
                  <i className="fa-solid fa-cart-plus"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.alternative}>
          <a href="#!">
            <img src={image} alt="" />
          </a>
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.desc}>{desc}</div>
            <div className={styles.price}>{price}</div>
            <div className={styles.notification}>{notification}</div>
            <div className={styles.buttonList}>
              <button className={styles.btn}>
                {content} {sale}
              </button>
              <div className={styles["cart-icon"]}>
                <i className="fa-solid fa-cart-plus"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

SlideHalfImage.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  desc: PropTypes.string,
  price: PropTypes.string,
  notification: PropTypes.string,
  sale: PropTypes.string,
  cost: PropTypes.string,
  content: PropTypes.string,
  show: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "alternative"]),
};

export default SlideHalfImage;
