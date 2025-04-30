import { useEffect, useRef, useState } from "react";
import styles from "./ProductHero.module.scss";
import Button from "~/components/Button";
import { faBox, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import CountDown from "~/components/CountDown";
import ProductProgress from "../ProductProgress";

function ProductHero() {
  const allImages = [
    "https://product.hstatic.net/1000069970/product/o1cn01mfdxll27zugsvvzdr___7811.jpg_q30.jpg__e90d4a79559841a4bc4bf848b5893254_large.jpeg",
    "https://product.hstatic.net/1000069970/product/o1cn01usizqs27zuh0e8ibh___7811.jpg_q50.jpg__c151f113081844d0b1872e38906bd450_large.jpg",
    "https://product.hstatic.net/1000069970/product/tai_xuong__6__1d91d750a89d4800aecfcfc064aca5fb_large.jpg",
    "https://product.hstatic.net/1000069970/product/tai_xuong__14__df9cf00b003d4e84bd9d957a8e015673_large.jpg",
    "https://product.hstatic.net/1000069970/product/tai_xuong__19__8696a500a8b04aec813960ffdec8c58b_large.jpg",
    "https://product.hstatic.net/1000069970/product/o1cn01km0rbu27zugwqmnxd___7811.jpg_q30.jpg__c77e9e5241f6448397bab616fa94043d_large.jpeg",
  ];

  const [mainImage, setMainImage] = useState(allImages[0]);

  const mainIndex = allImages.indexOf(mainImage);

  const visibleImages = [
    ...allImages.slice(mainIndex),
    ...allImages.slice(0, mainIndex),
  ].slice(0, 5);

  const [fadeClass, setFadeClass] = useState("");

  const handleClick = (img) => {
    if (img !== mainImage) {
      setFadeClass(styles.fadeOut);
      setTimeout(() => {
        setMainImage(img);
        setFadeClass(styles.fadeIn);
      }, 200);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const descRef = useRef(null);
  const [height, setHeight] = useState("60px");

  useEffect(() => {
    if (descRef.current) {
      setHeight(isExpanded ? `${descRef.current.scrollHeight}px` : "60px");
    }
  }, [isExpanded]);

  const [index, setIndex] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerSection}>
        <nav className={styles.breadcrumb}>
          <a href="/">Trang chủ</a>
          <span>/</span>
          <a href="/danh-muc">Danh mục</a>
          <span>/</span>
          <span className={styles.current}>HÀNG CLEARANCE | NO RESTOCK</span>
        </nav>
      </div>
      <div className={styles.bodySection}>
        <div className={styles.bodyLeft}>
          <div className={styles.mainImage}>
            <img
              src={mainImage}
              alt=""
              className={fadeClass}
              onAnimationEnd={() => setFadeClass("")}
            />
          </div>
          <div className={styles.listImage}>
            {visibleImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`preview-${index}`}
                onClick={() => handleClick(img)}
                className={img === mainImage ? styles.active : styles.inactive}
              />
            ))}
          </div>
        </div>
        <div className={styles.bodyRight}>
          <div className={styles.title}>
            Shanling M0s – Máy Nghe Nhạc Hi-Res Nhỏ Gọn, Chất Âm Đỉnh Cao
          </div>
          <div className={styles.launchInfo}>
            <Button tabButton icon={faCalendarDays} className={styles.btn}>
              Dự kiến ra mắt: <strong>25/10/2025</strong>
            </Button>
            <CountDown
              targetDate={new Date("2025-05-01T23:59:59")}
              type="banner"
            />
            <Button tabButton icon={faBox} className={styles.btn}>
              Mục tiêu dự kiến: <strong>140 sản phẩm</strong>
            </Button>
          </div>
          <div className={styles.brandIn4}>
            <div className={styles.line}></div>
            <div
              ref={descRef}
              className={`${styles.desc} ${
                isExpanded ? styles.expanded : styles.collapsed
              }`}
              style={{ maxHeight: height }}
            >
              <p>
                Thương hiệu: <strong>Shanling</strong>
              </p>
              <p>
                Shanling là một thương hiệu âm thanh cao cấp của Trung Quốc, nổi
                tiếng với các thiết bị như máy nghe nhạc Hi-Fi, tai nghe, ampli
                và DAC. Được thành lập từ năm 1988, Shanling không ngừng đổi
                mới, kết hợp công nghệ tiên tiến với thiết kế tinh tế để mang
                đến trải nghiệm âm thanh chất lượng cao. Sản phẩm của hãng được
                đánh giá cao bởi giới audiophile nhờ âm thanh chi tiết, hiệu
                suất ổn định và độ bền vượt trội.
              </p>
              <div className={styles.image}>
                <img
                  src="https://file.hstatic.net/1000069970/file/brand.jpg"
                  alt=""
                />
              </div>
            </div>
            <button
              className={styles.toggleButton}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "▲" : "▼"}
            </button>
          </div>
          <div className={styles.titleBtn}>
            <div className={styles.title}>Tiêu đề: </div>
            <div className={styles.listBtn}>
              <Button tabButton className={styles.btn}>
                Blocky USB Hub | NK2
              </Button>
              <Button tabButton className={styles.btn}>
                Blocky USB Hub | NK6
              </Button>
            </div>
          </div>
          <div className={styles.productActions}>
            <div className={styles.quantityControl}>
              <button
                className={styles["quantity-btn"]}
                onClick={() => setIndex(Math.max(0, index - 1))}
                disabled={index <= 0}
              >
                -
              </button>
              <input
                type="number"
                className={styles.quantityInput}
                value={index}
                min="0"
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setIndex(Math.max(0, value));
                }}
              />
              <button
                className={styles["quantity-btn"]}
                onClick={() => setIndex(index + 1)}
              >
                +
              </button>
            </div>
            <div className={styles.cartIcon}>
              <img
                src="https://theme.hstatic.net/1000069970/1001119059/14/cro_addcart_img.png?v=7221"
                alt=""
              />
            </div>
            <div className={styles.button}>
              <Button tabButton>Mua ngay</Button>
            </div>
          </div>
        </div>
      </div>
      <ProductProgress />
    </div>
  );
}

export default ProductHero;
