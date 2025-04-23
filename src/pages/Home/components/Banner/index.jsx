import Button from "~/components/Button";
import styles from "./Banner.module.scss";
import images from "~/assets/images";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "~/components/Slider";

function Banner() {
  const BannerIn4 = [
    {
      inventory: "7",
      title: "Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER",
      originalPrice: "10,500,000đ",
      cost: "6,930,000đ",
      sale: "-34%",
      image: images.course1,
    },
    {
      inventory: "7",
      title: "Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER",
      originalPrice: "10,500,000đ",
      cost: "6,930,000đ",
      sale: "-34%",
      image: images.course2,
    },
    {
      inventory: "7",
      title: "Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER",
      originalPrice: "10,500,000đ",
      cost: "6,930,000đ",
      sale: "-34%",
      image: images.course4,
    },
    {
      inventory: "7",
      title: "Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER",
      originalPrice: "10,500,000đ",
      cost: "6,930,000đ",
      sale: "-34%",
      image: images.course3,
    },
    {
      inventory: "7",
      title: "Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER",
      originalPrice: "10,500,000đ",
      cost: "6,930,000đ",
      sale: "-34%",
      image: images.course5,
    },
    {
      inventory: "7",
      title: "Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER",
      originalPrice: "10,500,000đ",
      cost: "6,930,000đ",
      sale: "-34%",
      image: images.course3,
    },
    {
      inventory: "7",
      title: "Bàn nâng hạ tự động Ergonomic Desk 9SPACE GỖ VENEER",
      originalPrice: "10,500,000đ",
      cost: "6,930,000đ",
      sale: "-34%",
      image: images.course2,
    },
  ];

  return (
    <>
      <div className={styles["banner-events"]}>
        <div className={styles.backGround}>
          <div className={styles["banner-up"]}>
            <h2 className={styles.title}>
              <i className="fas fa-bolt" style={{ color: "yellow" }}></i> Tháng
              3 ấm áp, trọn vẹn nghĩa tình
            </h2>
          </div>

          <Button
            discoverButton
            className={styles.btnMore}
            icon={faArrowRight}
            size="large"
          >
            XEM THÊM NGAY
          </Button>
          <div className={styles.countdown}>
            <p className={styles.desc}>Deal này sắp hết thời gian</p>
            <div className={styles["list-item"]}>
              <div className={styles["countdown-item"]}>
                <span className={styles.number}>10</span>
                <span className={styles.label}>ngày</span>
              </div>
              <div className={styles.separator}>:</div>
              <div className={styles["countdown-item"]}>
                <span className={styles.number}>00</span>
                <span className={styles.label}>giờ</span>
              </div>
              <div className={styles.separator}>:</div>
              <div className={styles["countdown-item"]}>
                <span className={styles.number}>27</span>
                <span className={styles.label}>phút</span>
              </div>
              <div className={styles.separator}>:</div>
              <div className={styles["countdown-item"]}>
                <span className={styles.number}>05</span>
                <span className={styles.label}>giây</span>
              </div>
            </div>
          </div>
          <div className={styles["banner-down"]}>
            <div className={styles["list-card"]}>
              <Slider slides={BannerIn4} type="banner" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
