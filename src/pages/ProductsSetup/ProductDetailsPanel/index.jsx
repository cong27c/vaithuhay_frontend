import BlockRenderer from "@/components/ProductBlocks/BlockRenderer";
import styles from "./ProductDetailsPanel.module.scss";
import ModalTrigger from "@/components/ModalTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

function ProductDetailsPanel({
  currentProduct,
  products,
  onClose,
  onSelectProduct,
}) {
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
            <BlockRenderer blocks={currentProduct.detailBlocks} />
          </div>
          <div className={styles.listBtn}>
            <ModalTrigger
              trigger={
                <button className={styles.seeMore}>
                  <span>XEM THÊM</span>
                </button>
              }
              products={products}
              renderContent={(product) => (
                <BlockRenderer blocks={product.detailBlocks} />
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
            <div className={styles.listItem}>
              {products.map((item, index) => (
                <div
                  className={styles.item}
                  key={item.id}
                  onClick={() => {
                    if (item.id !== currentProduct.id) {
                      onSelectProduct(index);
                    }
                  }}
                >
                  <img src={item.mainImage} alt="" />
                </div>
              ))}
            </div>
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
