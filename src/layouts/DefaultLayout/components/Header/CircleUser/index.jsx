import { useState } from "react";
import styles from "./CircleUser.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCrown,
  faTicket,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "../Logout";
import Button from "~/components/Button";
import config from "~/config";
import { useCurrentUser } from "~/Hooks/useCurrentUser";

function CircleUser() {
  const [isOpen, setIsOpen] = useState(false);
  const name = useCurrentUser()?.username;

  return (
    <>
      <div
        className={styles.wrapper}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className={styles.circleUser}>
          <FontAwesomeIcon icon={faCircleUser} />
        </button>
        <div className={`${styles.dropdown} ${isOpen ? styles.show : ""}`}>
          <div className={styles.Content}>
            <div className={styles.listItem}>
              {name ? (
                <div className={styles.item}>
                  <Link>Xin chào {name && <strong>{name}</strong>}</Link>
                </div>
              ) : (
                <Button to={config.routes.login} draculaButton>
                  ĐĂNG NHẬP NGAY
                </Button>
              )}
              <FontAwesomeIcon className={styles.crown} icon={faCrown} />

              <div className={styles.line}></div>
              <div className={styles.item}>
                <Link>Mã giảm giá đã lưu</Link>
                <FontAwesomeIcon className={styles.icon} icon={faTicket} />
                <span className={styles.new}>new</span>
              </div>
              <div className={styles.line}></div>
              <div className={styles.item}>
                <Link>Thông tin của bạn</Link>
                <FontAwesomeIcon className={styles.icon} icon={faCircleUser} />
              </div>
              <div className={styles.line}></div>
              <div className={styles.item}>
                <Link>Chính sách Loyalty</Link>
                <FontAwesomeIcon className={styles.icon} icon={faGem} />
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
