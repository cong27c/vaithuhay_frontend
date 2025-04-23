import styles from "./Banner.module.scss";
import PropTypes from "prop-types";

function Banner({
  inventory = "",
  title = "",
  cost = "",
  sale = "",
  image = "",
  originalPrice = "",
}) {
  return (
    <div className={styles["card-item"]}>
      <div className={styles["product-image"]}>
        <a href="#!">
          <img src={image} alt="Product Image" />
        </a>
        <div className={styles["stock-info"]}>
          <div>🔥Còn {inventory}</div>
          <div className={styles["limited-stock"]}>
            Giới hạn chỉ {inventory} sản phẩm
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title} </h4>
        <p className={styles.cost}>Giá niêm yết: {originalPrice}</p>
        <div className={styles.price}>
          <div className={styles.cost}>{cost}</div>
          <div className={styles.sale}>{sale}</div>
        </div>
        <div className={styles["list-btn"]}>
          <button className={styles.btn}>XEM THÊM</button>
          <button className={styles.btn}>MUA NGAY</button>
        </div>
      </div>
    </div>
  );
}

Banner.propTypes = {
  inventory: PropTypes.string,
  title: PropTypes.string,
  cost: PropTypes.string,
  sale: PropTypes.string,
  image: PropTypes.string,
  originalPrice: PropTypes.string,
};

export default Banner;
