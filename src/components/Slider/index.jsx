import PropTypes from "prop-types";
import { useState } from "react";
import SlideContent from "./SlideTypes/SlideContent";
import SlideHalfImage from "./SlideTypes/SlideHalfImage";
import SlideImage from "./SlideTypes/SlideImage";
import styles from "./Slider.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

function Slider({ slides, type = "image", wrap = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((next) => (next === slides.length - 1 ? 0 : next + 1));
  };

  const renderSlideItem = (slide) => {
    switch (type) {
      case "image":
        return <SlideImage {...slide} variant={slide.variant || "default"} />;
      case "content":
        return <SlideContent {...slide} variant={slide.variant || "default"} />;
      case "half-image":
        return (
          <SlideHalfImage {...slide} variant={slide.variant || "default"} />
        );
      default:
        return <SlideImage {...slide} variant={slide.variant || "default"} />;
    }
  };

  const isWrap = wrap;

  return (
    <div className={styles.sliderContainer}>
      <button className={styles.prevButton} onClick={prevSlide}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div
        className={clsx(styles.sliderWrapper, {
          [styles.wrap]: isWrap,
        })}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={clsx(styles.slide, {
              [styles.active]: index === currentIndex,
            })}
          >
            {renderSlideItem(slide)}
          </div>
        ))}
      </div>

      <button className={styles.nextButton} onClick={nextSlide}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
Slider.propTypes = {
  slides: PropTypes.array.isRequired,
  wrap: PropTypes.bool,
  type: PropTypes.oneOf(["image", "content", "half-image"]),
};
export default Slider;
