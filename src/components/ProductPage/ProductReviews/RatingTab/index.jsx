import Button from "@/components/Button";
import styles from "./RatingTab.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

function RatingTab({
  activeReviewsContent,
  activeQuestionsContent,
  onReviewsClick,
  onQuestionsClick,
}) {
  return (
    <div className={styles.tabsHeader}>
      <Button
        tabButton
        className={clsx(
          styles.tabButton,
          activeReviewsContent && styles.tabButtonActive,
        )}
        onClick={onReviewsClick}
      >
        Viết đánh giá
        <span>
          <FontAwesomeIcon icon={faComment} />
        </span>
      </Button>
      <Button
        tabButton
        className={clsx(
          styles.tabButton,
          activeQuestionsContent && styles.tabButtonActive,
        )}
        onClick={onQuestionsClick}
      >
        Bật câu hỏi
        <span>
          <FontAwesomeIcon icon={faComment} />
        </span>
      </Button>
    </div>
  );
}

export default RatingTab;
