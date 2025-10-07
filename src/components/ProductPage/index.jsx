import { useParams } from "react-router-dom";
import ProductFeatureBanner from "./ProductFeatureBanner";
import ProductHero from "./ProductHero";
import ProductInfoLayout from "./ProductInfoLayout";
import styles from "./ProductPage.module.scss";
import ProductReviews from "./ProductReviews";
import ProductSlider from "./ProductSlider";
import { useEffect, useState, useCallback, memo } from "react";
import {
  getBlogsProduct,
  getHighlightsProduct,
  getProductBySlug,
  getProductVariantsBySlug,
} from "@/Services/productService";

// Sử dụng React.memo cho các component con
const MemoizedProductHero = memo(ProductHero);
const MemoizedProductFeatureBanner = memo(ProductFeatureBanner);
const MemoizedProductInfoLayout = memo(ProductInfoLayout);
const MemoizedProductReviews = memo(ProductReviews);
const MemoizedProductSlider = memo(ProductSlider);

function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [highlights, setHighlights] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [variants, setVariants] = useState({});
  const [attributes, setAttributes] = useState({});

  // Sử dụng useCallback để tránh tạo hàm mới mỗi lần render
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      // 1. Lấy product và variants SONG SONG thay vì tuần tự
      const [productData, productVariants] = await Promise.all([
        getProductBySlug(slug),
        getProductVariantsBySlug(slug),
      ]);

      setProduct(productData);
      setVariants(productVariants?.variants);
      setAttributes(productVariants?.attributes);

      // 2. Nếu có id thì gọi song song highlights + blogs
      if (productData?.id) {
        const [hl, bl] = await Promise.all([
          getHighlightsProduct(productData.id),
          getBlogsProduct(productData.id),
        ]);
        setHighlights(hl);
        setBlogs(bl);
      }
    } catch (err) {
      console.error("Fetch product error:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Hiển thị loading state
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  // Hiển thị error state nếu không có product
  if (!product || Object.keys(product).length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>
          <h3>Không tìm thấy sản phẩm</h3>
          <p>Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  console.log("attributes", attributes);
  console.log("variants", variants);

  return (
    <div className={styles.wrapper}>
      <MemoizedProductHero
        productId={product.id}
        subImgs={product.images?.subImages}
        mainImg={product.images?.mainImage}
        detail={product?.detail}
        attributes={attributes}
        variants={variants}
      />
      <MemoizedProductFeatureBanner highlights={highlights} />
      <MemoizedProductInfoLayout
        blogsProduct={blogs}
        specifications={product.detail?.specifications}
      />
      <MemoizedProductReviews product={product} />
      <MemoizedProductSlider />
    </div>
  );
}

export default memo(ProductPage);
