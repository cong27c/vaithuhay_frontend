import { useState } from "react";
import StarRating from "../StarRating";
import styles from "./ReviewComments.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Button from "@/components/Button";
import clsx from "clsx";

const ReviewComments = ({ reviews }) => {
  const [activeSuggestIndex, setActiveSuggestIndex] = useState(null);
  const [activeShareIndex, setActiveShareIndex] = useState(null);
  return (
    <div className={styles.reviewComments}>
      {reviews.map((review, index) => (
        <div key={index} className={styles.reviewItem}>
          <div className={styles.reviewHeader}>
            <div className={styles.useInfo}>
              <span className={styles.userInitial}>{review.userInitial}</span>
              <div>
                <span className={styles.userName}>{review.userName}</span>
                <span className={styles.purchaseLabel}>
                  {review.purchaseLabel}
                </span>
              </div>
            </div>
            <div className={styles.ratingInfo}>
              <StarRating rating={review.rating} />
              <span className={styles.ratingCount}>({review.ratingDate})</span>
            </div>
          </div>
          <p className={styles.reviewContent}>{review.content}</p>
          {review.images && review.images.length > 0 && (
            <div className={styles.reviewImages}>
              {review.images.map((img, imgIndex) => (
                <img key={imgIndex} src={img} alt={`Review ${imgIndex + 1}`} />
              ))}
            </div>
          )}
          <div className={styles.reviewActions}>
            <button
              className={styles.actionButton}
              onClick={() =>
                setActiveSuggestIndex(
                  activeSuggestIndex === index ? null : index,
                )
              }
            >
              Gợi ý
            </button>
            <button
              className={styles.actionButton}
              onClick={() =>
                setActiveShareIndex(activeShareIndex === index ? null : index)
              }
            >
              Share
            </button>
            {activeShareIndex === index && (
              <div className={styles.socialMedia}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faFacebook} />
                  <span>Facebook</span>
                </div>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faTwitter} />
                  <span>Twitter</span>
                </div>
              </div>
            )}
          </div>
          {activeSuggestIndex === index && (
            <div className={styles.formComment}>
              <input type="text" placeholder="Nhập tên của bạn" />
              <textarea type="text" placeholder="Nhập nội dung tại đây..." />
              <div className={styles.listBtn}>
                <div>
                  <Button draculaButton className={styles.btn}>
                    Gửi câu trả lời của bạn
                  </Button>
                </div>
                <button
                  className={clsx(styles.btnCancel, styles.btn)}
                  onClick={() => setActiveSuggestIndex(null)}
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewComments;
ReviewComments.defaultProps = {
  reviews: [
    {
      userInitial: "T",
      userName: "Thanh Tú",
      purchaseLabel: "Đã mua hàng",
      rating: 5,
      ratingDate: "4 tháng trước",
      content:
        "Trải nghiệm rất full chức năng mà không bị nhân bản. Chưa bao giờ sử dụng con chuột nào cảm giác đầm tay, thích nhất ae",
      images: [
        "https://cdn.panasoniclighting.net/review-app/1734614355701-O1CN01aHsWZ12AGCrAn1yra_!!4611686018427386623-0-rate.jpg_960x960.jpg_.png",
        "https://cdn.panasoniclighting.net/review-app/1734614355701-O1CN01aHsWZ12AGCrAn1yra_!!4611686018427386623-0-rate.jpg_960x960.jpg_.png",
        "https://cdn.panasoniclighting.net/review-app/1734614355701-O1CN01aHsWZ12AGCrAn1yra_!!4611686018427386623-0-rate.jpg_960x960.jpg_.png",
      ],
    },
    {
      userInitial: "H",
      userName: "Hải Đăng",
      purchaseLabel: "Đã mua hàng",
      rating: 4,
      ratingDate: "4 tháng trước",
      content:
        "Trải nghiệm được đấy, điều chỉnh DPI căng đét, ấn em nhẹ nhàng thì không kêu to",
      images: [],
    },
    {
      userInitial: "V",
      userName: "Vũ Đăng",
      purchaseLabel: "Đã mua hàng",
      rating: 5,
      ratingDate: "4 tháng trước",
      content:
        "Trải nghiệm rất ok luôn, kết nối lẹ windows máy nhẹ, chất lượng ghi âm",
      images: ["https://via.placeholder.com/80"],
    },
    {
      userInitial: "V",
      userName: "Vũ Đăng",
      purchaseLabel: "Đã mua hàng",
      rating: 5,
      ratingDate: "4 tháng trước",
      content:
        "Trải nghiệm rất ok luôn, kết nối lẹ windows máy nhẹ, chất lượng ghi âm",
      images: ["https://via.placeholder.com/80"],
    },
  ],
};
