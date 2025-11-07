import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./ProductModal.module.scss";
import { SliderButton } from "@/components/SliderControls";
import ProductImageGallery from "../ProductImageGallery";
import ProductDetailsPanel from "../ProductDetailsPanel";

const ProductModal = ({ selectedComboId, onClose, products }) => {
  const [fadeContentClass, setFadeContentClass] = useState("");
  const [pendingComboId, setPendingComboId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Tìm index hiện tại dựa trên selectedComboId
  const findCurrentIndex = () => {
    return products.findIndex(
      (product) => product.combo_id === selectedComboId,
    );
  };

  const [currentIndex, setCurrentIndex] = useState(findCurrentIndex());

  // Cập nhật currentIndex khi selectedComboId hoặc products thay đổi
  useEffect(() => {
    const newIndex = findCurrentIndex();
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
    }
  }, [selectedComboId, products]);

  const getAdjacentProductIndex = (direction) => {
    if (products.length === 0) return -1;

    let newIndex =
      direction === "next"
        ? (currentIndex + 1) % products.length
        : (currentIndex - 1 + products.length) % products.length;

    return newIndex;
  };

  const handleChangeProduct = (direction) => {
    if (isAnimating) return;

    const newIndex = getAdjacentProductIndex(direction);
    if (newIndex === -1) return;

    const newProduct = products[newIndex];
    if (!newProduct || !newProduct.combo_id) return;

    setFadeContentClass(styles.fadeOutContent);
    setPendingComboId(newProduct.combo_id);
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    if (fadeContentClass === styles.fadeOutContent && pendingComboId !== null) {
      // Tìm index mới dựa trên pendingComboId
      const newIndex = products.findIndex(
        (product) => product.combo_id === pendingComboId,
      );
      if (newIndex !== -1) {
        setCurrentIndex(newIndex);
      }
      setFadeContentClass(styles.fadeInContent);
      setPendingComboId(null);
    } else {
      setFadeContentClass("");
      setIsAnimating(false);
    }
  };

  const currentProduct = currentIndex !== -1 ? products[currentIndex] : null;

  // Nếu không tìm thấy product với combo_id tương ứng, đóng modal
  useEffect(() => {
    if (selectedComboId && currentIndex === -1) {
      console.warn("Product not found with combo_id:", selectedComboId);
      onClose();
    }
  }, [selectedComboId, currentIndex, onClose]);

  // Nếu không có product nào hoặc không tìm thấy, không hiển thị modal
  if (!currentProduct || currentIndex === -1) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={clsx(styles.wrapper)}
        onClick={(e) => e.stopPropagation()}
      >
        <SliderButton
          fontSize="36px"
          direction="left"
          width="100px"
          height="100px"
          position={{
            left: "0%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={() => handleChangeProduct("prev")}
        />

        <div
          className={clsx(styles.contentWrapper, fadeContentClass)}
          onAnimationEnd={handleAnimationEnd}
        >
          <ProductImageGallery product={currentProduct} />
          <ProductDetailsPanel
            currentProduct={currentProduct}
            products={products}
            onClose={onClose}
            onSelectProduct={(comboId) => {
              const index = products.findIndex((p) => p.combo_id === comboId);
              if (index !== -1) {
                setFadeContentClass(styles.fadeOutContent);
                setPendingComboId(comboId);
                setIsAnimating(true);
              }
            }}
          />
        </div>

        <SliderButton
          fontSize="36px"
          direction="right"
          width="100px"
          height="100px"
          position={{
            right: "0%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={() => handleChangeProduct("next")}
        />
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  selectedComboId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductModal;
