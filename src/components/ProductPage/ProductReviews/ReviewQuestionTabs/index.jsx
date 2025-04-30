import { useState } from "react";
import styles from "./ReviewQuestionTabs.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import { faComment } from "@fortawesome/free-regular-svg-icons";

const ReviewQuestionTabs = () => {
  const [activeTab, setActiveTab] = useState("reviews"); // 'reviews' hoặc 'questions'
  const [rating, setRating] = useState(0);
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.headerSection}>
        <div className={styles.starDisplay}>
          <div className={styles.listStar}>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <span key={index}>
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ))}
          </div>
          <div className={styles.desc}>Dựa trên 0 đánh giá</div>
        </div>
        <div className={styles.tabsHeader}>
          <Button
            tabButton
            className={clsx(
              styles.tabButton,
              activeTab === "reviews" && styles.tabButtonActive
            )}
            onClick={() => setActiveTab("reviews")}
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
              activeTab === "questions" && styles.tabButtonActive
            )}
            onClick={() => setActiveTab("questions")}
          >
            Bật câu hỏi
            <span>
              <FontAwesomeIcon icon={faComment} />
            </span>
          </Button>
        </div>
      </div>
      <div className={styles.bodySection}>
        <div className={styles.tabsContent}>
          {activeTab === "reviews" ? (
            <div className={styles.reviewsContent}>
              <div className={styles.line}></div>
              <div className={styles.userIn4}>
                <input type="text" placeholder="Nhập tên vào đây..." />
                <input type="email" placeholder="example@gmail.com" />
                <input type="text" placeholder="Nhập số điện thoại vào đây" />
              </div>
              <div className={styles.starRating}>
                <div className={styles.subTitle}>Đánh giá</div>
                <div className={styles.listStar}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={clsx(
                        star <= rating ? styles.starFilled : styles.star
                      )}
                      onClick={() => setRating(star)}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.titleRating}>
                <div className={styles.subTitle}>Tiêu đề đánh giá</div>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề đánh giá của bạn"
                />
              </div>
              <div className={styles.contentRating}>
                <div className={styles.subTitle}>Nội dung</div>

                <input
                  type="text"
                  placeholder="Viết nội dung đánh giá của bạn"
                />
              </div>
            </div>
          ) : (
            <div className={styles.questionsContent}>questionsContent</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewQuestionTabs;
