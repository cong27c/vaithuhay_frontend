import { Link } from "react-router-dom";
import styles from "./SlideHalfImage.module.scss";
import PropTypes from "prop-types";

function SlideHalfImage({
  image = "",
  name = "",
  desc = "",
  price = "",
  notification = "",
  originalPrice = "",
  discountedPrice = "",
  content = "Nhận ưu đãi ngay",
  variant = "default",
  show = false,
  order = false,
  link = "",
}) {
  return (
    <>
      {variant === "default" ? (
        <div className={styles.default}>
          <div className={styles.images}>
            <Link to={`${import.meta.env.VITE_FRONTEND_URL}/products/${link}`}>
              <img src={image} alt="" />
            </Link>
            <div className={styles.price}>
              <div className={styles.originalPrice}>{originalPrice}</div>
              {discountedPrice && (
                <div className={styles.discountedPrice}>{discountedPrice}</div>
              )}
            </div>
          </div>
          <div className={styles.content}>
            <Link to={`${import.meta.env.VITE_FRONTEND_URL}/products/${link}`}>
              <div className={styles.name}>{name}</div>
            </Link>

            <div className={styles.desc}>{desc}</div>
            {show && (
              <div className={styles.buttonList}>
                <button className={styles.btn}>{content}</button>
                <div className={styles["cart-icon"]}>
                  <i className="fa-solid fa-cart-plus"></i>
                </div>
              </div>
            )}
            {order && (
              <button className={styles.customButton}>
                <span>ĐĂNG KÝ ĐẶT TRƯỚC</span>
                <div className={styles.bellIcon}>
                  <i className="fas fa-bell"></i>
                </div>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.alternative}>
          <a href="#!">
            <img src={image} alt="" />
          </a>
          <div className={styles.content}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.desc}>{desc}</div>
            <div className={styles.price}>{price}</div>
            <div className={styles.notification}>{notification}</div>
            <div className={styles.buttonList}>
              <button className={styles.btn}>
                {content} {originalPrice}
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
  name: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
  desc: PropTypes.string,
  price: PropTypes.string,
  notification: PropTypes.string,
  originalPrice: PropTypes.string,
  discountedPrice: PropTypes.string,
  content: PropTypes.string,
  show: PropTypes.bool,
  order: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "alternative"]),
};

export default SlideHalfImage;
