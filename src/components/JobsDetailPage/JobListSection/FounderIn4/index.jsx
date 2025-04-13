import React from "react";
import styles from "./FounderIn4.module.scss";
import clsx from "clsx";
import PropTypes from "prop-types";

function FounderIn4({ backGround = false }) {
  return (
    <div
      className={clsx(
        styles.wrapper,
        backGround ? styles.haveBackGround : styles.haveNoBackGround
      )}
    >
      <div className={styles.image}>
        <img
          src="https://w.ladicdn.com/s600x600/5c0b681b8b014a0649e90d0a/buiatma-20220803044915.png"
          alt=""
        />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>Bùi Sơn Tâm</div>
        <div className={styles.career}>CEO & Founder</div>
        <div className={styles.desc1}>
          Nếu bạn đang cân nhắc ứng tuyển vào vị trí Marketing executive tại
          công ty chúng tôi, bạn nên xem xét kỹ hơn nữa nhé. Thử thách nhiều,
          công việc áp lực, quyền lợi tương xứng nhưng tôi tin rằng bạn chấp
          nhận điều này, bạn là người can đảm - dám đương đầu để trưởng thành.
        </div>
        <div className={styles.desc2}>
          Vậy còn chần chừ gì nữa, let's do it !
        </div>
      </div>
    </div>
  );
}

FounderIn4.propTypes = {
  backGround: PropTypes.bool,
};

export default FounderIn4;
