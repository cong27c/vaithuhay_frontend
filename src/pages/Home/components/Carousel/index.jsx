import styles from "./Carousel.module.scss";
import images from "@/assets/images";
import Button from "@/components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CountDown from "@/components/CountDown";
import { SliderButton } from "@/components/SliderControls";
import { useState } from "react";
import clsx from "clsx";

const slides = [
  {
    image: images.course1,
    title:
      "Màn Hình Rời Đa Năng SOTSU FlipAction – Tối Ưu Không Gian Làm Việc Di Động",
    date: "26/03/2025",
  },
  {
    image: images.course2,
    title: "Sản phẩm 2 – Hiệu suất cao trong thiết kế hiện đại",
    date: "26/03/2025",
  },
  {
    image: images.course3,
    title: "Sản phẩm 3 – Trải nghiệm công nghệ thông minh",
    date: "26/03/2025",
  },
  {
    image: images.course1,
    title:
      "Màn Hình Rời Đa Năng SOTSU FlipAction – Tối Ưu Không Gian Làm Việc Di Động",
    date: "26/03/2025",
  },
  {
    image: images.course2,
    title: "Sản phẩm 2 – Hiệu suất cao trong thiết kế hiện đại",
    date: "26/03/2025",
  },
  {
    image: images.course3,
    title: "Sản phẩm 3 – Trải nghiệm công nghệ thông minh",
    date: "26/03/2025",
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const ITEM_WIDTH = 336 + 85;
  const VISIBLE_ITEMS = 3;

  const maxIndex = Math.max(0, slides.length - VISIBLE_ITEMS);
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev + (maxIndex - 1)) % maxIndex);
  };

  const handleNext = () => {
    setCurrentIndex((next) => (next + 1) % maxIndex);
  };

  return (
    <>
      <div className={styles["carousel-container"]}>
        <div className={styles["head-carousel"]}>
          <h2 className={styles.title}>
            CHỌN LỰA SẢN PHẨM MỞ BÁN
            <span>
              <i className="fa-solid fa-rocket"></i>
            </span>
          </h2>
          <Button discoverButton className={styles.btn} icon={faArrowRight}>
            Khám phá ngay
          </Button>
        </div>
        <div className={styles["body-carousel"]}>
          <SliderButton
            fontSize="36px"
            direction="left"
            width="100px"
            height="100px"
            position={{
              left: "0%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={handlePrev}
          />{" "}
          <div
            className={styles["list-item"]}
            style={{
              transform: `translateX(-${currentIndex * ITEM_WIDTH}px)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {slides.map((item, index) => (
              <div
                key={index}
                className={clsx(
                  styles.item,
                  currentIndex + 1 === index ? styles.active : "",
                )}
              >
                <img src={item.image} alt="" />
                <div className={styles.in4}>
                  <h3 className={styles["title-carousel"]}>{item.title}</h3>
                  <div className={styles.notification}>
                    <i className="fa-regular fa-calendar"></i>
                    Dự kiến ra mắt
                  </div>
                  <div className={styles.title}>0 giờ sáng</div>
                  <div className={styles.date}>{item.date}</div>
                  <CountDown
                    targetDate={new Date("2025-05-01T23:59:59")}
                    type="default"
                  />
                  <button className={styles["btn-register"]}>
                    Đăng ký đặt trước
                  </button>
                </div>
              </div>
            ))}
          </div>
          <SliderButton
            fontSize="36px"
            direction="right"
            width="100px"
            height="100px"
            position={{
              right: "-0%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            onClick={handleNext}
          />{" "}
        </div>
      </div>
    </>
  );
}

export default Carousel;
