import styles from "./SlideImageAlternative.module.scss";
import Slider from "@/components/Slider";
import Button from "@/components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductsSetup from "@/pages/ProductsSetup";
import DotList from "@/components/DotList/inddex";
import { useEffect, useState } from "react";
import { getAllComboDetail, getAllCombos } from "@/Services/stuffService";
import ProductModal from "@/pages/ProductsSetup/ProductModal";

function SlideImageAlternative() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsSlice, setProductsSlice] = useState([]);
  const [productsDetail, setProductsDetail] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCombos();
  }, []);

  const fetchCombos = async () => {
    setLoading(true);
    setError(null);

    try {
      // Gọi từng API riêng lẻ thay vì Promise.all
      const result1 = await getAllCombos();
      setProductsSlice(result1.combos || []);

      const result2 = await getAllComboDetail();
      setProductsDetail(result2 || []);
    } catch (err) {
      console.error("Failed to fetch combos:", err);
      setError("Không thể tải dữ liệu combo. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm retry khi có lỗi
  const handleRetry = () => {
    fetchCombos();
  };

  const totalGroups = Math.ceil(productsSlice.length / 8);

  const handleGoToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleProductClick = (productIndex) => {
    setSelectedProductIndex(productIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductIndex(null);
  };

  // Hiển thị loading
  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>
          <p>{error}</p>
          <Button onClick={handleRetry}>Thử lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles["Slider-2"]}>
        <div className={styles["slider2-header"]}>
          <h2 className={styles.title}>COMBO GÓC LÀM VIỆC</h2>
          <Button discoverButton icon={faArrowRight}>
            Khám phá ngay
          </Button>
        </div>
        <div className={styles["list-card"]}>
          <ProductsSetup>
            <Slider
              slides={productsSlice}
              type="image"
              wrap={true}
              name="SlideImageAlternative"
              externalIndex={currentIndex}
              onIndexChange={setCurrentIndex}
              onProductClick={handleProductClick}
            />
          </ProductsSetup>
        </div>
        <DotList
          total={totalGroups}
          activeIndex={currentIndex}
          size={12}
          onDotClick={handleGoToSlide}
        />
      </div>

      {isModalOpen && selectedProductIndex !== null && (
        <ProductModal
          currentIndex={selectedProductIndex}
          setCurrentIndex={setSelectedProductIndex}
          onClose={handleCloseModal}
          products={productsDetail}
        />
      )}
    </div>
  );
}

export default SlideImageAlternative;
