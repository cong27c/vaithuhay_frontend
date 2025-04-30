import ProductFeatureBanner from "./ProductFeatureBanner";
import ProductHero from "./ProductHero";
import ProductInfoLayout from "./ProductInfoLayout";
import styles from "./ProductPage.module.scss";
import ProductReviews from "./ProductReviews";
import PropTypes from "prop-types";

function ProductPage() {
  return (
    <div className={styles.wrapper}>
      <ProductHero />
      <ProductFeatureBanner />
      <ProductInfoLayout />
      <ProductReviews />
    </div>
  );
}

export default ProductPage;
