import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProductFeatureBanner.module.scss";
import { useState } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function ProductFeatureBanner({ highlights }) {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.bodyLeft}>
          <div className={styles.image}>
            <img src={highlights?.image} alt="" />
          </div>
        </div>
        <div className={styles.bodyRight}>
          <div className={styles.title}>{highlights?.name}</div>

          <ul>
            {highlights?.highlightsHtml.map((item, index) => (
              <li key={index}>
                <strong>{item.feature}</strong> {item.description}
              </li>
            ))}
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
