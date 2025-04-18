import styles from "./PolicySection.module.scss";
import Slider from "../Slider";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PolicySection({ slideImage, listItem, slidesData, title = "" }) {
  let configs = [
    "/news/EYESmartcase",
    "/news/kingrowK1",
    "/news/smartEInkTablet",
    "/news/narwalRobot",
    "/news/rainShoeCover",
    "/news/diceGlowFeature",
    "/news/leatherCareTips",
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>{title}</h1>
        <nav className={styles.breadcrumb}>
          <a href="/">Trang chủ</a>
          <span>/</span>
          <a href="/danh-muc">Danh mục</a>
          <span>/</span>
          <span className={styles.current}>{title}</span>
        </nav>
      </div>
      <div className={styles.bodySection}>
        <div className={styles.bodyLeft}>
          <div className={styles.slideImage}>
            {slideImage.map((item, index) => (
              <div key={index} className={styles.image}>
                <img src={item.image} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bodyRight}>
          <div className={styles.subTitle}>BÀI VIẾT MỚI</div>
          <div className={styles.listItem}>
            {listItem.map((item, index) => (
              <Link key={index} to={configs[index]}>
                <div className={styles.item}>
                  <div className={styles.image}>
                    <img src={item.image} alt="" />
                  </div>
                  <div className={styles.desc}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.slider}>
          <div className={styles.sliderTitle}>Sản phẩm phù hợp với bạn</div>
          <Slider slides={slidesData} type="half-image" />
        </div>
      </div>
    </div>
  );
}
PolicySection.propTypes = {
  slideImage: PropTypes.array,
  listItem: PropTypes.array,
  slidesData: PropTypes.array,
  title: PropTypes.string,
};

export default PolicySection;
