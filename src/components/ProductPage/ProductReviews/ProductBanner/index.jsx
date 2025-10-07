import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProductBanner.module.scss";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function ProductBanner() {
  return (
    <div className={styles.productBanner}>
      <div className={styles.bodyLeft}>
        <div className={styles.image}>
          <img
            src="https://product.hstatic.net/1000069970/product/cth-x-160_0f337ef2d3174828a0ccf759514c0bf2_large.jpg"
            alt=""
          />
        </div>
      </div>
      <div className={styles.bodyRight}>
        <div className={styles.title}>
          Bàn Văn Phòng 9Space OFFICE – Phong Cách Tinh Tế, Chất Lượng Vượt Trội
        </div>
        <div className={styles.row}>
          <div className={styles.subRow}>
            <div className={styles.discountPrice}>3,778,000₫</div>
            <div className={styles.discount}>-5%</div>.
          </div>
          <button className={styles.buyNowButton}>
            MUA NGAY
            <span className={styles.cartIcon}>
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/cro_addcart_img.png?v=7221"
                alt=""
              />
            </span>
          </button>
        </div>
        <div className={styles.originalPrice}>
          <strong>Giá gốc:</strong> 3,978,000₫
        </div>

        <button className={styles.attributesChange}>
          Thay đổi thuộc tính
          <span>
            <FontAwesomeIcon icon={faPen} />
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProductBanner;
