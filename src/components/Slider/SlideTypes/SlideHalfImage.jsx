import { Link } from "react-router-dom";
import styles from "./SlideHalfImage.module.scss";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { addToCart } from "@/Services/cartService";
import { refreshCart } from "@/features/cart/cartThunks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function SlideHalfImage({
  productId,
  image = "",
  name = "",
  desc = "",
  price = "",
  notification = "",
  originalPrice = "",
  discountedPrice = "",
  discountPercent,
  content = "Thêm vào giỏ hàng",
  variant = "default",
  show = false,
  order = false,
  link = "",
  discount,
  slug,
  longDescription,
}) {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      console.log("productId", productId);
      const res = await addToCart({ productId, quantity: 1 });

      dispatch(refreshCart());
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Thêm vào giỏ thất bại!");
    }
  };

  return (
    <>
      {variant === "default" ? (
        <div
          className={styles.default}
          data-discount={discountPercent ? `-${discountPercent}%` : ""}
        >
          <div className={styles.images}>
            <Link to={`${import.meta.env.VITE_FRONTEND_URL}/products/${link}`}>
              <img src={image} alt="" />
            </Link>
            <div className={styles.price}>
              <div className={styles.originalPrice}>{originalPrice}</div>
              {discountedPrice && (
                <div className={styles.discountedPrice}>{discountedPrice}</div>
              )}
            </div>
          </div>
          <div className={styles.content}>
            <Link to={`${import.meta.env.VITE_FRONTEND_URL}/products/${link}`}>
              <div className={styles.name}>{name}</div>
            </Link>

            <div className={styles.desc}>
              {longDescription
                ? longDescription
                : "10C – Âm Thanh 360°, Chống Nước IPX5, Bluetooth 5.3Khám phá Wise Tiger F10C với âm thanh vòm 360°, công suất mạnh mẽ, chống nước IPX5 và Bluetooth 5.3. Thiết kế nhỏ"}
            </div>
            {show && (
              <div className={styles.buttonList}>
                <button className={styles.btn} onClick={handleAddToCart}>
                  <span>{content}</span>
                  <div className={styles["cart-icon"]}>
                    <i className="fa-solid fa-cart-plus"></i>
                  </div>
                </button>
              </div>
            )}
            {order && (
              <button className={styles.customButton}>
                <span>ĐĂNG KÝ ĐẶT TRƯỚC</span>
                <div className={styles.bellIcon}>
                  <i className="fas fa-bell"></i>
                </div>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.alternative}>
          {discount !== "null" && (
            <div className={styles.saleBadge}>
              {discount} % <br />
              OFF
            </div>
          )}

          <Link to={`/products/${slug}`}>
            <img src={image} alt="" />
          </Link>
          <div className={styles.content}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.desc}>{desc}</div>
            <div className={styles.price}>{price}</div>
            <div className={styles.notification}>{notification}</div>
            <div className={styles.buttonList}>
              <button className={styles.btn} onClick={handleAddToCart}>
                {content}
                <div className={styles["cart-icon"]}>
                  <i className="fa-solid fa-cart-plus"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

SlideHalfImage.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
  desc: PropTypes.string,
  price: PropTypes.string,
  notification: PropTypes.string,
  originalPrice: PropTypes.string,
  discountedPrice: PropTypes.string,
  content: PropTypes.string,
  show: PropTypes.bool,
  order: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "alternative"]),
};

export default SlideHalfImage;
