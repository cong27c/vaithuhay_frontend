import { useState } from "react";
import styles from "./CircleUser.module.scss";
import Logout from "../Logout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <FontAwesomeIcon icon="circle-user" />
        </button>
        <div className={`${styles.dropdown} ${isOpen ? styles.show : ""}`}>
          <div className={styles.Content}>
            <div className={styles.listItem}>
              <div className={styles.item}>
                <Link>
                  Xin chào <strong>Nguyễn Công</strong>
                </Link>
                <FontAwesomeIcon className={styles.crown} icon="crown" />
              </div>

              <div className={styles.line}></div>
              <div className={styles.item}>
                <Link>Mã giảm giá đã lưu</Link>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={["fas", "ticket"]}
                />
                <span className={styles.new}>new</span>
              </div>
              <div className={styles.line}></div>
              <div className={styles.item}>
                <Link>Thông tin của bạn</Link>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={["fas", "circle-user"]}
                />
              </div>
              <div className={styles.line}></div>
              <div className={styles.item}>
                <Link>Chính sách Loyalty</Link>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={["fas", "gem"]}
                />
              </div>

              <Logout />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CircleUser;
