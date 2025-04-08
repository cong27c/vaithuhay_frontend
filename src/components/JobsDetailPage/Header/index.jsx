import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.scss";
import {
  faAngleDoubleDown,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import { useState } from "react";
import PropTypes from "prop-types";

function Header({ array }) {
  const [showVideo, setShowVideo] = useState(false);
  console.log(array);
  return (
    <div className={styles.wrapper}>
      <div className={styles.introduce}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img
              src="https://w.ladicdn.com/s550x500/5c0b681b8b014a0649e90d0a/vaithuhay-trang-20220803021735.png"
              alt=""
            />
          </div>
          <div className={styles.title}>
            GREAT VISION, WITHOUT GREAT <br />
            <strong>PEOPLE</strong>
            <br />
            IS IRRELEVANT
          </div>
          <div className={styles.applyNow}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            </div>
            <div className={styles.desc}>JOIN WITH VAITHUHAY RIGHT NOW !</div>
            <div>
              <Button tabButton className={styles.btn}>
                ỨNG TUYỂN NGAY
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.explain}>
        <div className={styles.content}>
          <div className={styles.ytbBox} onClick={() => setShowVideo(true)}>
            <iframe
              src={
                showVideo
                  ? "https://www.youtube.com/embed/zn14eN95TSA?autoplay=1"
                  : "#!"
              }
              title="Video YouTube"
            ></iframe>
            {!showVideo && (
              <div
                className={`${styles.overlayWrapper} ${
                  showVideo ? styles.disabled : ""
                }`}
              >
                <img
                  src="https://w.ladicdn.com/s2404x915/5c0b681b8b014a0649e90d0a/sdsad-20230226235346-4wibd.jpg"
                  alt="Overlay Image"
                />
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faPlayCircle} />
                  <span>Nhấn vào để xem video</span>
                </div>
              </div>
            )}

            <div
              className={`${styles.boxContent} ${
                showVideo ? styles.disabled : ""
              }`}
            >
              <div className={styles.title}>VÀI THỨ HAY LÀ GÌ</div>
              <div className={styles.desc}>
                Có thể bạn sẽ muốn sở hữu rất nhiều sản phẩm sáng tạo vô tình
                thấy được trên mạng xã hội, đâu đó ngoài đời sống nhưng không
                biết chất lượng, giá thành đắt hay rẻ, điều này tạo nên một
                khoảng cách lớn giữa người mua hàng và những người sáng tạo sản
                phẩm chân chính. Chúng tôi được lập nên để rút ngắn khoảng cách
                này và sản phẩm chúng tôi được khẳng định là chất lượng - có
                chọn lọc với giá thành hợp lý nhất.{" "}
              </div>
              <Button tabButton className={styles.btn}>
                XEM THÊM
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.interest}>
        <div className={styles.boxTop}>
          <div className={styles.title}>QUYỀN LỢI</div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.boxList}>
          {array &&
            array.map((item, index) => (
              <div key={index} className={styles.boxItem}>
                <div className={styles.iconTitle}>
                  <div className={styles.iconCircle}>{item.icon}</div>
                  <div className={styles.title}>{item.title}</div>
                </div>
                <div className={styles.underline}></div>
                <ul className={styles.desc}>
                  <li>{item.desc1}</li>
                  <li>{item.desc2}</li>
                  <li>{item.desc3}</li>
                  <li>{item.desc4}</li>
                </ul>
              </div>
            ))}
        </div>
        <div className={styles.boxBot}>
          <Button tabButton className={styles.btn}>
            Tải file
          </Button>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  array: PropTypes.array.isRequired,
};
export default Header;
