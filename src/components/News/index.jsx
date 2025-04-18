import images from "~/assets/images";
import Slider from "../Slider";
import styles from "./News.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function News({
  title = "Ốp lưng điện thoại EYE Smartcase - Biến iPhone thành Android",
  articles = [],
}) {
  const listItem = [
    {
      image:
        "https://file.hstatic.net/1000069970/article/dien-thoai-man-hinh-e-ink-kingrow-k1__3__d4dd888acc664a3dad23233b127cae59_medium.png",
      desc: "Điện thoại màn hình E-ink Kingrow K1 có chức năng bảo vệ mắt",
    },
    {
      image: "https://file.hstatic.net/1000069970/article/3_medium.jpg",
      desc: "Ốp lưng điện thoại EYE Smartcase - Biến iPhone thành Android",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/e_pad_may_tinh_bang_android_e_ink3_fd92e8450922408dbf9bb7ce83662ad9_medium.jpg",
      desc: "Tính năng thông minh của máy tính bảng màn hình E-Ink E-PAD",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/narwal1_a353728f8eab4e70970f64d9fb75145e_medium.jpg",
      desc: "Review Robot hút bụi lau nhà Narwal đáng mua",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/xit-chong-tham-cho-giay_ff893b7842a7446884327fdcfdfafe0d_medium.jpg",
      desc: "Mách bạn cách bảo quản giày da an toàn và hiệu quả",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/2_3707fe29830f4ea9b47499adb0cdace3_medium.jpg",
      desc: "Lộ diện xúc xắc dạ quang đèn LED chất nhất quả đất",
    },
    {
      image: "https://file.hstatic.net/1000069970/article/sneakers_medium.jpg",
      desc: "Bảo vệ giày dép bằng bọc giày đi mưa cho ngày mưa dễ dàng",
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
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course1,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course4,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course5,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course5,
      variant: "default",
    },
  ];
  let configs = [
    "/news/EYESmartcase",
    "/news/kingrowK1",
    "/news/smartEInkTablet",
    "/news/narwalRobot",
    "/news/rainShoeCover",
    "/news/diceGlowFeature",
    "/news/leatherCareTips",
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>{title}</h1>
        <nav className={styles.breadcrumb}>
          <a href="/">Trang chủ</a>
          <span>/</span>
          <a href="/danh-muc">Danh mục</a>
          <span>/</span>
          <span className={styles.current}>{title}</span>
        </nav>
      </div>
      <div className={styles.bodySection}>
        <div className={styles.bodyLeft}>
          <div
            className={styles.blog}
            dangerouslySetInnerHTML={{ __html: articles[0].desc }}
          />
        </div>
        <div className={styles.bodyRight}>
          <div className={styles.subTitle}>BÀI VIẾT MỚI</div>
          <div className={styles.listItem}>
            {listItem.map((item, index) => (
              <Link key={index} to={configs[index]}>
                <div className={styles.item}>
                  <div className={styles.image}>
                    <img src={item.image} alt="" />
                  </div>
                  <div className={styles.desc}>{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.slider}>
          <div className={styles.sliderTitle}>Sản phẩm phù hợp với bạn</div>
          <Slider slides={slidesData} type="half-image" />
        </div>
      </div>
    </div>
  );
}
News.propTypes = {
  title: PropTypes.string,
  articles: PropTypes.array,
};

export default News;
