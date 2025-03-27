import FavoriteIcon from "~/components/icons/FavoriteIcon";
import styles from "./Loyalty.module.scss";

function Loyalty() {
  return (
    <div className={styles.Loyalty}>
      <div className={styles.notification}>
        <div className={styles.desc}>
          Nhấn vào icon
          <span>
            <FavoriteIcon width="25px" height="25px" />
          </span>
          ở góc dưới bên trái để theo dõi điểm thưởng, cấp bậc và quy đổi
          voucher dành riêng cho thành viên
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.ListItem}>
          <div className={styles.item}>
            <div className={styles.boxIcon}>
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/icon-loyalty-detail-1.png?v=7154"
                alt=""
              />
            </div>
            <div className={styles.boxText}>
              Tặng coupon khi giới thiệu khách mới
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.boxIcon}>
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/icon-loyalty-detail-2.png?v=7154"
                alt=""
              />
            </div>
            <div className={styles.boxText}>
              Tặng coupon khi giới thiệu khách mới
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.boxIcon}>
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/icon-loyalty-detail-3.png?v=7154"
                alt=""
              />
            </div>
            <div className={styles.boxText}>
              Tặng coupon khi giới thiệu khách mới
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.boxIcon}>
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/icon-loyalty-detail-4.png?v=7154"
                alt=""
              />
            </div>
            <div className={styles.boxText}>
              Tặng coupon khi giới thiệu khách mới
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.boxIcon}>
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/icon-loyalty-detail-5.png?v=7154"
                alt=""
              />
            </div>
            <div className={styles.boxText}>
              Tặng coupon khi giới thiệu khách mới
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.boxIcon}>
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/icon-loyalty-detail-6.png?v=7154"
                alt=""
              />
            </div>
            <div className={styles.boxText}>
              Tặng coupon khi giới thiệu khách mới
            </div>
          </div>
        </div>
      </div>
      <div className={styles.button}>
        <button className={styles.btn}>Tìm hiểu chính sách Loyalty</button>
      </div>
    </div>
  );
}

export default Loyalty;
