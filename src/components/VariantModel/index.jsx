"use client";

import { useState, useEffect } from "react";
import styles from "./VariantModel.module.scss";

export default function VariantModel({
  isOpen,
  onClose,
  product,
  variants = [], // array of variant objects
  attributes = {}, // object: { "Kiểu dáng": [...], "Màu sắc": [...] }
  onUpdate,
  isLoading = false,
}) {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [filteredAttributes, setFilteredAttributes] = useState(
    attributes || {},
  );
  const [currentPrice, setCurrentPrice] = useState(product?.price || "");
  const [currentImage, setCurrentImage] = useState(product?.image || "");

  // Initialize selected variants and filtered attributes
  useEffect(() => {
    if (!attributes || Object.keys(attributes).length === 0) return;

    setFilteredAttributes(attributes);

    // Auto-select first value for each attribute
    const initSelected = {};
    Object.entries(attributes).forEach(([key, items]) => {
      if (items && items.length) initSelected[key] = items[0].variantId;
    });
    setSelectedVariants(initSelected);
  }, [attributes, isOpen]); // Reset when modal opens or attributes change

  // Helper to find matched variant by selected variants
  const findMatchedVariantBySelected = (selVariants = selectedVariants) => {
    if (!attributes || !variants || Object.keys(attributes).length === 0)
      return null;

    const keys = Object.keys(attributes);
    // Require selected for all keys
    if (keys.some((k) => !selVariants[k])) return null;

    const selectedValues = keys.map(
      (k) =>
        attributes[k].find((i) => i.variantId === selVariants[k])?.variantValue,
    );
    if (selectedValues.some((v) => !v)) return null;

    return variants.find((v) =>
      selectedValues.every((val) => v.attributes.includes(val)),
    );
  };

  // Update price and image when selected variants change
  useEffect(() => {
    const matched = findMatchedVariantBySelected();
    if (matched) {
      if (matched.image) setCurrentImage(matched.image);
      if (matched.price) setCurrentPrice(matched.price);
    } else {
      // Fallback to product price and image
      if (product?.price) setCurrentPrice(product.price);
      if (product?.image) setCurrentImage(product.image);
    }
  }, [selectedVariants, variants, attributes, product]);

  // Handle variant selection with dependency logic
  const handleVariantSelect = (variantType, item) => {
    const attrKeys = Object.keys(attributes || {});
    if (attrKeys.length === 0) return;

    const mainAttrKey = attrKeys[0];

    // If user clicks the main attribute -> rebuild filteredAttributes for dependent attributes
    if (variantType === mainAttrKey) {
      // 1) Determine selected main value
      const selectedMainValue = attributes[mainAttrKey].find(
        (i) => i.variantId === item.variantId,
      )?.variantValue;

      // 2) Filter variants that contain this main value
      const validVariants = variants.filter((v) =>
        v.attributes.includes(selectedMainValue),
      );

      // 3) Build new filtered attributes
      const newFiltered = { [mainAttrKey]: attributes[mainAttrKey] };
      for (const v of validVariants) {
        for (const val of v.attributes) {
          for (const key of attrKeys.slice(1)) {
            const found = attributes[key]?.find((a) => a.variantValue === val);
            if (found) {
              newFiltered[key] = newFiltered[key] || [];
              if (
                !newFiltered[key].some(
                  (x) => x.variantValue === found.variantValue,
                )
              ) {
                newFiltered[key].push(found);
              }
            }
          }
        }
      }

      // 4) Set new selected variants
      const newSelected = { [mainAttrKey]: item.variantId };
      for (const key of attrKeys.slice(1)) {
        newSelected[key] = newFiltered[key]?.[0]?.variantId || undefined;
      }

      setFilteredAttributes(newFiltered);
      setSelectedVariants(newSelected);
      return;
    }

    // If user selects a dependent attribute
    if (
      !filteredAttributes[variantType] ||
      !filteredAttributes[variantType].some(
        (i) => i.variantId === item.variantId,
      )
    ) {
      // Clicked value not in filtered list (ignore)
      return;
    }

    setSelectedVariants((prev) => ({
      ...prev,
      [variantType]: item.variantId,
    }));
  };

  // Check if a variant option is available in current filtered attributes
  const isOptionAvailable = (variantType, variantId) => {
    return filteredAttributes[variantType]?.some(
      (item) => item.variantId === variantId,
    );
  };

  const handleUpdate = () => {
    // Find the complete matched variant
    const matchedVariant = findMatchedVariantBySelected();

    onUpdate({
      selectedVariants,
      matchedVariant,
      price: currentPrice,
      image: currentImage,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.modelContainer}>
          <div className={styles.modalBody}>
            {/* Product Image */}
            <div className={styles.productImage}>
              <img
                src={currentImage || product?.image || "/placeholder.svg"}
                alt={product?.name || "Product"}
              />
            </div>

            {/* Product Info and Variants */}
            <div className={styles.productInfo}>
              <h2 className={styles.productName}>
                {product?.name || "Product Name"}
              </h2>
              <p className={styles.productPrice}>
                {currentPrice || product?.price || "Price not available"}
              </p>

              {/* Variant Sections */}
            </div>
          </div>
          {Object.entries(filteredAttributes || {}).map(
            ([variantType, items]) => (
              <div key={variantType} className={styles.variantSection}>
                <h3 className={styles.variantLabel}>{variantType}</h3>
                <div className={styles.variantOptions}>
                  {items.map((item, idx) => {
                    const isSelected =
                      selectedVariants[variantType] === item.variantId;
                    const isAvailable = isOptionAvailable(
                      variantType,
                      item.variantId,
                    );

                    return (
                      <button
                        key={idx}
                        className={`${styles.tabButton} ${isSelected ? styles.active : ""} ${
                          !isAvailable ? styles.disabled : ""
                        }`}
                        onClick={() =>
                          isAvailable && handleVariantSelect(variantType, item)
                        }
                        disabled={!isAvailable}
                      >
                        {item.variantValue}
                      </button>
                    );
                  })}
                </div>
              </div>
            ),
          )}
          <button className={styles.updateButton} onClick={handleUpdate}>
            {isLoading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}
