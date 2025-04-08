import images from "~/assets/images";
import styles from "./SlideImageAlternative.module.scss";
import Slider from "~/components/Slider";
import Button from "~/components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function SlideImageAlternative() {
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
  ];

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
          <Slider slides={slidesData} type="image" wrap={true} />
        </div>
        <div className={styles.dotList}>
          <div className={`${styles.dot} ${styles.active}`}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
}

export default SlideImageAlternative;
