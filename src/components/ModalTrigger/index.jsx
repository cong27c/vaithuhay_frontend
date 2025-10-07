import { useState, cloneElement } from "react";
import PropTypes from "prop-types";
import styles from "./ModalTrigger.module.scss";

const ModalTrigger = ({ trigger, products, renderContent }) => {
  const [open, setOpen] = useState(false);

  const openModal = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      {cloneElement(trigger, { onClick: openModal })}

      {open && (
        <div className={styles.overlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            {products.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <h2>{product.name}</h2>
                {renderContent ? renderContent(product) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

ModalTrigger.propTypes = {
  trigger: PropTypes.element.isRequired,
  renderContent: PropTypes.func,
};

export default ModalTrigger;
