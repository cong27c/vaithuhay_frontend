import styles from "./Category.module.scss";
import images from "~/assets/images";

function Category() {
  const categories = [
    {
      title: "SẢN PHẨM TRANG TRÍ NHÀ CỬA",
      description:
        "Tổng hợp những sản phẩm công nghệ giúp ngôi nhà của bạn trở thành không gian mang cảm hứng sáng tạo bất tận.",
      image: images.course4,
    },
    {
      title: "SẢN PHẨM DU LỊCH DÃ NGOẠI",
      description:
        "Những sản phẩm sẽ giúp chuyến du lịch của bạn tiện lợi và dễ dàng hơn rất nhiều.",
      image: images.course4,
    },
    {
      title: "NID VIETNAM TRANG TRÍ SÁNG TẠO",
      description:
        "NID Vietnam là thương hiệu đèn trang trí sáng tạo cho không gian nhà cửa...",
      image: images.course4,
    },
    {
      title: "GÓC SETUP BÀN LÀM VIỆC",
      description:
        "Mua Work-From-Home kéo dài mà lại thiếu cảm hứng làm việc? Đây là lúc bạn cần một góc làm việc mới!",
      image: images.course4,
    },
    {
      title: "PHỤ KIỆN CÔNG NGHỆ MAC",
      description:
        "Trang bị tăng cường cho các thiết bị công nghệ Macbook, Ipad,... để nâng cao hiệu suất làm việc",
      image: images.course4,
    },
    {
      title: "PHỤ KIỆN THỜI TRANG CÔNG NGHỆ",
      description:
        "Những phụ kiện như balo, túi xách, túi đeo chéo,... vừa tiện dụng, vừa công nghệ và thời trang.",
      image: images.course4,
    },
    {
      title: "DESIGNNEST",
      description:
        "Các sản phẩm được Vaithuhay phân phối chính hãng từ platform gây quỹ cộng đồng DesignNest với những thiết kế sáng tạo",
      image: images.course4,
    },
    {
      title: "TIKTOK TRENDING",
      description:
        "GenZ và những ý tưởng hay ho độc lạ và hữu ích cho cuộc sống của bạn. Lướt nhanh và khám phá những thứ lạ hay ho",
      image: images.course4,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>KHÁM PHÁ</h2>
      <div className={styles["category-grid"]}>
        {categories.map((item, index) => (
          <div key={index} className={`${styles["category-item"]}`}>
            <img
              src={item.image}
              alt={item.title}
              className={styles["category-image"]}
            />
            <div className={styles["category-content"]}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button className={styles["btn-explore"]}>
                KHÁM PHÁ THÊM <span className={styles["icon-arrow"]}>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
