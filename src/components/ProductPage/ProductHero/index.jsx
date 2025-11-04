import { useEffect, useRef, useState } from "react";
import styles from "./ProductHero.module.scss";
import Button from "@/components/Button";
import ProductProgress from "../ProductProgress";
import { toast } from "react-toastify";
import { addToCart } from "@/Services/cartService";
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import QuantityBar from "../QuantityBar";
import PreOrderModal from "../PreOrderModal/index";
import RegisterFormModal from "../RegisterFormModal";
import { refreshCart } from "@/features/cart/cartThunks";
import { useDispatch } from "react-redux";

function ProductHero({
  productId = null,
  subImgs = [],
  mainImg,
  preOrder = {},
  isPreOrder = false,
  detail = [],
  attributes = {},
  variants = [],
  isRegistered = false,
  typePreOrder,
}) {
  const allImages = [mainImg, ...subImgs];
  const [mainImage, setMainImage] = useState(mainImg);
  const [priceProduct, setPriceProduct] = useState("");
  const [selectedVariants, setSelectedVariants] = useState({});
  const [filteredAttributes, setFilteredAttributes] = useState(
    attributes || {},
  );
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1); // Thêm state quantity bị thiếu
  const currentUser = useCurrentUser();
  const isLoggedIn = !!currentUser;
  const customerId = currentUser?.customerId;

  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);
  const [isRegisterFormModalOpen, setIsRegisterFormModalOpen] = useState(false);
  const [selectedVariantForModal, setSelectedVariantForModal] = useState(null);
  const [selectedTierData, setSelectedTierData] = useState({
    tierId: null,
    originalPrice: "",
    discountedPrice: "",
    tierName: "",
    discountPercent: "",
  });
  // Pre-order function - Mở modal
  const [variantId, setVariantId] = useState(null);
  const soldQuantity = preOrder?.tiers
    ? preOrder?.tiers.reduce((total, item) => {
        return (total += item.soldQuantity);
      }, 0)
    : null;
  const totalQuantity = preOrder?.tiers
    ? preOrder?.tiers.reduce((total, item) => {
        return (total += Number(item.limitQuantity));
      }, 0)
    : null;

  const handleOpenRegisterForm = (tierData) => {
    setSelectedTierData(tierData);

    setIsRegisterFormModalOpen(true);
  };

  const handlePreOrder = async () => {
    try {
      const keys = Object.keys(attributes || {});
      if (keys.some((k) => !selectedVariants[k])) {
        toast.warn("Vui lòng chọn đầy đủ thuộc tính!");
        return;
      }

      const matched = findMatchedVariantBySelected();
      const variantId = matched?.id || null;
      setVariantId(variantId);
      if (!variantId) {
        toast.warn("Không tìm được biến thể phù hợp để đặt trước.");
        return;
      }

      setSelectedVariantForModal({
        variantId,
        selectedVariants: { ...selectedVariants },
        matchedVariant: matched,
        filteredAttributes: { ...filteredAttributes },
      });
      setIsPreOrderModalOpen(true);
    } catch (err) {
      console.error("Pre-order error:", err);
      toast.error("Đặt trước thất bại!");
    }
  };

  // --- Init: set filteredAttributes = attributes and auto-select first value of each attribute
  useEffect(() => {
    if (!attributes || Object.keys(attributes).length === 0) return;
    setFilteredAttributes(attributes);

    const initSelected = {};
    Object.entries(attributes).forEach(([key, items]) => {
      if (items && items.length) initSelected[key] = items[0].variantId;
    });
    setSelectedVariants(initSelected);
  }, [attributes]);

  // Helper to find matched variant by selectedVariants
  const findMatchedVariantBySelected = (selVariants = selectedVariants) => {
    if (!attributes || !variants || Object.keys(attributes).length === 0)
      return null;
    const keys = Object.keys(attributes);
    if (keys.some((k) => !selVariants[k])) return null;
    const selectedValues = keys?.map(
      (k) =>
        attributes[k].find((i) => i.variantId === selVariants[k])?.variantValue,
    );
    if (selectedValues.some((v) => !v)) return null;
    return variants.find((v) =>
      selectedValues.every((val) => v.attributes.includes(val)),
    );
  };

  // When selectedVariants is complete, update price & image from matched variant
  useEffect(() => {
    const matched = findMatchedVariantBySelected();
    if (matched) {
      if (matched.image) setMainImage(matched.image);
      if (matched.price) setPriceProduct(matched.price);
    } else {
      if (detail?.price) setPriceProduct(detail.price);
    }
  }, [selectedVariants, variants, attributes, detail]);

  // When user selects a variant value
  const handleVariantSelect = (variantType, item) => {
    const attrKeys = Object.keys(attributes || {});
    if (attrKeys.length === 0) return;
    const mainAttrKey = attrKeys[0];

    if (variantType === mainAttrKey) {
      const selectedMainValue = attributes[mainAttrKey].find(
        (i) => i.variantId === item.variantId,
      )?.variantValue;

      const validVariants = variants.filter((v) =>
        v.attributes.includes(selectedMainValue),
      );

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

      const newSelected = { [mainAttrKey]: item.variantId };
      for (const key of attrKeys.slice(1)) {
        newSelected[key] = newFiltered[key]?.[0]?.variantId || undefined;
      }

      setFilteredAttributes(newFiltered);
      setSelectedVariants(newSelected);

      const selectedValues = attrKeys?.map(
        (k) =>
          attributes[k].find((i) => i.variantId === newSelected[k])
            ?.variantValue,
      );
      const matchedVariant = validVariants.find((v) =>
        selectedValues.every((val) => val && v.attributes.includes(val)),
      );

      if (matchedVariant) {
        if (matchedVariant.image) setMainImage(matchedVariant.image);
        if (matchedVariant.price) setPriceProduct(matchedVariant.price);
      } else {
        if (item.imageVariant) setMainImage(item.imageVariant);
        if (item.priceVariant) setPriceProduct(item.priceVariant);
      }

      return;
    }

    if (
      !filteredAttributes[variantType] ||
      !filteredAttributes[variantType].some(
        (i) => i.variantId === item.variantId,
      )
    ) {
      return;
    }

    setSelectedVariants((prev) => {
      const next = { ...prev, [variantType]: item.variantId };

      const keys = Object.keys(attributes || {});
      if (!keys.some((k) => !next[k])) {
        const selVals = keys?.map(
          (k) =>
            attributes[k].find((i) => i.variantId === next[k])?.variantValue,
        );
        const matched = variants.find((v) =>
          selVals.every((val) => val && v.attributes.includes(val)),
        );
        if (matched) {
          if (matched.image) setMainImage(matched.image);
          if (matched.price) setPriceProduct(matched.price);
        }
      }

      return next;
    });
  };

  // addToCart: find matched variantId (if any) and send it
  const handleAddToCart = async () => {
    try {
      const keys = Object.keys(attributes || {});
      if (keys.some((k) => !selectedVariants[k])) {
        toast.warn("Vui lòng chọn đầy đủ thuộc tính!");
        return;
      }

      const matched = findMatchedVariantBySelected();
      const variantId = matched?.id || null;

      const res = await addToCart(
        { productId, variantId, quantity },
        isLoggedIn,
      );

      toast.success("Đã thêm vào giỏ hàng!");
      dispatch(refreshCart());
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Thêm vào giỏ thất bại!");
    }
  };

  // --- rest UI code (images, quantity, etc.)
  useEffect(() => {
    if (detail?.price) setPriceProduct((prev) => prev || detail.price);
  }, [detail]);

  const mainIndex = allImages.indexOf(mainImage);
  const visibleImages = [
    ...allImages.slice(mainIndex),
    ...allImages.slice(0, mainIndex),
  ].slice(0, 5);

  const [fadeClass, setFadeClass] = useState("");
  const handleClick = (img) => {
    if (img !== mainImage) {
      setFadeClass(styles.fadeOut);
      setTimeout(() => {
        setMainImage(img);
        setFadeClass(styles.fadeIn);
      }, 200);
    }
  };

  function getDiscountPercent(price, discountPrice) {
    const toNumber = (val) =>
      typeof val === "string"
        ? parseInt(val.replace(/[^\d]/g, ""), 10)
        : val || 0;
    const original = toNumber(price);
    const discounted = toNumber(discountPrice);
    if (!original || original <= 0 || !discounted) return 0;
    return Math.floor(((original - discounted) / original) * 100);
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const descRef = useRef(null);
  const [height, setHeight] = useState("60px");
  useEffect(() => {
    if (descRef.current)
      setHeight(isExpanded ? `${descRef.current.scrollHeight}px` : "60px");
  }, [isExpanded]);

  // THAY THẾ ĐIỀU KIỆN isOpen bằng kiểm tra dữ liệu sản phẩm
  if (!productId || !detail) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerSection}>
        <nav className={styles.breadcrumb}>
          <a href="/">Trang chủ</a>
          <span>/</span>
          <a href="/danh-muc">Danh mục</a>
          <span>/</span>
          <span className={styles.current}>HÀNG CLEARANCE | NO RESTOCK</span>
        </nav>
      </div>

      <div className={styles.bodySection}>
        <div className={styles.bodyLeft}>
          <div className={styles.mainImage}>
            <img
              src={mainImage}
              alt=""
              className={fadeClass}
              onAnimationEnd={() => setFadeClass("")}
            />
          </div>
          <div className={styles.listImage}>
            {visibleImages?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`preview-${i}`}
                onClick={() => handleClick(img)}
                className={img === mainImage ? styles.active : styles.inactive}
              />
            ))}
          </div>
        </div>

        <div className={styles.bodyRight}>
          <div className={styles.title}>{detail?.name}</div>

          <div className={styles.priceList}>
            <div className={styles.discountPrice}>{priceProduct}</div>
            {detail?.discountedPrice && (
              <div className={styles.discount}>
                <div className={styles.price}>{detail?.price}</div>
                <div className={styles.discountPercent}>
                  -{getDiscountPercent(priceProduct, detail?.discountedPrice)}%
                </div>
              </div>
            )}
          </div>

          {/* PRE-ORDER INFO SECTION */}
          {isPreOrder && preOrder && (
            <QuantityBar
              totalSoldQuantity={soldQuantity}
              totalLimitQuantity={totalQuantity}
            />
          )}

          <div className={styles.brandIn4}>
            <div className={styles.line}></div>
            <div
              ref={descRef}
              className={`${styles.desc} ${isExpanded ? styles.expanded : styles.collapsed}`}
              style={{ maxHeight: height }}
            >
              <p>
                Thương hiệu: <strong>{detail?.origin}</strong>
              </p>
              <p>{detail?.longDescription}</p>
            </div>
            <button
              className={styles.toggleButton}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "▲" : "▼"}
            </button>
          </div>

          {/* RENDER ATTRIBUTES */}
          <div className={styles.titleBtn}>
            {Object.entries(filteredAttributes || {})?.map(
              ([variantType, items]) => (
                <div key={variantType} className={styles.titleBtn}>
                  <div className={styles.title}>{variantType}</div>
                  <div className={styles.listBtn}>
                    {items?.map((item, idx) => {
                      const isSelected =
                        selectedVariants[variantType] === item.variantId;
                      return (
                        <button
                          key={idx}
                          className={`${styles.tabButton} ${isSelected ? styles.active : ""}`}
                          onClick={() => handleVariantSelect(variantType, item)}
                        >
                          {item.variantValue}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className={styles.productActions}>
            {typePreOrder === "upcoming" ? (
              // TRƯỜNG HỢP UPCOMING
              <div>
                {isRegistered ? (
                  <button className={styles.preOrderBtnSuccess}>
                    ĐĂNG KÝ ĐẶT TRƯỚC THÀNH CÔNG
                  </button>
                ) : (
                  <button
                    className={styles.preOrderBtn}
                    onClick={handlePreOrder}
                  >
                    Đăng ký Đặt trước | PRE-ORDER
                  </button>
                )}
              </div>
            ) : typePreOrder === "open" ? (
              // TRƯỜNG HỢP OPEN - HIỆN NÚT PRE-ORDER
              <button className={styles.preOrderBtn} onClick={handlePreOrder}>
                Đặt trước | PRE-ORDER
              </button>
            ) : (
              // TRƯỜNG HỢP UNDEFINED/FALSY - HIỆN BỘ ĐIỀU KHIỂN SỐ LƯỢNG
              <>
                <div className={styles.quantityControl}>
                  <button
                    className={styles["quantity-btn"]}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 0}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className={styles.quantityInput}
                    value={quantity}
                    min="1"
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                  />
                  <button
                    className={styles["quantity-btn"]}
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className={styles.cartIcon} onClick={handleAddToCart}>
                  <img
                    src="https://theme.hstatic.net/1000069970/1001119059/14/cro_addcart_img.png?v=7221"
                    alt=""
                  />
                </div>
                <div className={styles.button}>
                  <Button tabButton onClick={handleAddToCart}>
                    Đặt hàng ngay
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ProductProgress />

      {/* PRE-ORDER MODAL */}
      <PreOrderModal
        isOpen={isPreOrderModalOpen}
        onClose={() => setIsPreOrderModalOpen(false)}
        onOrderButtonClick={handleOpenRegisterForm}
        productId={productId}
        productName={detail?.name}
        mainImage={mainImage}
        attributes={attributes}
        filteredAttributes={filteredAttributes}
        selectedVariants={selectedVariants}
        onVariantSelect={handleVariantSelect}
        variantData={selectedVariantForModal}
        preOrderInfo={preOrder}
        variants={variants}
        typePreOrder={typePreOrder}
      />

      <RegisterFormModal
        isOpen={isRegisterFormModalOpen}
        onClose={() => setIsRegisterFormModalOpen(false)}
        productId={productId}
        tierId={selectedTierData.tierId}
        originalPrice={selectedTierData.originalPrice}
        discountedPrice={selectedTierData.discountedPrice}
        tierName={selectedTierData.tierName}
        discountPercent={selectedTierData.discountPercent}
        variantId={variantId}
      />
    </div>
  );
}

export default ProductHero;
