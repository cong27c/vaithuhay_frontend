import {
  Accordion,
  AccordionItem,
} from "@/components/AccordionPremium/Accordion";
import styles from "./ProductInfoLayout.module.scss";
import BlockRenderer from "@/components/ProductBlocks/BlockRenderer";
import Button from "@/components/Button";
import CartIcon from "@/layouts/DefaultLayout/components/Header/CartIcon";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

//common
/**
 * THÔNG TIN SẢN PHẨM
 * NHỮNG CÂU HỎI THƯỜNG GẶP
 * CHÍNH SÁCH ĐỔI TRẢ VÀ BẢO HÀNH
 * HÌNH ẢNH/VIDEO
 */
function ProductInfoLayout({ blogsProduct, specifications }) {
  const products = [
    {
      id: 1,
      name: "Cheerdots2 – Tích Hợp AI, Touchpad Đa Năng và Trình Chiếu Chuyên Nghiệp ",
      price: 250000,
      detailBlocks: [
        {
          type: "text",
          content:
            "**Cheerdots2** không chỉ đơn thuần là một con chuột máy tính bình thường, mà là một phụ kiện nghệ đa năng, mang đến trải nghiệm làm việc cực kỳ tiện lợi. ",
        },
        { type: "video", src: "https://www.youtube.com/embed/7PFgZK3bcy4" },
        {
          type: "image",
          src: "https://file.hstatic.net/1000069970/file/6a0f48436f03bf48e8c7f28f9f150b4c_1024x1024.jpg",
          alt: "Cheerdots2",
        },
        {
          type: "image",
          src: "https://file.hstatic.net/1000069970/file/2_176906f835f04846ac64fe366ba93e6e_1024x1024.png",
          alt: "Cheerdots2",
        },
        {
          type: "subTitle",
          content: "Thiết Kế 2 Trong 1 Từ Tính ",
        },
        {
          type: "text",
          content:
            "**Cheerdots2** không chỉ đơn thuần là một con chuột máy tính bình thường, mà là một phụ kiện nghệ đa năng, mang đến trải nghiệm làm việc cực kỳ tiện lợi. ",
        },
        {
          type: "list",
          items: ["Chất liệu cotton", "Size M, L, XL", "Màu sắc: Trắng, Đen"],
        },
        {
          type: "table",
          data: [
            ["Size", "M, L, XL"],
            ["Màu", "Trắng, Đen"],
          ],
        },
      ],
    },
  ];
  const products1 = [
    {
      id: 1,
      name: "Cheerdots2 – Tích Hợp AI, Touchpad Đa Năng và Trình Chiếu Chuyên Nghiệp ",
      price: 250000,
      detailBlocks: [
        {
          type: "table",
          data: [
            ["Kích thước sản phẩm", "60x41x16mm"],
            ["Trọng lượng", "70g (±3g)"],
            ["Điện áp đầu vào", "4.2V"],
            ["Dòng điện làm việc", "≤75mA"],
            ["Dung lượng pin", "450mAh"],
            ["Thời gian sử dụng", "~20 ngày"],
            ["Môi trường hoạt động    ", "-10°C ~ 40°C (14°F ~ 104°F)"],
          ],
        },
      ],
    },
  ];

  const listItem = [
    {
      name: "Chuột Công Thái Học ProtoArc EMTI NL -...",
      price: "850.200đ",
      originalPrice: "1.700.000đ",
      discount: "50%",
      image:
        "https://product.hstatic.net/1000069970/product/8_f05aa6707a80412db3544e68c4bb8cbb_large.jpg",
    },
    {
      name: "Chuột CHEBRY AI Thông Minh - 110...",
      price: "1,550,400đ",
      originalPrice: "2,200.000đ",
      discount: "25%",
      image:
        "https://product.hstatic.net/1000069970/product/8_f05aa6707a80412db3544e68c4bb8cbb_large.jpg",
    },
    {
      name: "Chuột Magic Wwu WM103 hô trọ hệ điều...",
      price: "600,000đ",
      image:
        "https://product.hstatic.net/1000069970/product/8_f05aa6707a80412db3544e68c4bb8cbb_large.jpg",
    },
    {
      name: "Combo Cáp Type-C RGB 60W x Lót chuột...",
      price: "679,000đ",
      image:
        "https://product.hstatic.net/1000069970/product/8_f05aa6707a80412db3544e68c4bb8cbb_large.jpg",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionLeft}>
        <Accordion>
          {blogsProduct?.map((blog, index) => (
            <AccordionItem key={index} title={blog.title}>
              <div className={styles.productItem}>
                <BlockRenderer blocks={blog.contentHtml} />
              </div>
            </AccordionItem>
          ))}
        </Accordion>
        <AccordionItem title={"HÌNH ẢNH / VIDEO"}>
          <div className={styles.productItem}>...images</div>
        </AccordionItem>
      </div>
      <div className={styles.sectionRight}>
        {specifications && (
          <Accordion>
            <AccordionItem title="THÔNG SỐ KỸ THUẬT">
              <div className={styles.productItem}>
                <BlockRenderer blocks={specifications} />
              </div>
            </AccordionItem>
          </Accordion>
        )}
        <div className={styles.PromoBanner}>
          <div className={styles.title}>
            RỦ THÊM BẠN | <strong>2 SẢN PHẨM</strong>
          </div>
          <div className={styles.content}>
            <div className={styles.originalPrice}>936,00đ</div>
            <div className={styles.discountBox}>
              <div className={styles.discountedPrice}>1,040,000đ</div>
              <div className={styles.discount}>-10%</div>
            </div>
            <Button tabButton icon={faShoppingCart}>
              MUA NGAY
            </Button>
          </div>
        </div>
        <div className={styles["related-products"]}>
          <h2 className={styles["section-title"]}>SẢN PHẨM LIÊN QUAN</h2>
          <div className={styles["product-list"]}>
            {listItem.map((product, index) => (
              <div key={index} className={styles["product-card"]}>
                <div className={styles.image}>
                  <img src={product.image} alt="" />
                </div>
                <div className={styles.content}>
                  <h3 className={styles["product-name"]}>{product.name}</h3>
                  <div className={styles["product-price"]}>
                    <span className={styles["current-price"]}>
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className={styles["original-price"]}>
                          {product.originalPrice}
                        </span>
                        <span className={styles.discount}>
                          {product.discount}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoLayout;
