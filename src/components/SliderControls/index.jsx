import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SliderButton.module.scss";

const icons = {
  left: faChevronLeft,
  right: faChevronRight,
};

export const SliderButton = ({
  direction = "left",
  onClick,
  width = "50px",
  height = "50px",
  position = {},
  fontSize = "28px",
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{
        fontSize,
        width,
        height,
        ...position,
      }}
    >
      <FontAwesomeIcon icon={icons[direction]} />
    </button>
  );
};
