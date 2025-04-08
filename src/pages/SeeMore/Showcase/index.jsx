import Button from "~/components/Button";
import styles from "./Showcase.module.scss";
import { Children } from "react";
import {
  faArrowDown,
  faArrowRight,
  faArrowUp,
  faCalendarDays,
  faCartShopping,
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "~/components/Slider";
import images from "~/assets/images";
import Pagination from "~/components/Pagination";
import SlideImageAlternative from "~/pages/Home/components/SlideImage/SlideImageAlternative";
import Youtube from "~/pages/Home/components/Youtube";

function Showcase() {
  const nameButton = [
    { Children: "#VàiThứHay" },
    { Children: "#NORESTOCK" },
    { Children: "#ShopeeMall" },
    { Children: "#LazMall" },
    { Children: "#Tiki" },
    { Children: "#Pre-order" },
    { Children: "#SảnPhẩmHOT" },
    { Children: "#SetupDecor" },
    { Children: "#ĐènRGB" },
    { Children: "#LoaLạLạ" },
  ];

  const deals = [
    {
      title: "DELA KHAI VÍ",
      desc: "Giảm chồng 100K cho đơn có 1 sản phẩm Pre-order",
    },
    {
      title: "DELA ĐẬM ĐÀ",
      desc: "Giảm 200K cho đơn 2 sản phẩm Pre-order",
    },
    {
      title: "DELA TẤT TỊ GOM TẤT THẨY",
      desc: "Giảm 350K cho đơn 3 sản phẩm Pre-order",
    },
  ];

  const tags = [
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_2.png?v=7171",
      title: "SetUp Góc Làm việc",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_1.png?v=7171",
      title: "Bàn phím hay",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_3.png?v=7171",
      title: "Du Lịch Dã Ngoại",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_4.png?v=7171",
      title: "Loa - Tai Nghe",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_5.png?v=7171",
      title: "Sản phẩm độc đáo nhất",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_6.png?v=7171",
      title: "Sản phẩm HOT",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_7.png?v=7171",
      title: "Sản phẩm DIY Steampunk",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_8.png?v=7171",
      title: "Đèn tràn trí NID LIGHT",
    },
  ];

  const sortList = [
    { icon: faSortAlphaDown, desc: "Từ A-Z" },
    { icon: faSortAlphaUp, desc: "Từ Z-A" },
    { icon: faCalendarDays, desc: "Mới nhất" },
    { icon: faCartShopping, desc: "Bán chạy" },
    { icon: faArrowUp, desc: "Giá tăng" },
    { icon: faArrowDown, desc: "Giá giảm" },
  ];

  const slidesData = [
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course2,
      show: true,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course1,
      show: true,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course4,
      show: true,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course5,
      show: true,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course5,
      show: true,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course2,
      show: true,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course1,
      show: true,
      variant: "default",
    },
    {
      title: `9SPACE - Ghế công thái học Ergonomic Chair 9S4 - Phiên bản mới nhất 2023`,
      date: "Chiến dịch kết thúc: 12/04/2025",
      desc: `Thương hiệu: 9Space 9Space là thương hiệu chuyên về decor, setup, mang lại không gian sáng tạo, nâng cao hiệu quả công việc đồng thời cũng đảm bảo sức khỏe cho`,
      sale: "15,515,000₫",
      cost: "18,515,000₫",
      image: images.course2,
      show: true,
      variant: "default",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerBanner}></div>
      <div className={styles.body}>
        <nav className={styles.breadcrumb}>
          <a href="/">Trang chủ</a>
          <span>/</span>
          <a href="/danh-muc">Danh mục</a>
          <span>/</span>
          <span className={styles.current}>HÀNG CLEARANCE | NO RESTOCK</span>
        </nav>
        <div className={styles.promIn4}>
          <div className={styles.sectionIntro}>
            <div className={styles.title}>
              Sản phẩm khuyến mãi, đang giảm giá cực sốc cùng ưu đãi khủng
            </div>
            <div className={styles.desc}>
              Luôn cập nhật những sale off và khuyến mãi khủng nhất gửi tới
              khách hàng, nơi tìm thấy những sản phẩm khuyến mãi nhanh nhất tại
              vaithuhay.com
            </div>
          </div>
          <div className={styles.lisbtn}>
            {nameButton.map((item) => (
              <Button key={item.Children} tabButton className={styles.btn}>
                {item.Children}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles.promDeal}>
          {deals.map((item) => (
            <div key={item.desc} className={styles["deal-container"]}>
              <div className={styles["deal-title"]}>{item.title}</div>
              <div className={styles["deal-content"]}>{item.desc}</div>
              <button className={styles["save-button"]}>LƯU MÃ</button>
            </div>
          ))}
        </div>
        <div className={styles.categoryNav}>
          <div className={styles.top}>
            <div className={styles.title}>Khám phá các danh mục khác:</div>
            <div>
              <Button
                discoverButton
                icon={faArrowRight}
                className={styles.btnIcon}
              >
                XEM THÊM
              </Button>
            </div>
          </div>
          <div className={styles.mid}>
            <div className={styles["product-tags"]}>
              {tags.map((item) => (
                <div key={item.title} className={styles["tag-item"]}>
                  <div className={styles.box}>
                    <div className={styles.image}>
                      <img src={item.image} alt="" />
                    </div>
                    <div className={styles.title}>{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.bot}>
            <div className={styles.desc}>Sắp xếp theo:</div>
            <div className={styles.sortList}>
              {sortList.map((item) => (
                <div key={item.icon} className={styles.sortItem}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <span>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.box1}>
          <Slider slides={slidesData} type="half-image" wrap={true} />
          <div className={styles.background}></div>
        </div>
        <div className={styles.box2}>
          <Slider slides={slidesData} type="half-image" wrap={true} />
          <div className={styles.background}></div>
        </div>
      </div>

      <Pagination
        size={60}
        fontSize={28}
        gap={15}
        prevNextWidth="80px"
        prevNextPadding="0 10px"
      />
      <SlideImageAlternative />
      <div className={styles.youtube}>
        <Youtube />
      </div>
    </div>
  );
}

export default Showcase;
