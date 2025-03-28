import images from "~/assets/images";
import styles from "./Youtube.module.scss";
import ButtonsList from "../ButtonsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

function Youtube() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.Slider6}>
        <ButtonsList />
        <h3 className={styles.title}>
          KÊNH YOUTUBE MÔ TẢ CHI TIẾT THỰC TẾ SẢN PHẨM CỦA
        </h3>
        <div className={styles.source}>VAITHUHAY.COM</div>
        <div className={styles.listCard}>
          <div className={styles.cardItem}>
            <div className={styles.images}>
              <img src={images.course4} alt="" />
              <div className={styles.price}>2,964,000</div>
              <FontAwesomeIcon
                icon={faYoutube}
                className={styles["youtube-icon"]}
              />
            </div>
            <div className={styles.content}>
              (DUY LUÂN DỄ THƯƠNG) ĐÁNH GIÁ BÀN PHÍM LOFREE FLOW
            </div>
          </div>

          <div className={styles.cardItem}>
            <div className={styles.images}>
              <img src={images.course4} alt="" />
              <div className={styles.price}>2,964,000</div>
              <FontAwesomeIcon
                icon={faYoutube}
                className={styles["youtube-icon"]}
              />
            </div>
            <div className={styles.content}>
              (DUY LUÂN DỄ THƯƠNG) ĐÁNH GIÁ BÀN PHÍM LOFREE FLOW
            </div>
          </div>

          <div className={styles.cardItem}>
            <div className={styles.images}>
              <img src={images.course4} alt="" />
              <div className={styles.price}>2,964,000</div>
              <FontAwesomeIcon
                icon={faYoutube}
                className={styles["youtube-icon"]}
              />
            </div>
            <div className={styles.content}>
              (DUY LUÂN DỄ THƯƠNG) ĐÁNH GIÁ BÀN PHÍM LOFREE FLOW
            </div>
          </div>
        </div>
        <button className={styles["subscribe-button"]}>
          <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default Youtube;
