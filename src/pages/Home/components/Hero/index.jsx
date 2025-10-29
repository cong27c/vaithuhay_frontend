import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import clsx from "clsx";
import { SliderButton } from "@/components/SliderControls";
import { getCollections } from "@/Services/collectionService";

const slides = [
  "https://theme.hstatic.net/1000069970/1001119059/14/slideshow_1_2048x2048.jpg?v=7246",
  "https://theme.hstatic.net/1000069970/1001119059/14/slideshow_2_2048x2048.jpg?v=7246",
  "https://theme.hstatic.net/1000069970/1001119059/14/slideshow_3_2048x2048.jpg?v=7246",
];

const partnerList = [
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_1.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_2.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_3.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_4.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_5.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_6.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_7.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_8.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_9.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_10.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_11.png?v=7246",
  },
  {
    link: "#!",
    image:
      "https://theme.hstatic.net/1000069970/1001119059/14/img_vendor_12.png?v=7246",
  },
];

function Hero() {
  const [isOpen, setIsOpen] = useState("category");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // ✅ State cho danh mục
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Gọi API để lấy danh mục collections
  const fetchData = async () => {
    try {
      const response = await getCollections();
      setCategories(response || []);
    } catch (err) {
      console.error("Lỗi khi lấy collections:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Gọi API khi component mount
  useEffect(() => {
    fetchData();
  }, []);

  const changeSlide = (index) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsFading(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handlePrev = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    changeSlide(nextIndex);
  };

  return (
    <div className={styles.hero}>
      <div className={styles.sectionContainer}>
        {/* ---------- LEFT SECTION ---------- */}
        <div className={styles.sectionLeft}>
          <div className={styles.toggleTab}>
            <span
              className={clsx(
                styles.toggleBtn,
                isOpen === "category" ? styles.isActive : "",
              )}
              onClick={() => setIsOpen("category")}
            >
              Danh mục
            </span>
            <span
              className={clsx(
                styles.toggleBtn,
                isOpen === "partner" ? styles.isActive : "",
              )}
              onClick={() => setIsOpen("partner")}
            >
              Đối tác
            </span>
          </div>

          <div className={styles.content}>
            {isOpen === "category" && (
              <div className={styles.contentCategory}>
                {loading ? (
                  <p>Đang tải danh mục...</p>
                ) : (
                  <ul className={styles.listItem}>
                    {categories.map((item, index) => (
                      <li key={index} className={styles.item}>
                        <div className={styles.image}>
                          <img src={item.image} alt="" />
                        </div>
                        <a href={item.link}>{item.desc}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {isOpen === "partner" && (
              <div className={styles.contentPartner}>
                <div className={styles.listPartner}>
                  {partnerList.map((item, index) => (
                    <div key={index} className={styles.partner}>
                      <a href={item.link}>
                        <img src={item.image} alt="" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ---------- RIGHT SECTION (SLIDESHOW) ---------- */}
        <div className={styles.sectionRight}>
          <div className={styles.slideShow}>
            <SliderButton
              fontSize="36px"
              direction="left"
              width="100px"
              height="100px"
              position={{
                left: "0%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={handlePrev}
            />

            <div
              className={clsx(styles.image, {
                [styles["fade-out"]]: isFading,
              })}
            >
              <img
                src={slides[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
              />
            </div>

            <SliderButton
              fontSize="36px"
              direction="right"
              width="100px"
              height="100px"
              position={{
                right: "0%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
