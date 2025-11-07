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
  getRelatedProducts,
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
  const [productId, setProductId] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Sử dụng useCallback để tránh tạo hàm mới mỗi lần render
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      // 1. Lấy product và variants SONG SONG thay vì tuần tự
      const [productData, productVariants] = await Promise.all([
        getProductBySlug(slug),
        getProductVariantsBySlug(slug),
      ]);
      setProductId(productData?.id || null);
      setProduct(productData);
      setVariants(productVariants?.variants);
      setAttributes(productVariants?.attributes);
    } catch (err) {
      console.error("Fetch product error:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);
  useEffect(() => {
    if (!productId) return;

    const fetchRelated = async () => {
      try {
        const related = await getRelatedProducts(productId);
        setRelatedProducts(related?.data);
      } catch (err) {
        console.error("Fetch related products error:", err);
      }
    };

    fetchRelated();
  }, [productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!product?.id) return;

    let cancelled = false;

    const loadExtraData = async () => {
      try {
        const [hl, bl] = await Promise.all([
          getHighlightsProduct(product.id),
          getBlogsProduct(product.id),
        ]);
        if (!cancelled) {
          setHighlights(hl);
          setBlogs(bl);
        }
      } catch (err) {
        console.error("Lazy load highlights/blogs error:", err);
      }
    };

    // Delay 500ms sau khi product render để tránh nghẽn
    const timer = setTimeout(loadExtraData, 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [product?.id]);

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

  return (
    <div className={styles.wrapper}>
      <MemoizedProductHero
        productId={product.id}
        subImgs={product.images?.subImages}
        mainImg={product.images?.mainImage}
        preOrder={product?.preorder}
        isPreOrder={product?.isPreOrder}
        isRegistered={product?.preorder?.isRegistered || false}
        detail={product?.detail}
        attributes={attributes}
        variants={variants}
        typePreOrder={product?.preorder?.type}
      />
      <MemoizedProductFeatureBanner
        highlights={highlights}
        productName={product?.detail.name}
      />
      <MemoizedProductInfoLayout
        blogsProduct={blogs}
        specifications={product.detail?.specifications}
        relatedProducts={relatedProducts}
      />
      <MemoizedProductReviews product={product} />
      <MemoizedProductSlider />
    </div>
  );
}

export default memo(ProductPage);
