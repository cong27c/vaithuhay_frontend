import Slider from "@/components/Slider";
import styles from "./ProductSlider.module.scss";
import images from "@/assets/images";

function ProductSlider() {
  const in4 = [
    {
      image: images.course4,
      price: "2,964,000",
      desc: "  (DUY LUÂN DỄ THƯƠNG) ĐÁNH GIÁ BÀN PHÍM LOFREE FLOW",
    },
    {
      image: images.course4,
      price: "2,964,000",
      desc: "  (DUY LUÂN DỄ THƯƠNG) ĐÁNH GIÁ BÀN PHÍM LOFREE FLOW",
    },
    {
      image: images.course4,
      price: "2,964,000",
      desc: "  (DUY LUÂN DỄ THƯƠNG) ĐÁNH GIÁ BÀN PHÍM LOFREE FLOW",
    },
  ];

  const slidesData = [
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course2,
      variant: "default",
      order: true,
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course1,
      variant: "default",
      order: true,
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course4,
      variant: "default",
      order: true,
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course5,
      variant: "default",
      order: true,
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course5,
      variant: "default",
      order: true,
    },
  ];
  return (
    <>
      <div className={styles.sliderYtb}>
        <div className={styles.title}>CÙNG XEM REVIEW SẢN PHẨM</div>
        <Slider slides={in4} type="youtube" />
      </div>
      <div className={styles.relatedProducts}>
        <div className={styles.title}>SẢN PHẨM LIÊN QUAN</div>
        <Slider type="half-image" slides={slidesData} />
      </div>
    </>
  );
}

export default ProductSlider;
