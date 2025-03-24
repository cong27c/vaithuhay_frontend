import styles from "./CartIcon.module.scss";

function CartIcon() {
  return (
    <>
      <button className={styles["cart-icon"]}>
        <i className="fa-sharp fa-solid fa-cart-shopping"></i>
        <span>0</span>
      </button>
    </>
  );
}

export default CartIcon;
