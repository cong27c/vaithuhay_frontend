import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./ProductImageGallery.module.scss";
import ComboModal from "../ComboModal";
import { getComboProducts } from "@/Services/stuffService";

const ProductImageGallery = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.mainImage || "");
  const [fadeClass, setFadeClass] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProductModal, setShowProductModal] = useState(null);
  const [showComboModal, setShowComboModal] = useState(false);
  const [comboData, setComboData] = useState(null);
  const [loadingCombo, setLoadingCombo] = useState(false);
  // Lấy danh sách ảnh - ưu tiên mainImage đầu tiên
  const sliderImages = [product.mainImage, ...(product.subImage || [])].filter(
    Boolean,
  );

  useEffect(() => {
    if (product.mainImage) {
      setMainImage(product.mainImage);
      const index = sliderImages.indexOf(product.mainImage);
      setCurrentIndex(index >= 0 ? index : 0);
    }
  }, [product.mainImage, product.subImage]);

  // Xử lý sự kiện phím Esc để đóng modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        setShowComboModal(false);
        setShowProductModal(null);
      }
    };

    if (showComboModal || showProductModal) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [showComboModal, showProductModal]);

  // Hàm xử lý mở modal combo
  const handleOpenComboModal = async () => {
    if (!product.combo_id) {
      console.error("No combo_id found in product");
      return;
    }

    setLoadingCombo(true);
    try {
      const response = await getComboProducts(product.combo_id);
      setComboData(response.data);
      setShowComboModal(true);
    } catch (error) {
      console.error("Error fetching combo products:", error);
    } finally {
      setLoadingCombo(false);
    }
  };

  // Chuyển đổi dữ liệu combo để phù hợp với ComboModal
  const transformComboData = (comboData) => {
    if (!comboData || !comboData.products) return [];
    return comboData.products?.map((product) => ({
      id: product.product_id || Math.random().toString(),
      name: product.name,
      finalPrice: parseFloat(product?.final_price.replace(/[^\d]/g, "")) || 0,
      originalPrice:
        parseFloat(product?.original_price.replace(/[^\d]/g, "")) || 0,
      image: product.main_image || "/placeholder.svg",
      quantity: product.quantity || 1,
    }));
  };

  const getVisibleImages = () => {
    if (sliderImages.length <= 5) {
      return sliderImages;
    }
    const visible = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % sliderImages.length;
      visible.push(sliderImages[index]);
    }
    return visible;
  };

  const visibleImages = getVisibleImages();

  const handleClick = (img, index) => {
    if (img !== mainImage) {
      setFadeClass(styles.fadeOut);
      setTimeout(() => {
        setMainImage(img);
        const actualIndex = sliderImages.indexOf(img);
        setCurrentIndex(actualIndex >= 0 ? actualIndex : 0);
        setFadeClass(styles.fadeIn);
      }, 200);
    }
  };

  const handleDotClick = (index) => {
    if (sliderImages[index] !== mainImage) {
      handleClick(sliderImages[index], index);
    }
  };

  // Format price
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString("vi-VN") + "đ";
  };

  // Xử lý đóng modal khi click bên ngoài
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowComboModal(false);
      setShowProductModal(null);
    }
  };

  // Xử lý thêm vào giỏ hàng combo
  const handleAddComboToCart = () => {
    if (!comboData) return;

    const comboProducts = transformComboData(comboData);

    // Thêm logic xử lý thêm vào giỏ hàng ở đây
    setShowComboModal(false);
  };

  if (sliderImages.length === 0) {
    return null;
  }

  return (
    <div className={styles.bodyLeft}>
      {/* Danh sách ảnh nhỏ bên trái */}
      {sliderImages.length > 1 && (
        <div className={styles.listImage}>
          {visibleImages?.map((img, index) => (
            <img
              key={`${img}-${index}`}
              src={img}
              alt={`preview-${index}`}
              onClick={() => {
                const actualIndex = sliderImages.indexOf(img);
                handleClick(img, actualIndex);
              }}
              className={img === mainImage ? styles.active : styles.inactive}
            />
          ))}
        </div>
      )}

      {/* Ảnh chính với các nút sản phẩm */}
      <div className={styles.mainImage}>
        <img
          src={mainImage}
          alt="Main product"
          className={fadeClass}
          onAnimationEnd={() => setFadeClass("")}
        />

        {/* Các nút sản phẩm trên ảnh chính */}
      </div>

      {/* Nút xem giá ưu đãi - chỉ hiển thị nếu có combo_id */}
      {product.combo_id && (
        <div
          className={clsx(styles.endowButton, {
            [styles.loading]: loadingCombo,
          })}
          onClick={handleOpenComboModal}
          disabled={loadingCombo}
        >
          {loadingCombo ? "Đang tải..." : "Xem giá ưu đãi cho combo"}
        </div>
      )}
      {showComboModal && comboData && (
        <ComboModal
          products={transformComboData(comboData)}
          onAddToCart={handleAddComboToCart}
          comboName={comboData.combo_name}
          onClose={() => setShowComboModal(false)}
          comboId={comboData?.combo_id}
          discountCombo={product?.discountCombo ? product.discountCombo : 0}
        />
      )}

      {/* Dot indicator */}
      {sliderImages.length > 1 && (
        <div className={styles.dotList}>
          {sliderImages?.map((img, index) => (
            <div
              className={clsx(
                styles.dot,
                mainImage === img ? styles.isActive : "",
              )}
              key={index}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.shape({
    mainImage: PropTypes.string,
    subImage: PropTypes.arrayOf(PropTypes.string),
    btnLink: PropTypes.arrayOf(
      PropTypes.shape({
        top_position: PropTypes.string,
        left_position: PropTypes.string,
        link_url: PropTypes.string,
        priceBtn: PropTypes.string,
        imageBtn: PropTypes.string,
        nameBtn: PropTypes.string,
      }),
    ),
    combo_id: PropTypes.number,
  }).isRequired,
};

export default ProductImageGallery;
