"use client";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Carousel.module.scss";
import CountDown from "@/components/CountDown";
import { useUpcomingCampaigns } from "@/Hooks/usePreorder";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);
  const VISIBLE_ITEMS = 3;
  const ITEM_WIDTH = 360;
  const GAP = 24;

  // ✅ Dùng React Query để cache dữ liệu
  const { data: campaignsData = [], isLoading, error } = useUpcomingCampaigns();

  // format data cho UI
  const campaigns =
    campaignsData?.map((campaign) => ({
      name: campaign.product?.name || "Không có tên",
      image: campaign.product?.image || "",
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      slug: campaign.product?.slug || "",
      id: campaign.id,
      status: campaign.status,
    })) || [];

  // clone thêm vài item để tạo vòng lặp
  const extendedCampaigns =
    campaigns.length > 0
      ? [...campaigns, ...campaigns.slice(0, VISIBLE_ITEMS)]
      : [];

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((next) => next + 1);
  };

  useEffect(() => {
    if (campaigns.length === 0) return;

    const handleTransitionEnd = () => {
      if (currentIndex >= campaigns.length) {
        setIsTransitioning(false);
        setCurrentIndex(0);
      } else if (currentIndex < 0) {
        setIsTransitioning(false);
        setCurrentIndex(campaigns.length - 1);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("transitionend", handleTransitionEnd);
      return () =>
        slider.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [currentIndex, campaigns.length]);

  const getTransformPosition = () => -(currentIndex * (ITEM_WIDTH + GAP));

  // ==== UI trạng thái ====
  if (isLoading) return <div className={styles.loading}>Đang tải...</div>;
  if (error) return <div className={styles.error}>Không thể tải dữ liệu</div>;
  if (campaigns.length === 0)
    return <div className={styles.error}>Không có sản phẩm nào</div>;

  return (
    <div className={styles["carousel-container"]}>
      <div className={styles["carousel-header"]}>
        <h2 className={styles.title}>
          CHỌN LỰA SẢN PHẨM MỞ BÁN
          <span className={styles["title-icon"]}>
            <i className="fa-solid fa-rocket"></i>
          </span>
        </h2>
      </div>

      <div className={styles["carousel-body"]}>
        <button
          className={styles["nav-button"]}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className={styles["carousel-viewport"]}>
          <div
            ref={sliderRef}
            className={styles["carousel-track"]}
            style={{
              transform: `translateX(${getTransformPosition()}px)`,
              transition: isTransitioning
                ? "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
          >
            {extendedCampaigns.map((campaign, index) => (
              <div key={index} className={styles["carousel-item"]}>
                <div className={styles["item-image-wrapper"]}>
                  <Link to={`/products/${campaign.slug}`}>
                    <img
                      src={
                        campaign.image ||
                        "/placeholder.svg?height=400&width=360&query=product"
                      }
                      alt={campaign.name}
                      loading="lazy"
                      className={styles["item-image"]}
                    />
                  </Link>
                  <div className={styles["item-badge"]}>
                    {campaign.status === "upcoming"
                      ? "SẮP RA MẮT"
                      : "ĐANG MỞ BÁN"}
                  </div>
                </div>

                <div className={styles["item-content"]}>
                  <h3 className={styles["item-title"]}>{campaign.name}</h3>

                  <div className={styles["item-meta"]}>
                    <span className={styles["meta-label"]}>
                      <i className="fa-regular fa-calendar"></i>
                      {campaign.status === "upcoming"
                        ? "Dự kiến ra mắt"
                        : "Đang mở bán"}
                    </span>
                  </div>

                  <CountDown
                    startDate={campaign.startDate}
                    endDate={campaign.endDate}
                  />

                  <button className={styles["item-button"]}>
                    <Link to={`/products/${campaign.slug}`}>
                      Đăng ký đặt trước
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles["nav-button"]}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className={styles["carousel-dots"]}>
        {campaigns.map((_, index) => (
          <button
            key={index}
            className={`${styles["dot"]} ${
              index === currentIndex % campaigns.length
                ? styles["dot-active"]
                : ""
            }`}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
