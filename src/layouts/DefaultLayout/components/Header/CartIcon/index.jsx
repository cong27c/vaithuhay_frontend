import { Link } from "react-router-dom";
import styles from "./CartIcon.module.scss";
import config from "@/config";
import { useSelector } from "react-redux";

function CartIcon() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Tính tổng số lượng
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  return (
    <Link to={config.routes.cart} className={styles["cart-link"]}>
      <div className={styles["cart-container"]}>
        <button className={styles["cart-icon"]}>
          <i className="fa-sharp fa-solid fa-cart-shopping"></i>
        </button>
        {totalQuantity > 0 && (
          <span className={styles["quantity-badge"]}>{totalQuantity}</span>
        )}
      </div>
    </Link>
  );
}

export default CartIcon;
