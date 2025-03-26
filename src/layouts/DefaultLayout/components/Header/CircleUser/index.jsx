import { useState } from "react";
import styles from "./CircleUser.module.scss";
import Logout from "../Logout";

function CircleUser() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={styles.wrapper}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className={styles.circleUser}>
          <i className="fa-solid fa-circle-user"></i>
        </button>
        <div className={`${styles.dropdown} ${isOpen ? styles.show : ""}`}>
          <p>Thông tin tài khoản</p>
          <Logout />
        </div>
      </div>
    </>
  );
}

export default CircleUser;
