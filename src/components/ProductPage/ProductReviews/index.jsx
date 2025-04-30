import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProductReviews.module.scss";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ReviewQuestionTabs from "./ReviewQuestionTabs";

function ProductReviews() {
  return (
    <div className={styles.wrapper}>
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
            Bàn Văn Phòng 9Space OFFICE – Phong Cách Tinh Tế, Chất Lượng Vượt
            Trội
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
      <div className={styles.reviews}>
        <div className={styles.title}>Đánh giá sản phẩm</div>
        <div className={styles.reviewsAction}>
          <ReviewQuestionTabs />
        </div>
        <div className={styles.reviewList}>
          <h3 className={styles.subTitle}>ĐÁNH GIÁ</h3>
          <div className={styles.reviewItem}>
            <span className={styles.author}>HỒI VUITHUHAY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
