import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Account.module.scss";

import {
  faBox,
  faCircleUser,
  faCrown,
  faGem,
  faHeart,
  faHome,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import config from "@/config/index.js";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrentUser } from "@/Hooks/useCurrentUser";
import { useSelector } from "react-redux";

const menuItems = [
  {
    path: config.routes.account,
    icon: faGem,
    label: "Thông tin Loyalty",
  },
  {
    path: `${config.accountRoutes.info}`,
    icon: faCircleUser,
    label: "Thông tin cá nhân",
  },
  {
    path: `${config.accountRoutes.orders}`,
    icon: faBox,
    label: "Đơn hàng của bạn",
  },
  {
    path: `${config.accountRoutes.wishlist}`,
    icon: faHeart,
    label: "Sản phẩm yêu thích",
  },
  {
    path: `${config.accountRoutes.addresses}`,
    icon: faHome,
    label: "Địa chỉ giao hàng",
  },
  {
    path: `${config.accountRoutes.coupons}`,
    icon: faTicket,
    label: "Mã giảm giá",
    isNew: true,
  },
];

function Account() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userName = currentUser?.username;

  return (
    <div className={styles.wrapper}>
      <div className={styles.Account}>
        <aside className={styles.sideBar}>
          <div className="userInfo">
            <p>
              {userName && (
                <span>
                  Xin chào, <strong>{userName}</strong>
                </span>
              )}
              <FontAwesomeIcon className={styles.crown} icon={faCrown} />
            </p>
          </div>
          <nav className={styles["account-menu"]}>
            <ul>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={
                    location.pathname === item.path ? styles.active : ""
                  }
                >
                  <FontAwesomeIcon className={styles.icon} icon={item.icon} />
                  <Link
                    to={
                      item.label === "Thông tin cá nhân"
                        ? `${item.path.split(":")[0]}${userName}`
                        : item.path
                    }
                    className={styles.menuItem}
                  >
                    {item.label}
                    {item.isNew && <span className={styles.newTag}>Mới</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className={styles["account-content"]}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Account;
