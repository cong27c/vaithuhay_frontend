import Button from "@/components/Button";
import styles from "./Category.module.scss";
import images from "@/assets/images";
import { faArrowRight, faL } from "@fortawesome/free-solid-svg-icons";

function Category({
  haveButton = true,
  columnGap = "40px",
  rowGap = "50px",
  columns = "540px 540px",
  padding = "20px",
  widthImage = "240px",
  heightImage = "240px",
  haveTitle = true,
}) {
  const categories = [
    {
      title: "SẢN PHẨM TRANG TRÍ NHÀ CỬA",
      description:
        "Tổng hợp những sản phẩm công nghệ giúp ngôi nhà của bạn trở thành không gian mang cảm hứng sáng tạo bất tận.",
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/feacoll_1_img_medium.png?v=7251",
    },
    {
      title: "SẢN PHẨM DU LỊCH DÃ NGOẠI",
      description:
        "Những sản phẩm sẽ giúp chuyến du lịch của bạn tiện lợi và dễ dàng hơn rất nhiều.",
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/feacoll_2_img_medium.png?v=7251",
    },
    {
      title: "NID VIETNAM TRANG TRÍ SÁNG TẠO",
      description:
        "NID Vietnam là thương hiệu đèn trang trí sáng tạo cho không gian nhà cửa...",
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/feacoll_3_img_medium.png?v=7251",
    },
    {
      title: "GÓC SETUP BÀN LÀM VIỆC",
      description:
        "Mua Work-From-Home kéo dài mà lại thiếu cảm hứng làm việc? Đây là lúc bạn cần một góc làm việc mới!",
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/feacoll_4_img_medium.png?v=7251",
    },
    {
      title: "PHỤ KIỆN CÔNG NGHỆ MAC",
      description:
        "Trang bị tăng cường cho các thiết bị công nghệ Macbook, Ipad,... để nâng cao hiệu suất làm việc",
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/feacoll_5_img_medium.png?v=7251",
    },
    {
      title: "PHỤ KIỆN THỜI TRANG CÔNG NGHỆ",
      description:
        "Những phụ kiện như balo, túi xách, túi đeo chéo,... vừa tiện dụng, vừa công nghệ và thời trang.",
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/feacoll_6_img_medium.png?v=7251",
    },
    {
      title: "DESIGNNEST",
      description:
        "Các sản phẩm được Vaithuhay phân phối chính hãng từ platform gây quỹ cộng đồng DesignNest với những thiết kế sáng tạo",
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/feacoll_7_img_medium.png?v=7251",
    },
    {
      title: "TIKTOK TRENDING",
      description:
        "GenZ và những ý tưởng hay ho độc lạ và hữu ích cho cuộc sống của bạn. Lướt nhanh và khám phá những thứ lạ hay ho",
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/feacoll_8_img_medium.png?v=7251",
    },
  ];

  return (
    <div className={styles.wrapper}>
      {haveTitle && <h2 className={styles.title}>KHÁM PHÁ</h2>}
      <div
        className={styles["category-grid"]}
        style={{
          gridTemplateColumns: columns,
          columnGap,
          rowGap,
          padding,
        }}
      >
        {categories.map((item, index) => (
          <div key={index} className={`${styles["category-item"]}`}>
            <img
              src={item.image}
              alt={item.title}
              className={styles["category-image"]}
              style={{
                width: widthImage,
                height: heightImage,
              }}
            />
            <div className={styles["category-content"]}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {haveButton && (
                <Button
                  size="small"
                  className={styles.btn}
                  arrowButton
                  icon={faArrowRight}
                >
                  KHÁM PHÁ NGAY
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
