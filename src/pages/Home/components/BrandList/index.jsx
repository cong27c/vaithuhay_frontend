import Button from "@/components/Button";
import styles from "./BrandList.module.scss";
import images from "@/assets/images";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const brandList = [
  {
    image: images.course5,
    brandName: "Thương hiệu Gravastar",
    field: "Công nghê mới",
    wasBorn: "Tháng 10.2021",
    story:
      "Gravastar thương hiệu mang đến trải nghiệm nghe nhìn ấn tượng qua từng sản phẩm. Không đơn thuần là các thiết bị công nghệ mà còn là một tác phẩm nghệ thuật",
  },
  {
    image: images.course5,
    brandName: "Thương hiệu Gravastar",
    field: "Công nghê mới",
    wasBorn: "Tháng 10.2021",
    story:
      "Gravastar thương hiệu mang đến trải nghiệm nghe nhìn ấn tượng qua từng sản phẩm. Không đơn thuần là các thiết bị công nghệ mà còn là một tác phẩm nghệ thuật",
  },
  {
    image: images.course5,
    brandName: "Thương hiệu Gravastar",
    field: "Công nghê mới",
    wasBorn: "Tháng 10.2021",
    story:
      "Gravastar thương hiệu mang đến trải nghiệm nghe nhìn ấn tượng qua từng sản phẩm. Không đơn thuần là các thiết bị công nghệ mà còn là một tác phẩm nghệ thuật",
  },
  {
    image: images.course5,
    brandName: "Thương hiệu Gravastar",
    field: "Công nghê mới",
    wasBorn: "Tháng 10.2021",
    story:
      "Gravastar thương hiệu mang đến trải nghiệm nghe nhìn ấn tượng qua từng sản phẩm. Không đơn thuần là các thiết bị công nghệ mà còn là một tác phẩm nghệ thuật",
  },
  {
    image: images.course5,
    brandName: "Thương hiệu Gravastar",
    field: "Công nghê mới",
    wasBorn: "Tháng 10.2021",
    story:
      "Gravastar thương hiệu mang đến trải nghiệm nghe nhìn ấn tượng qua từng sản phẩm. Không đơn thuần là các thiết bị công nghệ mà còn là một tác phẩm nghệ thuật",
  },
  {
    image: images.course5,
    brandName: "Thương hiệu Gravastar",
    field: "Công nghê mới",
    wasBorn: "Tháng 10.2021",
    story:
      "Gravastar thương hiệu mang đến trải nghiệm nghe nhìn ấn tượng qua từng sản phẩm. Không đơn thuần là các thiết bị công nghệ mà còn là một tác phẩm nghệ thuật",
  },
];
function BrandList() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>THƯƠNG HIỆU HAY TẠI VAITHUHAY</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        grabCursor={true}
        className={styles.listBrand}
        breakpoints={{
          340: { slidesPerView: 1 },
          680: { slidesPerView: 2 },
          1020: { slidesPerView: 3 },
          1360: { slidesPerView: 4 },
        }}
      >
        {brandList.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.brand}>
              <div className={styles.image}>
                <img src={item.image} alt="" />
                <div className={styles.name}>{item.brandName}</div>
              </div>
              <div className={styles.content}>
                <div className={styles.field}>
                  <strong>Lĩnh vực:</strong> {item.field}
                </div>
                <div className={styles.born}>
                  <strong>Ra đời:</strong> {item.wasBorn}
                </div>
                <div className={styles.story}>
                  <strong>Câu chuyện thương hiệu</strong> {item.story}
                </div>
              </div>
              <div className={styles.button}>
                <Button className={styles.btn} tabButton>
                  Câu chuyện phía sau
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BrandList;
