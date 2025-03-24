import styles from "./Service.module.scss";

function Service() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>CAM KẾT DỊCH VỤ</h2>
      <div className={styles.listLogo}>
        <div className={styles.item}>
          <img
            src="https://theme.hstatic.net/1000069970/1001119059/14/home_service_1_compact.jpg?v=7149"
            alt=""
          />
          <h3 className={styles.desc}>HỖ TRỢ 24/7</h3>
        </div>
        <div className={styles.item}>
          <img
            src="https://theme.hstatic.net/1000069970/1001119059/14/home_service_2_compact.jpg?v=7149"
            alt=""
          />
          <h3 className={styles.desc}>ĐẢM BẢO UY TÍN CHẤT LƯỢNG</h3>
        </div>
        <div className={styles.item}>
          <img
            src="https://theme.hstatic.net/1000069970/1001119059/14/home_service_3_compact.jpg?v=7149"
            alt=""
          />
          <h3 className={styles.desc}>GIAO HÀNG NHANH CHÓNG</h3>
        </div>
        <div className={styles.item}>
          <img
            src="https://theme.hstatic.net/1000069970/1001119059/14/home_service_4_compact.jpg?v=7149"
            alt=""
          />
          <h3 className={styles.desc}>MUA HÀNG CỰC KÌ DỄ DÀNG</h3>
        </div>
      </div>
    </div>
  );
}

export default Service;
