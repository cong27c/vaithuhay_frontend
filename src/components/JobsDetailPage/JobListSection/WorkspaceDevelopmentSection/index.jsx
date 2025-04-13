import clsx from "clsx";
import styles from "./WorkspaceDevelopmentSection.module.scss";
import PropTypes from "prop-types";

function WorkspaceDevelopmentSection({ backGround = false }) {
  return (
    <div
      className={clsx(
        styles.wrapper,
        backGround ? styles.haveBackGround : styles.haveNoBackGround
      )}
    >
      <div className={styles.title}>
        CHÚNG TÔI ĐANG PHÁT TRIỂN NGÀNH HÀNG WORKPACE
      </div>
      <div className={styles.workspaceGallery}>
        <div className={clsx(styles.card, styles.item1)}>
          <img
            src="https://w.ladicdn.com/s700x850/5c0b681b8b014a0649e90d0a/6-20230227030751-x_hzy.jpg"
            alt=""
          />
        </div>
        <div className={styles.container}>
          <div className={clsx(styles.card, styles.item2)}>
            <img
              src="	https://w.ladicdn.com/s650x550/5c0b681b8b014a0649e90d0a/5-20230227030838-2yjhd.jpg"
              alt=""
            />
          </div>
          <div className={clsx(styles.card, styles.item3)}>
            <img
              src="	https://w.ladicdn.com/s800x600/5c0b681b8b014a0649e90d0a/4-20230227030942-pgls_.jpg"
              alt=""
            />
          </div>
        </div>
        <div className={clsx(styles.card, styles.item4)}>
          <img
            src="https://w.ladicdn.com/s550x850/5c0b681b8b014a0649e90d0a/3-20230227031043-tm1e6.jpg"
            alt=""
          />
        </div>
        <div className={clsx(styles.card, styles.item5)}>
          <img
            src="https://w.ladicdn.com/s750x850/5c0b681b8b014a0649e90d0a/2-20230227031123-zj8ow.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

WorkspaceDevelopmentSection.propTypes = {
  backGround: PropTypes.bool,
};

export default WorkspaceDevelopmentSection;
