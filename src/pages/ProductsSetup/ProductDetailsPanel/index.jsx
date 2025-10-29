import BlockRenderer from "@/components/ProductBlocks/BlockRenderer";
import styles from "./ProductDetailsPanel.module.scss";
import ModalTrigger from "@/components/ModalTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

function ProductDetailsPanel({
  currentProduct,
  products,
  onClose,
  onSelectProduct,
}) {
  const currentIndex = products.findIndex(
    (product) => product.combo_id === currentProduct.id,
  );
  const handleSlideClick = (index) => {
    if (products[index].combo_id !== currentProduct.id) {
      onSelectProduct(index);
    }
  };

  return (
    <div className={styles.bodyRight}>
      <div className={styles.headerSection}>
        <div className={styles.topSection}>
          <div className={styles.containerTop}>
            <div className={styles.title}>GÓC GAMING RGB</div>
            <div className={styles.author}>
              Created by: <strong>Bùi Sơn Tâm</strong>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ✖
          </button>
        </div>

        <div className={styles.midSection}>
          <div className={styles.suggestSetup}>
            <BlockRenderer blocks={currentProduct?.description} />
          </div>
          <div className={styles.listBtn}>
            <ModalTrigger
              trigger={
                <button className={styles.seeMore}>
                  <span>XEM THÊM</span>
                </button>
              }
              products={currentProduct ? [currentProduct] : []}
              renderContent={(product) => (
                <BlockRenderer blocks={product?.description} />
              )}
            />
            <button className={styles.adviseButton}>
              <span>
                <FontAwesomeIcon icon={faFacebookMessenger} />
              </span>
              Nhận tư vấn set up góc làm việc
            </button>
          </div>
        </div>

        <div className={styles.footSection}>
          <div className={styles.line}></div>
          <div className={styles.desc}>XEM THÊM GÓC LÀM VIỆC KHÁC</div>
          <div className={styles.Slider}>
            <Swiper
              modules={[Mousewheel, FreeMode]}
              spaceBetween={16}
              slidesPerView={"auto"}
              initialSlide={currentIndex}
              freeMode={{
                enabled: true,
                momentum: true,
                momentumBounce: false,
                momentumVelocityRatio: 0.5,
              }}
              mousewheel={{
                enabled: true,
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              resistance={true}
              resistanceRatio={0.85}
              className={styles.customSwiper}
            >
              {products.map((item, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={`${styles.slide} ${item.combo_id === currentProduct.id ? styles.activeSlide : ""}`}
                    onClick={() => handleSlideClick(index)}
                  >
                    <div className={styles.item}>
                      <img
                        src={item.mainImage}
                        alt={item.name || `Product ${index + 1}`}
                      />
                      {item.combo_id === currentProduct.id && (
                        <div className={styles.activeIndicator}></div>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductDetailsPanel.propTypes = {
  currentProduct: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectProduct: PropTypes.func.isRequired,
};

export default ProductDetailsPanel;
