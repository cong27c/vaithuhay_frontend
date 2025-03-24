import images from "~/assets/images";
import styles from "./Slider4.module.scss";
import ButtonsList from "../ButtonsList";
import PropTypes from "prop-types";

function Slider4({ title, backGroundImage }) {
  return (
    <div className={styles.wrapper}>
      <ButtonsList top="40%" />
      <div className={styles.Slider4}>
        <div className={styles["title-wrapper"]}>
          <span className={styles.line}></span>
          <h2 className={styles["main-title"]}>
            {title || `PHỤ KIỆN NÊN CÓ CHO "GÓC KIẾM CƠM" 2025`}
          </h2>
          <span className={styles.line}></span>
        </div>
        <div className={styles.listCard}>
          <div className={styles.cardItem}>
            <div className={styles.images}>
              <img src={images.course1} alt="" />
              <div className={styles.price}>
                <div className={styles.sale}>15,515,000₫</div>
                <div className={styles.cost}>18,515,000₫</div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.title}>
                9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới
                nhất 2023
              </div>
              <div className={styles.desc}>
                Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor,
                setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc
                đồng thời cũng đảm bảo sức khỏe cho
              </div>
            </div>
          </div>
          <div className={styles.cardItem}>
            <div className={styles.images}>
              <img src={images.course1} alt="" />
              <div className={styles.price}>
                <div className={styles.sale}>15,515,000₫</div>
                <div className={styles.cost}>18,515,000₫</div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.title}>
                9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới
                nhất 2023
              </div>
              <div className={styles.desc}>
                Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor,
                setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc
                đồng thời cũng đảm bảo sức khỏe cho
              </div>
            </div>
          </div>
          <div className={styles.cardItem}>
            <div className={styles.images}>
              <img src={images.course1} alt="" />
              <div className={styles.price}>
                <div className={styles.sale}>15,515,000₫</div>
                <div className={styles.cost}>18,515,000₫</div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.title}>
                9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới
                nhất 2023
              </div>
              <div className={styles.desc}>
                Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor,
                setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc
                đồng thời cũng đảm bảo sức khỏe cho
              </div>
            </div>
          </div>
          <div className={styles.cardItem}>
            <div className={styles.images}>
              <img src={images.course1} alt="" />
              <div className={styles.price}>
                <div className={styles.sale}>15,515,000₫</div>
                <div className={styles.cost}>18,515,000₫</div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.title}>
                9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới
                nhất 2023
              </div>
              <div className={styles.desc}>
                Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor,
                setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc
                đồng thời cũng đảm bảo sức khỏe cho
              </div>
            </div>
          </div>
        </div>

        <button className={styles["explore-button"]}>
          KHÁM PHÁ THÊM
          <span className={styles.arrow}>&#8594;</span>
        </button>
        <img src={backGroundImage} className={styles.backGround} alt="" />
      </div>
    </div>
  );
}

Slider4.propTypes = {
  title: PropTypes.string,
  backGroundImage: PropTypes.any,
};

Slider4.defaultProps = {
  title: 'PHỤ KIỆN NÊN CÓ CHO "GÓC KIẾM CƠM" 2025',
  backGroundImage:
    "https://file.hstatic.net/1000069970/file/setup_goc_lam_viec_12e3aa0a0a434faea058e43ee1c05d64.png",
};

export default Slider4;
