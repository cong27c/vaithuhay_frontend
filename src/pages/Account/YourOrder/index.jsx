import styles from "./YourOrder.module.scss";

function YourOrder() {
  return (
    <div className={styles.YourOrder}>
      <div className={styles.desc}>
        Dưới đây là các đơn hàng mới nhất của bạn. Tìm theo{" "}
        <strong>Mã đơn hàng, email hoặc SĐT</strong>
      </div>
      <h2 className={styles.title}>Bạn chưa đặt mua sản phẩm.</h2>
    </div>
  );
}

export default YourOrder;
