import styles from "./FixedButtons.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import ButtonBars from "./ButtonBars";

function FixedButtons() {
  return (
    <>
      <div className={styles.fixedLeft}>
        <ButtonBars />
        <div className={styles.buttonHeart}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
      <div className={styles.fixedRight}>
        <a href="">
        <div className={styles.buttonMessenger}>
          <FontAwesomeIcon icon={faFacebookMessenger} />
        </div>
        </a>
        <div className={styles.buttonComment}>
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      </div>
    </>
  );
}

export default FixedButtons;
