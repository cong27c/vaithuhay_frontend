import images from "~/assets/images";
import styles from "./Youtube.module.scss";
import ButtonsList from "../ButtonsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import Slider from "~/components/Slider";

function Youtube() {
  const in4 = [
    {
      image: images.course4,
      price: "2,964,000",
      desc: "  (DUY LUÂN DỄ THƯƠNG) ĐÁNH GIÁ BÀN PHÍM LOFREE FLOW",
    },
    {
      image: images.course4,
      price: "2,964,000",
      desc: "  (DUY LUÂN DỄ THƯƠNG) ĐÁNH GIÁ BÀN PHÍM LOFREE FLOW",
    },
    {
      image: images.course4,
      price: "2,964,000",
      desc: "  (DUY LUÂN DỄ THƯƠNG) ĐÁNH GIÁ BÀN PHÍM LOFREE FLOW",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.Slider6}>
        <h3 className={styles.title}>
          KÊNH YOUTUBE MÔ TẢ CHI TIẾT THỰC TẾ SẢN PHẨM CỦA
        </h3>
        <div className={styles.source}>VAITHUHAY.COM</div>
        <div className={styles.listCard}>
          <Slider type="youtube" slides={in4} />
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
