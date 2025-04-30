import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProductFeatureBanner.module.scss";
import { useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function ProductFeatureBanner() {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.bodyLeft}>
          <div className={styles.image}>
            <img
              src="https://file.hstatic.net/1000069970/file/download__2_.png"
              alt=""
            />
          </div>
        </div>
        <div className={styles.bodyRight}>
          <div className={styles.title}>
            NUPHY KICK75 | BÀN PHÍM CƠ ĐẦU TIÊN CÓ HYBRID PROFILE
          </div>
          <ul>
            <li>
              Bảo hành chính hãng 6 Tháng. Nâng tầm trải nghiệm với Bộ phụ kiện
              đi kèm
            </li>
            <li>
              Bảo hành chính hãng 6 Tháng. Nâng tầm trải nghiệm với Bộ phụ kiện
              đi kèm
            </li>
            <li>
              Bảo hành chính hãng 6 Tháng. Nâng tầm trải nghiệm với Bộ phụ kiện
              đi kèm
            </li>
            <li>
              Bảo hành chính hãng 6 Tháng. Nâng tầm trải nghiệm với Bộ phụ kiện
              đi kèm
            </li>
            <li>
              Bảo hành chính hãng 6 Tháng. Nâng tầm trải nghiệm với Bộ phụ kiện
              đi kèm
            </li>
            <li>
              Bảo hành chính hãng 6 Tháng. Nâng tầm trải nghiệm với Bộ phụ kiện
              đi kèm
            </li>
            <li>
              Bảo hành chính hãng 6 Tháng. Nâng tầm trải nghiệm với Bộ phụ kiện
              đi kèm
            </li>
            <li>
              Bảo hành chính hãng 6 Tháng. Nâng tầm trải nghiệm với Bộ phụ kiện
              đi kèm
            </li>
            <li>
              Bảo hành chính hãng 6 Tháng. Nâng tầm trải nghiệm với Bộ phụ kiện
              đi kèm
            </li>
            <li>
              Bảo hành chính hãng 6 Tháng. Nâng tầm trải nghiệm với Bộ phụ kiện
              đi kèm
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${styles["modern-button"]} ${
          active ? styles["heart-active"] : ""
        }`}
        onClick={() => setActive(!active)}
      >
        <span>QUAN TÂM</span>
        <FontAwesomeIcon icon={faHeart} />
      </div>
    </div>
  );
}

export default ProductFeatureBanner;
