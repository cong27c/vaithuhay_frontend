import { Link } from "react-router-dom";
import styles from "./CartIcon.module.scss";
import config from "@/config";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshCart } from "@/features/cart/cartThunks"; // ✅ đúng thunk

function CartIcon() {
  const dispatch = useDispatch();
  const { cartItems, combos, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(refreshCart());
  }, [dispatch]);

  console.log("cartItems", cartItems);
  console.log("combos", combos);

  // 🔢 Chỉ lấy length của cartItems và combos
  const totalQuantity = (cartItems?.length || 0) + (combos?.length || 0);

  return (
    <Link to={config.routes.cart} className={styles["cart-link"]}>
      <div className={styles["cart-container"]}>
        <button className={styles["cart-icon"]}>
          <i className="fa-sharp fa-solid fa-cart-shopping"></i>
        </button>

        {/* Hiển thị badge nếu có sản phẩm */}
        {!loading && totalQuantity > 0 && (
          <span className={styles["quantity-badge"]}>{totalQuantity}</span>
        )}
      </div>
    </Link>
  );
}

export default CartIcon;
