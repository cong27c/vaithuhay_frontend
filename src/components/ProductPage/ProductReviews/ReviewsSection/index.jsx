import { useState } from "react";
import styles from "./ReviewsSection.module.scss";
import clsx from "clsx";
import Button from "@/components/Button";
import RatingSummary from "../RatingSummary";
import RatingTab from "../RatingTab";
import ReviewsForm from "../ReviewsForm";
import QuestionsForm from "../QuestionsForm";
import ReviewComments from "../ReviewComments";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const ReviewsSection = ({ product }) => {
  const [activeReviewsContent, setActiveReviewsContent] = useState(false);
  const [activeQuestionsContent, setActiveQuestionsContent] = useState(false);
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [commentsContent, setCommentsContent] = useState(false);
  const [questions, setQuestions] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleCommentsContent = () => {
    setCommentsContent(!commentsContent);
    setQuestions(false);
  };

  const handleQuestions = () => {
    setQuestions(!questions);
    setCommentsContent(false);
  };

  const handleReviewsClick = () => {
    setActiveReviewsContent(!activeReviewsContent);
    setActiveQuestionsContent(false);
  };

  const handleQuestionsClick = () => {
    setActiveQuestionsContent(!activeQuestionsContent);
    setActiveReviewsContent(false);
  };

  const ratings = [
    { stars: 5, percentage: 100, count: 4 },
    { stars: 4, percentage: 0, count: 0 },
    { stars: 3, percentage: 0, count: 0 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ];

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.headerSection}>
        <RatingSummary ratings={ratings} averageRating={5} totalReviews={4} />
        <RatingTab
          activeReviewsContent={activeReviewsContent}
          activeQuestionsContent={activeQuestionsContent}
          onQuestionsClick={handleQuestionsClick}
          onReviewsClick={handleReviewsClick}
        />
      </div>
      <div className={styles.bodySection}>
        <div className={styles.tabsContent}>
          {activeReviewsContent && (
            <ReviewsForm
              product={product}
              username={currentUser.username}
              email={currentUser.email}
              phone={currentUser.phone}
              rating={rating}
              setRating={setRating}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          )}
          {activeQuestionsContent && <QuestionsForm />}
        </div>
      </div>
      <div className={styles.footerSection}>
        <div className={styles.toggleContainer}>
          <div className={styles.toggleBtn}>
            <span
              className={clsx(
                styles.toggleText,
                commentsContent ? styles.active : "",
              )}
              onClick={handleCommentsContent}
            >
              ĐÁNH GIÁ
            </span>
            <span
              className={clsx(
                styles.toggleText,
                questions ? styles.active : "",
              )}
              onClick={handleQuestions}
            >
              HỎI VAITHUHAY
            </span>
          </div>
          <div className={styles.content}>
            {commentsContent && (
              <div className={styles.commentsContent}>
                <ReviewComments />
              </div>
            )}
            {questions && <div className={styles.questions}>questions</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
