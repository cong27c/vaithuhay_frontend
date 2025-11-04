"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import styles from "./Dropdown.module.scss";

const Dropdown = ({ label, options, onSelect, defaultValue = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (value) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span>{selected || label}</span>
        <ChevronDown
          size={18}
          className={`${styles.icon} ${isOpen ? styles.open : ""}`}
        />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {options?.map((option) => (
            <button
              key={option.value}
              className={`${styles.item} ${selected === option.value ? styles.active : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
