import images from "~/assets/images";
import styles from "./Workspace.module.scss";
import ButtonsList from "../ButtonsList";

function Workspace() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.Slider5}>
        <ButtonsList />
        <div className={styles["title-wrapper"]}>
          <span className={styles.line}></span>
          <h2 className={styles["main-title"]}>VAITHUHAY WORKSPACE</h2>
          <span className={styles.line}></span>
        </div>
        <div className={styles.desc}>
          Trải nghiệm trực tiếp sản phẩm của Vaithuhay tại các Workspace
        </div>
        <div className={styles.listCard}>
          <div className={styles.cartItem}>
            <div className={styles.images}>
              <img src={images.course2} alt="" />
              <div className={styles.content}>
                <button className={styles.introduce}>
                  Giới thiệu cửa hàng
                </button>
                <div className={styles.listBtn}>
                  <img
                    src="//theme.hstatic.net/1000069970/1001119059/14/logo-workspace3_small.png?v=7149"
                    alt=""
                  />
                  <div className={styles.location}>
                    <i className="fa fa-map-marker-alt"></i>Nam Từ Liêm Hàn Nội
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cartItem}>
            <div className={styles.images}>
              <img src={images.course3} alt="" />
              <div className={styles.content}>
                <button className={styles.introduce}>
                  Giới thiệu cửa hàng
                </button>
                <div className={styles.listBtn}>
                  <img
                    src="//theme.hstatic.net/1000069970/1001119059/14/logo-workspace3_small.png?v=7149"
                    alt=""
                  />
                  <div className={styles.location}>
                    <i className="fa fa-map-marker-alt"></i>Nam Từ Liêm Hàn Nội
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
