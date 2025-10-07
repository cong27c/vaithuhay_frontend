import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SlideHalfImage from "./SlideTypes/SlideHalfImage";
import SlideImage from "./SlideTypes/SlideImage";
import Banner from "./SlideTypes/Banner";
import styles from "./Slider.module.scss";
import clsx from "clsx";
import Youtube from "./SlideTypes/Youtube";
import { SliderButton } from "../SliderControls";

function Slider({
  slides,
  type = "image",
  wrap = false,
  externalIndex,
  onIndexChange,
}) {
  const isControlled = externalIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(0);
  const index = isControlled ? externalIndex : internalIndex;

  const updateIndex = (newIndex) => {
    if (isControlled) {
      onIndexChange?.(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };

  const groupSlides = () => {
    const groups = [];
    for (let i = 0; i < slides.length; i += 8) {
      groups.push(slides.slice(i, i + 8));
    }
    return groups;
  };

  const slideTwoRow = groupSlides();

  const maxIndex = wrap ? slideTwoRow.length : slides.length;

  const handlePrev = () => {
    updateIndex((prev) => (prev + (maxIndex - 1)) % maxIndex);
  };

  const handleNext = () => {
    updateIndex((next) => (next + 1) % maxIndex);
  };
  const renderSlideItem = (slide, key) => {
    let SlideComponent;

    switch (type) {
      case "image":
        SlideComponent = (
          <SlideImage {...slide} variant={slide.variant || "default"} />
        );
        break;
      case "banner":
        SlideComponent = <Banner {...slide} />;
        break;
      case "youtube":
        SlideComponent = <Youtube {...slide} />;
        break;
      case "half-image":
        SlideComponent = (
          <SlideHalfImage {...slide} variant={slide.variant || "default"} />
        );
        break;
      default:
        SlideComponent = (
          <SlideImage {...slide} variant={slide.variant || "default"} />
        );
    }

    return <div key={key}>{SlideComponent}</div>;
  };

  const slidesPerRow = 4;
  const translateValue = wrap ? -index * 100 : -index * (100 / slidesPerRow);
  return (
    <div className={styles.sliderContainer}>
      <SliderButton
        fontSize="36px"
        direction="left"
        width="100px"
        height="100px"
        position={{ left: "-9%", top: "50%", transform: "translateY(-50%)" }}
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
      />
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
                ),
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
      <SliderButton
        fontSize="36px"
        direction="right"
        width="100px"
        height="100px"
        position={{ right: "-8%", top: "52%", transform: "translateY(-50%)" }}
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
      />
    </div>
  );
}
Slider.propTypes = {
  slides: PropTypes.array.isRequired,
  wrap: PropTypes.bool,
  type: PropTypes.oneOf(["image", "banner", "half-image", "youtube"]),
  onIndexChange: PropTypes.func,
  externalIndex: PropTypes.number,
};
export default Slider;
