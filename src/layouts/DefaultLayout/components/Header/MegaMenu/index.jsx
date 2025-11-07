import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MegaMenu.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "swiper/css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogsByType } from "@/Services/blogService";
const navThemeList = [
  {
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/hd_category_icon_first_small.png?v=7187",
    desc: "Tất cả sản phẩm",
  },
  {
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/hd_category_icon_1_small.png?v=7187",
    desc: "Sản phẩm khuyến mãi",
  },
  {
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/hd_category_icon_2_small.png?v=7187",
    desc: "Sản phẩm mới",
  },
  {
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/hd_category_icon_3_small.png?v=7187",
    desc: "Các chiến dịch đặt hàng trước PRE-ORDER",
  },
];
const themeImageList = [
  {
    image:
      "https://file.hstatic.net/1000069970/collection/son09582_a184e45a54ee475d9fc51fc424d0de0e_large.jpg",
    subTitle: "SET UP KHÔNG GIAN GÓC LÀM VIỆC",
    link: "/collections/setup-goc-lam-viec",
  },
  {
    image:
      "https://file.hstatic.net/1000069970/collection/20250306-112115_d62474abc48941e4b1f7fa489d402a72_large.jpg",
    subTitle: "Tháng 4 rực rỡ, săn sale cực phê",
    link: "/collections/setup-goc-lam-viec",
  },

  {
    image:
      "https://file.hstatic.net/1000069970/collection/vth-050_f0657890f9234e798f6f8bb8f0f1a38f_large.jpg",
    subTitle: "Sản phẩm độc đáo nhất trên thị trường",
    link: "/collections/san-pham-moi-la-nhat-hien-tai",
  },
  {
    image:
      "https://file.hstatic.net/1000069970/collection/white2_8c5962d90a9049cfbd10513344994245_large.png",
    subTitle: "Sản phẩm DIY Steampunk",
    link: "/collections/san-pham-cong-nghe-diy-lap-rap-dac-biet",
  },
  {
    image:
      "https://file.hstatic.net/1000069970/collection/thiet_ke_chua_co_ten__2__1b49337d200946d08ee2993045bbb203_large.png",
    subTitle: "BÀN PHÍM HAY",
    link: "/collections/ban-phim-hay",
  },
  {
    image:
      "https://file.hstatic.net/1000069970/collection/gravastar_collection_af12333a90a34df0b3f30914520f092b_large.png",
    subTitle: "Collection Gravastar -Những chiến binh không gian",
    link: "/collections/san-pham-cong-nghe-diy-lap-rap-dac-biet",
  },
  {
    image:
      "https://file.hstatic.net/1000069970/collection/thumbnail_coll_d53a1858e61c4e0a9179e16564c755d4_large.jpg",
    subTitle: "Sản phẩm HOT",
    link: "/collections/cong-nghe-tien-ich-co-san",
  },
  {
    image:
      "https://file.hstatic.net/1000069970/collection/4_copy_4eca127c007e48de8a7ab3bbd1c4754a_large.jpg",
    subTitle: "Đèn trang trí NID Light",
    link: "/collections/nid-light",
  },
];

function MegaMenu() {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const result = await getBlogsByType("setup-decor", 1, 4);
        console.log(result);
        const blogsData = result.blogs || result.data || [];

        const processedFeaturedBlogs = blogsData?.map((blog, index) => ({
          id: blog.id || `featured-${index}`,
          desc: blog.title || "Không có tiêu đề",
          author: blog.author || "Jaithubay.com",
          date: blog.created_at || "01.01.2024",
          image: blog.thumbnail || "",
          slug: blog.slug || blog.id,
          ...blog,
        }));

        console.log(processedFeaturedBlogs);

        setFeaturedBlogs(processedFeaturedBlogs);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      }
    };

    fetchFeaturedBlogs();
  }, []);
  return (
    <div className={styles.megaMenuContent}>
      <h2>KHÁM PHÁ THEO CHỦ ĐỀ</h2>
      <section className={styles["theme-explore"]}>
        {/* <div className={styles["theme-navigation"]}>
          {navThemeList?.map((item, index) => (
            <div key={index} className={styles.navBox}>
              <div className={styles.image}>
                <img src={item.image} alt="" />
              </div>
              <span>{item.desc}</span>
            </div>
          ))}
        </div> */}
        <div className={styles["theme-list"]}>
          {themeImageList?.map((item, index) => (
            <div key={index} className={styles["theme-item"]}>
              <Link to={item.link} target="_blank" rel="noopener noreferrer">
                <div className={styles.image}>
                  <img src={item.image} alt={item.subTitle} />
                </div>
              </Link>

              <div className={styles.subTitle}>{item.subTitle}</div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.foundation}>
        <div className={styles.line}></div>
        <div className={styles.btnList}>
          <a
            href={"https://www.lazada.vn/shop/vaithuhay-store"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.image}>
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/hd_category_sale_icon_3_grande.png?v=7187"
                alt=""
              />
            </div>
          </a>
          <a
            href={
              "https://shopee.vn/vaithuhay_officialstore?uls_trackid=544l6gud004t&utm_campaign=-&utm_content=----&utm_medium=affiliates&utm_source=an_17085490027&utm_term=dxa1v82ro86s&v4=1"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.image}>
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/hd_category_sale_icon_1_grande.png?v=7187"
                alt=""
              />
            </div>
          </a>
        </div>
        <div className={styles.line}></div>
      </section>
      <section className={styles.slide}>
        <div className={styles.in4}>
          <div className={styles.title}>GÓC VAITHUHAY</div>
          <Link to={"/blogs/setup-decor"}>
            <div className={styles.desc}>
              Xem tất cả
              <span>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </div>
          </Link>
        </div>
        <Swiper
          spaceBetween={40}
          slidesPerView={4}
          grabCursor={true}
          className={styles.listItem}
          breakpoints={{
            260: { slidesPerView: 1 },
            520: { slidesPerView: 2 },
            780: { slidesPerView: 3 },
            1080: { slidesPerView: 4 },
          }}
        >
          {featuredBlogs?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.item}>
                <img src={item.image} alt="" />
                <div className={styles.content}>
                  <div className={styles.desc}>{item.desc}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

export default MegaMenu;
