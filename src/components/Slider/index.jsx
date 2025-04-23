import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SlideHalfImage from "./SlideTypes/SlideHalfImage";
import SlideImage from "./SlideTypes/SlideImage";
import Banner from "./SlideTypes/Banner";
import styles from "./Slider.module.scss";
import clsx from "clsx";
import { NextButton, PrevButton } from "../SliderControls";

function Slider({
  slides,
  onDotClick,
  type = "image",
  wrap = false,
  onIndexChange,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (onDotClick) {
      onDotClick(index); // Gọi hàm từ cha
    }
  };

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  const groupSlides = () => {
    const groups = [];
    for (let i = 0; i < slides.length; i += 8) {
      groups.push(slides.slice(i, i + 8));
    }
    return groups;
  };

  const slideTwoRow = groupSlides();
  const totalGroups = slideTwoRow.length;

  const handlePrev = () => {
    if (wrap) {
      setCurrentIndex((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (wrap) {
      setCurrentIndex((next) => (next === totalGroups - 1 ? 0 : next + 1));
    } else {
      setCurrentIndex((next) => (next === slides.length - 1 ? 0 : next + 1));
    }
  };

  const renderSlideItem = (slide) => {
    switch (type) {
      case "image":
        return <SlideImage {...slide} variant={slide.variant || "default"} />;
      case "banner":
        return <Banner {...slide} />;
      case "half-image":
        return (
          <SlideHalfImage {...slide} variant={slide.variant || "default"} />
        );
      default:
        return <SlideImage {...slide} variant={slide.variant || "default"} />;
    }
  };
  const slidesPerRow = 4.05;
  const translateValue = wrap
    ? Math.floor(-currentIndex * 100)
    : -currentIndex * (100 / slidesPerRow);

  return (
    <div className={styles.sliderContainer}>
      <PrevButton onClick={handlePrev} />

      <div className={styles.sliderWrapper}>
        <div
          className={clsx(styles.slidesContainer, {
            [styles.wrap]: wrap,
          })}
          style={{
            transform: `translateX(${translateValue}%)`,
            transition: "transform 0.5s ease",
          }}
        >
          {!wrap
            ? [...slides, ...slides.slice(0, slidesPerRow)].map(
                (slide, index) => (
                  <div
                    key={index}
                    className={styles.slide}
                    style={{ width: `${100 / slidesPerRow}%` }}
                  >
                    {renderSlideItem(slide)}
                  </div>
                )
              )
            : slideTwoRow.map((slideGroup, groupIndex) => {
                return (
                  <div
                    key={groupIndex}
                    className={styles.slide2Row}
                    style={{ width: `100%` }}
                  >
                    {slideGroup.map((slide, slideIndex) => (
                      <div key={slideIndex} className={styles.slideInGroup}>
                        {renderSlideItem(slide)}
                      </div>
                    ))}
                  </div>
                );
              })}
        </div>
      </div>
      <NextButton onClick={handleNext} />
    </div>
  );
}
Slider.propTypes = {
  slides: PropTypes.array.isRequired,
  wrap: PropTypes.bool,
  type: PropTypes.oneOf(["image", "banner", "half-image"]),
  onIndexChange: PropTypes.func,
  onDotClick: PropTypes.func,
};
export default Slider;
