import React, { useEffect, useRef, useState } from "react";
import styles from "./Accordion.module.scss";
import Button from "../Button";
import clsx from "clsx";
import PropTypes from "prop-types";

function Accordion({
  defaultIndex = 0,
  onChange = () => {},
  collapseOthers = true,
  trigger = "click",
  children,
}) {
  const [activeIndex, setActiveIndex] = useState([defaultIndex]);
  const buttonRefs = useRef([]);
  const accordions = React.Children.toArray(children);
  const prevIndex = useRef(defaultIndex);

  const toggleIndex = (index) => {
    if (collapseOthers) {
      setActiveIndex(activeIndex[0] === index ? [] : [index]);
    } else {
      setActiveIndex((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }
    if (prevIndex.current !== index) {
      onChange(index);
    }
    prevIndex.current = index;
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;
    const total = accordions.length;
    e.preventDefault();

    let newIndex = index;

    if (key === "ArrowRight" || key === "ArrowDown") {
      newIndex = (index + 1) % total;
      buttonRefs.current[newIndex]?.focus();
    } else if (key === "ArrowLeft" || key === "ArrowUp") {
      newIndex = (index - 1 + total) % total;
      buttonRefs.current[newIndex]?.focus();
    } else if (key === "Enter" || key === " ") {
      e.preventDefault();
      toggleIndex(index);
    }
  };

  const handleMouseEnter = (index) => {
    if (trigger === "hover" && !collapseOthers) {
      setActiveIndex((prev) => [...new Set([...prev, index])]);
    }
  };

  const handleMouseLeave = (index) => {
    if (trigger === "hover" && !collapseOthers) {
      setActiveIndex((prev) => prev.filter((i) => i !== index));
    }
  };

  return (
    <div className={styles["Accordion-container"]}>
      <div className={clsx(styles.AccordionList)}>
        {accordions.map((accordion, index) => {
          const isActive = activeIndex.includes(index);
          const header = accordion.props.header;
          const isMegaMenu = accordion.props.isMegaMenu || false;
          return (
            <div
              key={index}
              className={clsx(
                styles.accordionItem,
                isActive ? styles.active : styles.inactive,
                isMegaMenu && styles.megaMenuItem
              )}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <button
                ref={(el) => {
                  if (trigger !== "hover") {
                    buttonRefs.current[index] = el;
                  }
                }}
                className={clsx(
                  styles.btn,
                  trigger === "hover" && styles.noFocusStyle,
                  isMegaMenu && styles.megaMenuBtn
                )}
                onClick={() => {
                  if (trigger === "click") toggleIndex(index);
                }}
                onKeyDown={(e) => {
                  if (trigger !== "hover") handleKeyDown(e, index);
                }}
                tabIndex={trigger === "hover" ? -1 : 0}
              >
                {header}
                <i
                  className={clsx("fa-solid", "fa-chevron-down", styles.icon)}
                ></i>
              </button>

              {isMegaMenu ? (
                <div
                  className={clsx(
                    styles.megaMenuContent,
                    isActive && styles.active
                  )}
                >
                  {accordion.props.children}
                </div>
              ) : (
                <div
                  className={clsx(
                    styles.AccordionContent,
                    isActive ? styles.active : styles.inactive
                  )}
                >
                  {accordion.props.children}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Accordion.propTypes = {
  defaultIndex: PropTypes.number,
  onChange: PropTypes.func,
  collapseOthers: PropTypes.bool,
  trigger: PropTypes.oneOf(["click", "hover"]),
};
export default Accordion;
