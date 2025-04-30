import React, { useState, useRef } from "react";
import styles from "./Accordion.module.scss";

import clsx from "clsx";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordionItem}>
      {/* Button with icon ▼/▲ */}
      <button
        className={clsx(styles.accordionButton, isOpen && styles.isActive)}
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span className={styles.accordionIcon}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* The content with dynamic height */}
      <div
        ref={contentRef}
        className={clsx(styles.accordionContent, isOpen && styles.open)}
        style={{
          height: isOpen ? `${contentRef.current.scrollHeight}px` : "0px", // Dynamically set height
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Accordion = ({ children, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState([]);

  const handleItemClick = (title) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(title)
          ? prev.filter((item) => item !== title)
          : [...prev, title];
      } else {
        return prev.includes(title) ? [] : [title];
      }
    });
  };

  return (
    <div className={styles.accordionWrapper}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen: openItems.includes(child.props.title),
            onClick: () => handleItemClick(child.props.title),
          });
        }
        return child;
      })}
    </div>
  );
};

export { Accordion, AccordionItem };
