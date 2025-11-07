import { useState, useEffect } from "react";
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
import { getReviewableOrders } from "@/Services/reviewService";

const ReviewsSection = ({ product }) => {
  const [activeReviewsContent, setActiveReviewsContent] = useState(false);
  const [activeQuestionsContent, setActiveQuestionsContent] = useState(false);
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [commentsContent, setCommentsContent] = useState(false);
  const [questions, setQuestions] = useState(false);

  console.log("product", product);

  // THÊM: State cho reviewable orders
  const [reviewableOrders, setReviewableOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderError, setOrderError] = useState("");

  const currentUser = useSelector((state) => state.auth.currentUser);

  // THÊM: Hàm load reviewable orders
  useEffect(() => {
    const loadReviewableOrders = async () => {
      if (!product?.id) return;

      try {
        setLoadingOrders(true);
        setOrderError("");
        const response = await getReviewableOrders(product.id);
        console.log("loadReviewableOrders", response.orders);
        setReviewableOrders(response.orders || []);

        // Auto select first order if available
        if (response.orders && response.orders.length > 0) {
          setSelectedOrderId(response.orders[0].id);
        }
      } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
        setOrderError("Không thể tải thông tin đơn hàng");
      } finally {
        setLoadingOrders(false);
      }
    };

    // Chỉ load orders khi mở tab reviews hoặc có product
    if (activeReviewsContent || product?.id) {
      loadReviewableOrders();
    }
  }, [product?.id, activeReviewsContent]);

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

  // THÊM: Hiển thị thông báo trạng thái đơn hàng
  const renderOrderStatus = () => {
    if (loadingOrders) {
      return (
        <div className={styles.orderStatus}>Đang kiểm tra đơn hàng...</div>
      );
    }

    if (orderError) {
      return <div className={styles.orderError}>{orderError}</div>;
    }

    return null;
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
        {/* THÊM: Hiển thị trạng thái đơn hàng */}
        {renderOrderStatus()}

        <div className={styles.tabsContent}>
          {activeReviewsContent && (
            <>
              {/* Chỉ hiển thị form nếu có order để review */}
              {reviewableOrders.length > 0 && selectedOrderId ? (
                <ReviewsForm
                  product={product}
                  orderId={selectedOrderId} // 👈 TRUYỀN orderId vào
                  username={currentUser?.username}
                  email={currentUser?.email}
                  phone={currentUser?.phone}
                  rating={rating}
                  setRating={setRating}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              ) : (
                !loadingOrders && (
                  <div className={styles.noOrderMessage}>
                    <p>Bạn cần mua sản phẩm này trước khi đánh giá</p>
                    <Button
                      onClick={() =>
                        (window.location.href = `/product/${product.slug}`)
                      }
                    >
                      Mua ngay
                    </Button>
                  </div>
                )
              )}
            </>
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
