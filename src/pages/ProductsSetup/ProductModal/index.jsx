import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./ProductModal.module.scss";
import { SliderButton } from "@/components/SliderControls";
import ProductImageGallery from "../ProductImageGallery";
import ProductDetailsPanel from "../ProductDetailsPanel";

const ProductModal = ({ currentIndex, setCurrentIndex, onClose, products }) => {
  const [fadeContentClass, setFadeContentClass] = useState("");
  const [pendingIndex, setPendingIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChangeProduct = (newIndex) => {
    if (isAnimating) return;
    setFadeContentClass(styles.fadeOutContent);
    setPendingIndex(newIndex);
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    if (fadeContentClass === styles.fadeOutContent && pendingIndex !== null) {
      setCurrentIndex(pendingIndex);
      setFadeContentClass(styles.fadeInContent);
      setPendingIndex(null);
    } else {
      setFadeContentClass("");
      setIsAnimating(false);
    }
  };

  const currentProduct = products[currentIndex];

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
          onClick={() =>
            handleChangeProduct(
              (currentIndex - 1 + products.length) % products.length,
            )
          }
        />

        <div
          className={clsx(styles.contentWrapper, fadeContentClass)}
          onAnimationEnd={handleAnimationEnd}
        >
          <ProductImageGallery product={currentProduct} />
          <ProductDetailsPanel
            currentProduct={currentProduct}
            products={products}
            setCurrentIndex={setCurrentIndex}
            onClose={onClose}
            onSelectProduct={handleChangeProduct}
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
          onClick={() =>
            handleChangeProduct((currentIndex + 1) % products.length)
          }
        />
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductModal;
