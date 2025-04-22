import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SliderControls.module.scss";

export const PrevButton = ({ onClick }) => (
  <button className={styles.prevButton} onClick={onClick}>
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>
);

export const NextButton = ({ onClick }) => (
  <button className={styles.nextButton} onClick={onClick}>
    <FontAwesomeIcon icon={faChevronRight} />
  </button>
);
