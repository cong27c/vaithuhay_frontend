import images from "@/assets/images";
import styles from "./SlideHalfImageAlternative.module.scss";

import PropTypes from "prop-types";
import Slider from "@/components/Slider";

function SlideHalfImageAlternative({ title, backGroundImage }) {
  const slidesData = [
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course2,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course1,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course4,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course5,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course5,
      variant: "default",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.Slider4}>
        <div className={styles["title-wrapper"]}>
          <span className={styles.line}></span>
          <h2 className={styles["main-title"]}>
            {title || `PHỤ KIỆN NÊN CÓ CHO "GÓC KIẾM CƠM" 2025`}
          </h2>
          <span className={styles.line}></span>
        </div>
        <div className={styles.listCard}>
          <Slider slides={slidesData} type="half-image" />
        </div>
        <img src={backGroundImage} className={styles.backGround} alt="" />
      </div>
    </div>
  );
}

SlideHalfImageAlternative.propTypes = {
  title: PropTypes.string,
  backGroundImage: PropTypes.any,
};

SlideHalfImageAlternative.defaultProps = {
  title: 'PHỤ KIỆN NÊN CÓ CHO "GÓC KIẾM CƠM" 2025',
  backGroundImage:
    "https://file.hstatic.net/1000069970/file/setup_goc_lam_viec_12e3aa0a0a434faea058e43ee1c05d64.png",
};

export default SlideHalfImageAlternative;
