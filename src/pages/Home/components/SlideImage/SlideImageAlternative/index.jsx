import images from "@/assets/images";
import styles from "./SlideImageAlternative.module.scss";
import Slider from "@/components/Slider";
import Button from "@/components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductsSetup from "@/pages/ProductsSetup";
import DotList from "@/components/DotList/inddex";
import { useDispatch, useSelector } from "react-redux";
import { goToSlide } from "@/features/slider/sliderSlice";
import { useState } from "react";
const slidesData = [
  {
    image: images.course4,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course1,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course2,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course3,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course5,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course1,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course2,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course3,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course4,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course1,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course2,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course3,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course5,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course1,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course2,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course3,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course4,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course1,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course2,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course3,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course5,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course1,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course2,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course3,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course4,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course1,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course2,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course3,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course5,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course1,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course2,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course3,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course4,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course1,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course2,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course3,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course5,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course1,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course2,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
  {
    image: images.course3,
    variant: "alternative",
    nameBtn: ["Đèn thanh", "Kệ màn hình", "Đồng hồ", "đồ ngủ", "..."],
  },
];
function SlideImageAlternative() {
  // const dispatch = useDispatch();
  // const nameSlider = "SlideImageAlternative";
  // const currentIndex = useSelector(
  //   (state) => state.slider.sliders[nameSlider].currentIndex
  // );

  // const handleGoToSlide = (index) => {
  //   dispatch(goToSlide({ sliderId: nameSlider, index }));
  // };

  const totalGroups = Math.ceil(slidesData.length / 8);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGoToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["Slider-2"]}>
        <div className={styles["slider2-header"]}>
          <h2 className={styles.title}>COMBO GÓC LÀM VIỆC</h2>
          <Button discoverButton icon={faArrowRight}>
            Khám phá ngay
          </Button>
        </div>
        <div className={styles["list-card"]}>
          <ProductsSetup>
            <Slider
              slides={slidesData}
              type="image"
              wrap={true}
              name="SlideImageAlternative"
              externalIndex={currentIndex}
              onIndexChange={setCurrentIndex}
            />
          </ProductsSetup>
        </div>
        <DotList
          total={totalGroups}
          activeIndex={currentIndex}
          size={12}
          onDotClick={handleGoToSlide}
        />
      </div>
    </div>
  );
}

export default SlideImageAlternative;
