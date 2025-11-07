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
function ProductInfoLayout({ blogsProduct, specifications, relatedProducts }) {
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
        {/* <div className={styles.PromoBanner}>
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
        </div> */}
        <div className={styles["related-products"]}>
          <h2 className={styles["section-title"]}>SẢN PHẨM LIÊN QUAN</h2>
          <div className={styles["product-list"]}>
            {relatedProducts?.map((product, index) => (
              <Link key={index} to={`/products/${product.slug}`}>
                <div className={styles["product-card"]}>
                  <div className={styles.image}>
                    <img src={product.image} alt="" />
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles["product-name"]}>{product.name}</h3>
                    <div className={styles["product-price"]}>
                      <span className={styles["current-price"]}>
                        {product.discount
                          ? (product.price * (1 - product.discount)).toFixed(0)
                          : product.price}
                      </span>
                      {product.discount && (
                        <>
                          <span className={styles["original-price"]}>
                            {product.price}
                          </span>
                          <span className={styles.discount}>
                            -{Math.round(product.discount * 100)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoLayout;
