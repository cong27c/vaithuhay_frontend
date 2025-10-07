import Button from "@/components/Button";
import styles from "./Showcase.module.scss";
import { Children, useEffect, useState } from "react";
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
import Slider from "@/components/Slider";
import images from "@/assets/images";
import Pagination from "@/components/Pagination";
import SlideImageAlternative from "@/pages/Home/components/SlideImage/SlideImageAlternative";
import Youtube from "@/pages/Home/components/Youtube";
import CollectionTab from "./CollectionTab";
import { getProductsByCollectionSlug } from "@/Services/collectionService";
import { useParams, useSearchParams } from "react-router-dom";

function Collections() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const sort = searchParams.get("sort") || null;

  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 16;

  const itemsPerBox = 8;
  const box1Products = products.slice(0, itemsPerBox);
  const box2Products = products.slice(itemsPerBox, itemsPerBox * 2);

  const collectionTab = [
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
      link: "/collections/setup-goc-lam-viec",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_1.png?v=7171",
      title: "Bàn phím hay",
      link: "/collections/ban-phim-hay",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_3.png?v=7171",
      title: "Du Lịch Dã Ngoại",
      link: "/collections/flash-sale-san-pham-hot",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_4.png?v=7171",
      title: "Loa - Tai Nghe",
      link: "/collections/cyberpunk-collection-phu-kien-scifi",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_5.png?v=7171",
      title: "Sản phẩm độc đáo nhất",
      link: "/collections/san-pham-moi-la-nhat-hien-tai",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_6.png?v=7171",
      title: "Sản phẩm HOT",
      link: "/collections/cong-nghe-tien-ich-co-san",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_7.png?v=7171",
      title: "Sản phẩm DIY Steampunk",
      link: "/collections/san-pham-cong-nghe-diy-lap-rap-dac-biet",
    },
    {
      image:
        "https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_8.png?v=7171",
      title: "Đèn tràn trí NID LIGHT",
      link: "/collections/nid-light",
    },
  ];
  const sortList = [
    { icon: faSortAlphaDown, desc: "Từ A-Z", key: "az" },
    { icon: faSortAlphaUp, desc: "Từ Z-A", key: "za" },
    { icon: faCalendarDays, desc: "Mới nhất", key: "newest" },
    { icon: faCartShopping, desc: "Bán chạy", key: "bestseller" },
    { icon: faArrowUp, desc: "Giá tăng", key: "price_asc" },
    { icon: faArrowDown, desc: "Giá giảm", key: "price_desc" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductsByCollectionSlug(
        slug,
        currentPage,
        postsPerPage,
        sort,
      );
      setProducts(data.products);
      setTotalPages(data.totalCount);
    };
    fetchData();
  }, [currentPage, slug, sort]);
  console.log(products);

  const handleSortClick = (key) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    // toggle: nếu đang cùng key thì remove sort
    if (params.get("sort") === key) {
      params.delete("sort");
    } else {
      params.set("sort", key);
    }

    setSearchParams(params);
  };

  // render sort buttons
  const renderSortItems = () =>
    sortList.map((item) => {
      const active = sort === item.key;
      return (
        <div
          key={item.key}
          role="button"
          tabIndex={0}
          onClick={() => handleSortClick(item.key)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleSortClick(item.key);
          }}
          className={`${styles.sortItem} ${active ? styles.sortItemActive : ""}`}
        >
          <div className={styles.icon}>
            <FontAwesomeIcon icon={item.icon} />
          </div>
          <span>{item.desc}</span>
        </div>
      );
    });
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
          <CollectionTab collectionTab={collectionTab} />
        </div>
        <div className={styles.promDeal}>
          {deals.map((item, index) => (
            <div key={index} className={styles["deal-container"]}>
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
              {tags.map((item, index) => (
                <a key={index} href={item.link}>
                  <div className={styles["tag-item"]}>
                    <div className={styles.box}>
                      <div className={styles.image}>
                        <img src={item.image} alt="" />
                      </div>
                      <div className={styles.title}>{item.title}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className={styles.bot}>
            <div className={styles.desc}>Sắp xếp theo:</div>
            <div className={styles.sortList}>{renderSortItems()}</div>
          </div>
        </div>
      </div>

      {box1Products.length > 0 && (
        <div className={styles.container}>
          <div className={styles.box1}>
            <Slider slides={box1Products} type="half-image" wrap={true} />
            <div className={styles.background}></div>
          </div>
          {box2Products.length > 0 && (
            <div className={styles.box2}>
              <Slider slides={box2Products} type="half-image" wrap={true} />
              <div className={styles.background}></div>
            </div>
          )}
        </div>
      )}

      <Pagination
        size={60}
        fontSize={28}
        gap={15}
        prevNextWidth="80px"
        prevNextPadding="0 10px"
        currentPage={currentPage}
        totalItems={totalPages}
        itemsPerPage={postsPerPage}
        onPageChange={(page) => {
          setSearchParams({ page });
        }}
      />
      <SlideImageAlternative />
      <div className={styles.youtube}>
        <Youtube />
      </div>
    </div>
  );
}

export default Collections;
