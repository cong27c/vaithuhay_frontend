import images from "@/assets/images";
import styles from "./SlideHalfImageAlternative.module.scss";

import PropTypes from "prop-types";
import Slider from "@/components/Slider";
import { getByProductsSlug } from "@/Services/collectionService";
import { useEffect, useState } from "react";

function SlideHalfImageAlternative({ title, backGroundImage, products }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.Slider4}>
        <div className={styles["title-wrapper"]}>
          <span className={styles.line}></span>
          <h2 className={styles["main-title"]}>
            {title || `ĐỒ ĐIỆN TỬ DỊ NHẤT 2025`}
          </h2>
          <span className={styles.line}></span>
        </div>
        <div className={styles.listCard}>
          <Slider slides={products} type="half-image" />
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
