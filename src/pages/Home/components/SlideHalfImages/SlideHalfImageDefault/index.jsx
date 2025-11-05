import images from "@/assets/images";
import styles from "./SlideHalfImageDefault.module.scss";
import Button from "@/components/Button";
import Slider from "@/components/Slider";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useCollectionSlideBySlug } from "@/hooks/useCollection";

function SlideHalfImageDefault() {
  const slug = "cong-nghe-tien-ich-co-san";

  const {
    data: collectionData,
    isLoading,
    error,
    refetch,
  } = useCollectionSlideBySlug(slug);

  // Xử lý dữ liệu sản phẩm
  const products =
    collectionData?.map((product) => ({
      ...product,
      variant: "alternative",
    })) || [];

  // Hàm retry khi có lỗi
  const handleRetry = () => {
    refetch();
  };

  // Hiển thị loading
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>
          <p>Không thể tải danh sách sản phẩm. Vui lòng thử lại.</p>
          <Button onClick={handleRetry}>Thử lại</Button>
        </div>
      </div>
    );
  }

  // Hiển thị khi không có sản phẩm
  if (products.length === 0 && !isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>
          <p>Không có sản phẩm nào được tìm thấy.</p>
          <Button onClick={handleRetry}>Tải lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.Slider3}>
        <h2 className={styles.Maintitle}>SẢN PHẨM HOT</h2>
        <div className={styles.top}>
          <div className={styles.btnList}>
            <Button tabButton>Sản phẩm mới nhất</Button>
            <Button tabButton>Sản phẩm được quan tâm</Button>
            <Button tabButton>Sản phẩm độc đáo</Button>
          </div>
          <Button discoverButton icon={faArrowRight}>
            KHÁM PHÁ NGAY
          </Button>
        </div>
        <div className={styles.middle}>
          <div className={styles.ListCard}>
            <Slider slides={products} type="half-image" wrap={true} />
          </div>
        </div>
        <div className={styles.dotList}>
          <div className={`${styles.dot} ${styles.active}`}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
}

export default SlideHalfImageDefault;
