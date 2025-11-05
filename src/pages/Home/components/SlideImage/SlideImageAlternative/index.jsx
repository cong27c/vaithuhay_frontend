import styles from "./SlideImageAlternative.module.scss";
import Slider from "@/components/Slider";
import Button from "@/components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductsSetup from "@/pages/ProductsSetup";
import DotList from "@/components/DotList/inddex";
import { useState } from "react";
import ProductModal from "@/pages/ProductsSetup/ProductModal";
import { useAllComboDetail, useAllCombos } from "@/Hooks/useCombo";

function SlideImageAlternative() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sử dụng React Query hooks
  const {
    data: combosData,
    isLoading: isLoadingCombos,
    error: combosError,
    refetch: refetchCombos,
  } = useAllCombos();

  const {
    data: comboDetailData,
    isLoading: isLoadingDetail,
    error: detailError,
    refetch: refetchDetail,
  } = useAllComboDetail();

  // Lấy dữ liệu từ response
  const productsSlice = combosData || [];
  const productsDetail = comboDetailData || [];

  // Xử lý loading và error
  const isLoading = isLoadingCombos || isLoadingDetail;
  const error = combosError || detailError;

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

  // Hàm retry khi có lỗi
  const handleRetry = () => {
    refetchCombos();
    refetchDetail();
  };

  // Hiển thị loading
  if (isLoading) {
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
          <p>
            {error.message || "Không thể tải dữ liệu combo. Vui lòng thử lại."}
          </p>
          <Button onClick={handleRetry}>Thử lại</Button>
        </div>
      </div>
    );
  }

  // Hiển thị khi không có dữ liệu
  if (productsSlice.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.error}>
          <p>Không có combo nào được tìm thấy.</p>
          <Button onClick={handleRetry}>Tải lại</Button>
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
