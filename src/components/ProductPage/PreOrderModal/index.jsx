"use client";

import { useState, useEffect } from "react";
import { X, Clock, Zap } from "lucide-react";
import styles from "./PreOrderModal.module.scss";
import { toast } from "react-toastify";
import { addPreorderOpenItem } from "@/Services/preOrderService";

const PreOrderModal = ({
  isOpen,
  onClose,
  productId,
  productName,
  mainImage,
  attributes,
  filteredAttributes,
  selectedVariants,
  onVariantSelect,
  variantData,
  preOrderInfo,
  variants,
  onOrderButtonClick,
  typePreOrder, // "upcoming" hoặc "open"
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [currentTierIndex, setCurrentTierIndex] = useState(0);

  // Hàm xử lý cho typePreOrder = "upcoming" (giữ nguyên logic cũ)
  const handleOrderButtonClick = () => {
    const currentTierInfo = getCurrentTier();
    console.log("currentTierInfo", currentTierInfo);
    const currentTier = currentTierInfo?.tier || null;
    const variantPrice = getCurrentVariantPrice();
    console.log("currentTierInfo", currentTierInfo);

    if (!currentTier) {
      toast.error("Không tìm thấy thông tin gói đặt trước!");
      return;
    }

    const originalPrice = formatPrice(variantPrice);
    const discountedPrice = calculatePreorderPrice(
      variantPrice,
      currentTier.discountPercent,
    );

    const tierData = {
      tierId: currentTier.id,
      originalPrice: originalPrice,
      discountedPrice: discountedPrice,
      discountPercent: currentTier.discountPercent,
      tierName: currentTier.name,
      variantInfo: getCurrentVariantInfo(),
    };

    onClose();

    if (onOrderButtonClick) {
      onOrderButtonClick(tierData);
    }
  };

  // Hàm xử lý cho typePreOrder = "open" - thêm vào cart
  const handleAddPreorderOpenItem = async () => {
    try {
      const currentTierInfo = getCurrentTier();
      const currentTier = currentTierInfo?.tier || null;

      if (!currentTier) {
        toast.error("Không tìm thấy thông tin gói đặt trước!");
        return;
      }

      // Lấy variantId từ selectedVariants
      const variantId = getCurrentVariantId();

      // Chuẩn bị data để gọi API
      const requestData = {
        productId: productId,
        tierId: currentTier.id,
        variantId: variantId,
        quantity: quantity,
      };

      console.log("Calling API with data:", requestData);

      // Gọi API service
      const response = await addPreorderOpenItem(requestData);
      console.log("response", response);

      if (response.success) {
        toast.success("Đã thêm sản phẩm pre-order vào giỏ hàng!");
        onClose(); // Đóng modal sau khi thành công
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi thêm vào giỏ hàng");
      }
    } catch (error) {
      console.error("Error adding preorder item:", error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng",
      );
    }
  };

  // Service function để gọi API (bạn cần import hoặc định nghĩa)
  const preOderRegister = async (data) => {
    try {
      const response = await httpRequest.post("/preorder/add-to-cart", data); // Đổi endpoint cho phù hợp
      return response.data;
    } catch (error) {
      console.error("Error adding preorder to cart:", error);
      throw error;
    }
  };

  // Hàm lấy variantId từ selectedVariants
  const getCurrentVariantId = () => {
    if (!selectedVariants || Object.keys(selectedVariants).length === 0)
      return null;

    // Tìm variant khớp với selectedVariants
    const matchedVariant = findMatchedVariantBySelected();
    return matchedVariant?.id || null;
  };

  // Các hàm hỗ trợ giữ nguyên
  const calculatePreorderPrice = (originalPrice, discountPercent) => {
    if (!originalPrice || !discountPercent) return originalPrice;
    const priceNumber = parseInt(originalPrice.replace(/[^\d]/g, ""), 10);
    const discountAmount = (priceNumber * discountPercent) / 100;
    const finalPrice = priceNumber - discountAmount;
    return `${finalPrice.toLocaleString("vi-VN")} đ`;
  };

  const formatPrice = (priceString) => {
    if (!priceString) return "";
    return priceString.replace(" d", " đ");
  };

  const findMatchedVariantBySelected = () => {
    if (!attributes || !variants || Object.keys(attributes).length === 0)
      return null;

    const keys = Object.keys(attributes);
    if (keys.some((k) => !selectedVariants[k])) return null;

    const selectedValues = keys?.map((k) => {
      const selectedItem = attributes[k].find(
        (item) => item.variantId === selectedVariants[k],
      );
      return selectedItem?.variantValue;
    });

    if (selectedValues.some((v) => !v)) return null;

    return variants.find((v) =>
      selectedValues.every((val) => val && v.attributes.includes(val)),
    );
  };

  const getCurrentVariantPrice = () => {
    const matchedVariant = findMatchedVariantBySelected();

    if (matchedVariant && matchedVariant.price) {
      return matchedVariant.price;
    }

    if (preOrderInfo?.tiers && preOrderInfo.tiers.length > 0) {
      const retailTier =
        preOrderInfo.tiers.find((tier) => tier.type === "retail") ||
        preOrderInfo.tiers[preOrderInfo.tiers.length - 1];
      return retailTier?.price || "1.600.000 d";
    }

    return "1.600.000 d";
  };

  const getCurrentTier = () => {
    if (!preOrderInfo?.tiers || preOrderInfo.tiers.length === 0) return null;

    let cumulativeSold = 0;
    for (let i = 0; i < preOrderInfo.tiers.length; i++) {
      const tier = preOrderInfo.tiers[i];
      cumulativeSold += tier.soldQuantity || 0;

      if (cumulativeSold < (tier.limitQuantity || 0)) {
        return { tier, index: i };
      }
    }

    const lastTier = preOrderInfo.tiers[preOrderInfo.tiers.length - 1];
    return { tier: lastTier, index: preOrderInfo.tiers.length - 1 };
  };

  useEffect(() => {
    if (preOrderInfo?.tiers) {
      const currentTierInfo = getCurrentTier();
      if (currentTierInfo && currentTierInfo.index !== currentTierIndex) {
        setCurrentTierIndex(currentTierInfo.index);
      }
    }
  }, [preOrderInfo, currentTierIndex]);

  const handleVariantSelectInModal = (variantType, item) => {
    console.log("Selected variant in modal:", variantType, item);
    if (onVariantSelect) {
      onVariantSelect(variantType, item);
    }
  };

  const getSelectedVariantName = (variantType) => {
    const selectedId = selectedVariants[variantType];
    if (!selectedId || !filteredAttributes || !filteredAttributes[variantType])
      return "";

    const selectedItem = filteredAttributes[variantType].find(
      (item) => item.variantId === selectedId,
    );
    return selectedItem ? selectedItem.variantValue : "Chưa chọn";
  };

  const getCurrentVariantInfo = () => {
    if (!filteredAttributes || Object.keys(selectedVariants).length === 0)
      return null;

    const selectedValues = Object.entries(selectedVariants)?.map(
      ([type, id]) => {
        const items = filteredAttributes[type];
        return items?.find((item) => item.variantId === id)?.variantValue;
      },
    );

    return selectedValues.filter(Boolean).join(" / ");
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, value);
    setQuantity(newQuantity);
  };

  const currentTierInfo = getCurrentTier();
  const currentTier = currentTierInfo?.tier || null;
  const variantPrice = getCurrentVariantPrice();

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className={styles.carouselSection}>
          <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
              {preOrderInfo?.tiers?.map((tier, index) => (
                <div
                  key={tier.id}
                  className={`${styles.carouselItem} ${
                    index === currentTierIndex ? styles.active : ""
                  }`}
                >
                  <div
                    className={`${styles.productCard} ${
                      index === currentTierIndex ? styles.featured : ""
                    }`}
                  >
                    <div className={styles.imageContainer}>
                      <img
                        src={mainImage || "/placeholder.svg"}
                        alt={productName}
                      />
                      {index === currentTierIndex && (
                        <div className={`${styles.badge} ${styles.badgeRed}`}>
                          <Zap size={14} />
                          <span>Hot</span>
                        </div>
                      )}
                    </div>

                    <div
                      className={`${styles.cardContent} ${
                        index === currentTierIndex
                          ? styles.highlightContent
                          : ""
                      }`}
                    >
                      <div className={styles.nameSection}>
                        <h3 className={styles.productName}>{tier.name}</h3>
                        <p className={styles.productSubtitle}>
                          {tier.type === "super early bird" &&
                            "Ưu đãi đặc biệt"}
                          {tier.type === "early_bird" && "Ưu đãi sớm"}
                          {tier.type === "pre_order" && "Đặt trước"}
                          {tier.type === "retail" && "Giá niêm yết"}
                        </p>
                      </div>

                      <div className={styles.priceSection}>
                        <div className={styles.priceRow}>
                          <span className={styles.label}>Giá niêm yết:</span>
                          <span className={styles.fixedPrice}>
                            {formatPrice(variantPrice)}
                          </span>
                        </div>

                        <div className={styles.priceRow}>
                          <span className={styles.label}>
                            Giá {tier.name.toLowerCase()}:
                          </span>
                          <span className={styles.preorderPrice}>
                            {calculatePreorderPrice(
                              variantPrice,
                              tier.discountPercent,
                            )}
                          </span>
                        </div>
                      </div>

                      <div className={styles.quantityInfo}>
                        <div className={styles.quantityHeader}>
                          <Clock size={14} />
                          <span>
                            {tier.soldQuantity || 0}/{tier.limitQuantity} đã đặt
                          </span>
                        </div>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progress}
                            style={{
                              width: `${Math.min(((tier.soldQuantity || 0) / tier.limitQuantity) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                        <p className={styles.remaining}>
                          {Math.max(
                            tier.limitQuantity - (tier.soldQuantity || 0),
                            0,
                          )}{" "}
                          sản phẩm còn lại
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <div className={styles.productImageContainer}>
            <img
              src={mainImage || "/placeholder.svg"}
              alt={productName}
              className={styles.productImage}
            />
          </div>

          <div className={styles.optionsContainer}>
            <h2 className={styles.productTitle}>{productName}</h2>

            {/* Hiển thị thông tin variant đã chọn */}
            {getCurrentVariantInfo() && (
              <div className={styles.currentVariantInfo}>
                <strong>Phiên bản: </strong>
                {getCurrentVariantInfo()}
              </div>
            )}

            <h3 className={styles.optionsTitle}>Tùy chọn sản phẩm</h3>

            <div className={styles.optionsSection}>
              {/* Hiển thị các variant type */}
              {filteredAttributes &&
                Object.entries(filteredAttributes)?.map(
                  ([variantType, items]) => (
                    <div key={variantType} className={styles.selectGroup}>
                      <label
                        htmlFor={`${variantType}-select`}
                        className={styles.selectLabel}
                      >
                        {variantType}
                      </label>
                      <select
                        id={`${variantType}-select`}
                        value={selectedVariants[variantType] || ""}
                        onChange={(e) => {
                          const selectedItem = items.find(
                            (item) => item.variantId == e.target.value,
                          );
                          if (selectedItem) {
                            handleVariantSelectInModal(
                              variantType,
                              selectedItem,
                            );
                          }
                        }}
                        className={styles.select}
                      >
                        {items?.map((item, idx) => (
                          <option key={idx} value={item.variantId}>
                            {item.variantValue}
                          </option>
                        ))}
                      </select>

                      {/* Hiển thị giá trị đã chọn */}
                      <div className={styles.selectedVariantDisplay}>
                        Đã chọn:{" "}
                        <strong>{getSelectedVariantName(variantType)}</strong>
                      </div>
                    </div>
                  ),
                )}

              {/* Tier Info Display */}
              {currentTier && (
                <div className={styles.tierInfo}>
                  <h4 className={styles.tierTitle}>
                    Gói đang áp dụng: {currentTier.name}
                  </h4>
                  <div className={styles.tierDetails}>
                    <p>
                      Giá:{" "}
                      {calculatePreorderPrice(
                        variantPrice,
                        currentTier?.discountPercent,
                      )}
                    </p>
                    <p>Giảm: {currentTier.discountPercent}%</p>
                    <p>
                      Đã bán: {currentTier.soldQuantity || 0}/
                      {currentTier.limitQuantity}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Hiển thị tổng quan các variant đã chọn */}
            {filteredAttributes && Object.keys(selectedVariants).length > 0 && (
              <div className={styles.selectedVariantsSummary}>
                <h4 className={styles.summaryTitle}>Thông số đã chọn:</h4>
                {Object.keys(filteredAttributes)?.map((variantType) => (
                  <div key={variantType} className={styles.variantSummaryItem}>
                    <span className={styles.variantType}>{variantType}</span>
                    <strong className={styles.variantValue}>
                      {getSelectedVariantName(variantType)}
                    </strong>
                  </div>
                ))}
              </div>
            )}

            {/* Action Section - PHÂN NHÁNH THEO typePreOrder */}
            <div className={styles.actionSection}>
              <div className={styles.quantitySection}>
                <label htmlFor="quantity" className={styles.quantityLabel}>
                  Số lượng
                </label>
                <div className={styles.quantitySelector}>
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    aria-label="Decrease quantity"
                    className={styles.quantityButton}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    readOnly
                    className={styles.quantityInput}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    aria-label="Increase quantity"
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Luồng 1: typePreOrder = "upcoming" */}
              {typePreOrder === "upcoming" && (
                <button
                  className={styles.orderButton}
                  onClick={handleOrderButtonClick}
                >
                  Đăng ký đặt trước ngay{" "}
                  {currentTier?.discountPercent
                    ? `- ${currentTier?.discountPercent}%`
                    : ""}
                </button>
              )}

              {/* Luồng 2: typePreOrder = "open" */}
              {typePreOrder === "open" && (
                <button
                  className={styles.orderButton}
                  onClick={handleAddPreorderOpenItem}
                >
                  Đặt trước ngay{" "}
                  {currentTier?.discountPercent
                    ? `- ${currentTier?.discountPercent}%`
                    : ""}
                </button>
              )}
            </div>

            {/* Info Box */}
            <div className={styles.infoBox}>
              <div className={styles.infoIcon}>ℹ</div>
              <div className={styles.infoContent}>
                <p className={styles.infoTitle}>Thanh toán trước 10%</p>
                <p className={styles.infoText}>
                  Chiến dịch Pre-order cần thanh toán trước 10% để xác nhận đơn
                  hàng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrderModal;
