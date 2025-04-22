import styles from "./MegaMenu.module.scss";

function MegaMenu() {
  return (
    <div className={styles.megaMenu}>
      <div className={styles.column}>
        <h4>Danh mục</h4>
        <ul>
          <li>
            <a href="/category/du-lich">🌍 Du lịch</a>
          </li>
          <li>
            <a href="/category/hoc-tap">📚 Học tập</a>
          </li>
          <li>
            <a href="/category/giai-tri">🎮 Giải trí</a>
          </li>
        </ul>
      </div>
      <div className={styles.column}>
        <h4>Sản phẩm nổi bật</h4>
        <ul>
          <li>
            <a href="#">Gadget mới</a>
          </li>
          <li>
            <a href="#">Ứng dụng học</a>
          </li>
        </ul>
      </div>
      <div className={styles.column}>
        <h4>Khuyến mãi</h4>
        <p>Ưu đãi hấp dẫn đang chờ bạn!</p>
      </div>
    </div>
  );
}

export default MegaMenu;
