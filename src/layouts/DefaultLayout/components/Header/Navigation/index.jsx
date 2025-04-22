import Accordion from "~/components/Accordion/Accordion";
import styles from "./Navigation.module.scss";
import AccordionItem from "~/components/Accordion/AccordionItem";
import MegaMenu from "../MegaMenu";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ArticleList from "~/components/ArticleList";
import { Link } from "react-router-dom";
import config from "~/config";

function Navigation() {
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
    },
    {
      image:
        "https://file.hstatic.net/1000069970/collection/20250306-112115_d62474abc48941e4b1f7fa489d402a72_large.jpg",
      subTitle: "Tháng 4 rực rỡ, săn sale cực phê",
    },

    {
      image:
        "https://file.hstatic.net/1000069970/collection/vth-050_f0657890f9234e798f6f8bb8f0f1a38f_large.jpg",
      subTitle: "Sản phẩm độc đáo nhất trên thị trường",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/collection/white2_8c5962d90a9049cfbd10513344994245_large.png",
      subTitle: "Sản phẩm DIY Steampunk",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/collection/thiet_ke_chua_co_ten__2__1b49337d200946d08ee2993045bbb203_large.png",
      subTitle: "BÀN PHÍM HAY",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/collection/gravastar_collection_af12333a90a34df0b3f30914520f092b_large.png",
      subTitle: "Collection Gravastar -Những chiến binh không gian",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/collection/thumbnail_coll_d53a1858e61c4e0a9179e16564c755d4_large.jpg",
      subTitle: "Sản phẩm HOT",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/collection/4_copy_4eca127c007e48de8a7ab3bbd1c4754a_large.jpg",
      subTitle: "Đèn trang trí NID Light",
    },
  ];
  const slideImageList = [
    {
      image:
        "https://file.hstatic.net/1000069970/article/pre-order-la-gi-moi-dieu-can-biet-ve-pre-order_b22ae22812ed4333bb07146c5f156217.jpg",
      desc: "Pre order là gì? Mọi điều cần biết về pre order",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/bi-kip-live-stream-ban-hang_4fa4513f3d96436f859a495e2bc312cb.png",
      desc: "Cách livestream bán hàng của dân chuyên",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/5-mau-dong-ho-de-ban-giup-tang-cam-hung-sang-tao_f0c31564117b4b86832a68ec65f31a09.jpg",
      desc: "5 mẫu đồng hồ để bàn sáng tạo giúp tăng cảm hứng làm việc",
    },
    {
      image:
        "https://file.hstatic.net/1000069970/article/tong-hop-nhung-bo-ban-phim-chuot-phai-chang-danh-cho-design_69d2459670874f238d1c555f8310024f.jpg",
      desc: "Tổng hợp những bộ bàn phím và chuột giá phải chăng dành cho designer",
    },
  ];

  return (
    <>
      <nav className={styles.wrapper}>
        <Accordion defaultIndex={-1} collapseOthers={false} trigger="hover">
          <AccordionItem header="Trang chủ" />
          <AccordionItem header="Khám phá" isMegaMenu={true}>
            <div className={styles.megaMenuContent}>
              <h2>KHÁM PHÁ THEO CHỦ ĐỀ</h2>
              <section className={styles["theme-explore"]}>
                <div className={styles["theme-navigation"]}>
                  {navThemeList.map((item, index) => (
                    <div key={index} className={styles.navBox}>
                      <div className={styles.image}>
                        <img src={item.image} alt="" />
                      </div>
                      <span>{item.desc}</span>
                    </div>
                  ))}
                </div>
                <div className={styles["theme-list"]}>
                  {themeImageList.map((item, index) => (
                    <div key={index} className={styles["theme-item"]}>
                      <div className={styles.image}>
                        <img src={item.image} alt={item.subTitle} />
                      </div>
                      <div className={styles.subTitle}>{item.subTitle}</div>
                    </div>
                  ))}
                </div>
              </section>
              <section className={styles.foundation}>
                <div className={styles.line}></div>
                <div className={styles.btnList}>
                  <div className={styles.image}>
                    <img
                      src="https://theme.hstatic.net/1000069970/1001119059/14/hd_category_sale_icon_1_grande.png?v=7187"
                      alt=""
                    />
                  </div>
                  <div className={styles.image}>
                    <img
                      src="https://theme.hstatic.net/1000069970/1001119059/14/hd_category_sale_icon_3_grande.png?v=7187"
                      alt=""
                    />
                  </div>
                </div>
                <div className={styles.line}></div>
              </section>
              <section className={styles.slide}>
                <div className={styles.in4}>
                  <div className={styles.title}>GÓC VAITHUHAY</div>
                  <div className={styles.desc}>
                    Xem tất cả{" "}
                    <span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </div>
                </div>
                <div className={styles.listItem}>
                  {slideImageList.map((item, index) => (
                    <div key={index} className={styles.item}>
                      <img src={item.image} alt="" />
                      <div className={styles.content}>
                        <div className={styles.desc}>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Vitae, repellendus temporibus accusamus non
                          harum asperiores?
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </AccordionItem>
          <AccordionItem header="Tìm hiểu thêm">
            <ul className={styles.dropdown}>
              <a href="/seeMore/introduce">
                <li>Về VaiThuHay</li>
              </a>
              <a href="/seeMore/affiliate">
                <li>Bán hàng liên kết (Affiliate)</li>
              </a>
              <a href="/recruitment">
                <li>Tìm đồng đội - Tuyển dụng</li>
              </a>
              <a href="/seeMore/Showcase">
                <li>Showcase</li>
              </a>
              <a href="https://quatanghay.com/">
                <li>Quà tặng hay</li>
              </a>
              <a href="https://www.facebook.com/groups/gocvaithuhay">
                <li>Cộng đồng Hayer</li>
              </a>
              <a href="/">
                <li>Các chính sách quan trọng</li>
                {/* <Accordion>
                  <AccordionItem header="Các chính sách quan trọng" />
                  <ul>
                    <li>Membership/Loyalty</li>
                    <li>Chính sách đặt hàng trước</li>
                    <li>Membership/Loyalty</li>
                    <li>Chính sách bảo hành/đổi trả</li>
                  </ul>
                </Accordion> */}
              </a>
            </ul>
          </AccordionItem>
          <AccordionItem header="Bài viết">
            <ul className={styles.dropdown}>
              <a href="/blogs/setup-decor">
                <li>SetUp Decor</li>
              </a>
              <a href="/blogs/technology">
                <li>Công nghệ</li>
              </a>
            </ul>
          </AccordionItem>
        </Accordion>
      </nav>
    </>
  );
}
export default Navigation;
