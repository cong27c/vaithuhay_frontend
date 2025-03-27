import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./FavoriteIcon.module.scss";
import styles from "./FavoriteIcon.module.scss";
import PropTypes from "prop-types";

const FavoriteIcon = ({ width = "30px", height = "30px" }) => {
  return (
    <div className={styles["icon-container"]}>
      <div className={styles["icon-background"]} style={{ width, height }}>
        <FontAwesomeIcon icon={faHeart} className={styles["heart-icon"]} />
      </div>
    </div>
  );
};

FavoriteIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
export default FavoriteIcon;
