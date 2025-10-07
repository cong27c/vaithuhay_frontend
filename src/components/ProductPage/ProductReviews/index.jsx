import { useEffect } from "react";
import ProductBanner from "./ProductBanner";
import styles from "./ProductReviews.module.scss";
import ReviewsSection from "./ReviewsSection";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "@/Services/productService";

function ProductReviews({ product }) {
  return (
    <div className={styles.wrapper}>
      <ProductBanner />
      <div className={styles.reviews}>
        <div className={styles.title}>Đánh giá sản phẩm</div>
        <div className={styles.reviewsAction}>
          <ReviewsSection product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
