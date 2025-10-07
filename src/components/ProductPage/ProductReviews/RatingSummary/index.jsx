import styles from "./RatingSummary.module.scss";

function RatingSummary({ ratings, averageRating, totalReviews }) {
  const renderStars = (starCount) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      stars.push(
        <span
          key={i}
          className={i < starCount ? styles.filledStar : styles.emptyStar}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.evaluationTable}>
      <div className={styles.ratingContainer}>
        <div className={styles.ratingScore}>{averageRating} / 5</div>
        <div className={styles.stars}>{renderStars(averageRating)}</div>
        <div className={styles.ratingCount}>
          Dựa trên {totalReviews} đánh giá
        </div>
      </div>
      <div className={styles.statisticsTable}>
        {ratings.map((rating, index) => (
          <div key={index} className={styles.ratingRow}>
            <div className={styles.stars}>{renderStars(rating.stars)}</div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${rating.percentage}%` }}
              />
            </div>
            <div className={styles.percentage}>
              {rating.percentage}% ({rating.count})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingSummary;
