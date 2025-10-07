import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./ProductImageGallery.module.scss";
import ModalTrigger from "@/components/ModalTrigger";

const ProductImageGallery = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.mainImage);
  const [fadeClass, setFadeClass] = useState("");

  useEffect(() => {
    setMainImage(product.mainImage);
  }, [product]);

  const mainIndex = product.detailsImage.indexOf(mainImage);

  const visibleImages = [
    ...product.detailsImage.slice(mainIndex),
    ...product.detailsImage.slice(0, mainIndex),
  ].slice(0, 5);

  const handleClick = (img) => {
    if (img !== mainImage) {
      setFadeClass(styles.fadeOut);
      setTimeout(() => {
        setMainImage(img);
        setFadeClass(styles.fadeIn);
      }, 200);
    }
  };

  return (
    <div className={styles.bodyLeft}>
      <div className={styles.listImage}>
        {visibleImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`preview-${index}`}
            onClick={() => handleClick(img)}
            className={img === mainImage ? styles.active : styles.inactive}
          />
        ))}
      </div>
      <div className={styles.mainImage}>
        <img
          src={mainImage}
          alt=""
          className={fadeClass}
          onAnimationEnd={() => setFadeClass("")}
        />
      </div>
      <ModalTrigger
        trigger={
          <div className={styles.endowButton}>Xem giá ưu đãi cho combo</div>
        }
        products={[product]}
      />
      <div className={styles.dotList}>
        {product.detailsImage.map((_, index) => (
          <div
            className={clsx(
              styles.dot,
              product.detailsImage.indexOf(mainImage) === index
                ? styles.isActive
                : "",
            )}
            key={index}
            onClick={() => handleClick(product.detailsImage[index])}
          />
        ))}
      </div>
    </div>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductImageGallery;
