import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./StarRating.module.scss";
import clsx from "clsx";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function StarRating({ setRating, rating }) {
  return (
    <div className={styles.listStar}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={clsx(star <= rating ? styles.starFilled : styles.star)}
          onClick={() => setRating(star)}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
      ))}
    </div>
  );
}

export default StarRating;
