import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Youtube.module.scss";
import PropTypes from "prop-types";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

function Youtube({ image = "", price = "", desc = "" }) {
  return (
    <div className={styles.cardItem}>
      <div className={styles.images}>
        <img src={image} alt="" />
        <div className={styles.price}>{price}</div>
        <FontAwesomeIcon icon={faYoutube} className={styles["youtube-icon"]} />
      </div>
      <div className={styles.content}>{desc} </div>
    </div>
  );
}

Youtube.propTypes = {
  image: PropTypes.string,
  price: PropTypes.string,
  desc: PropTypes.string,
};

export default Youtube;
