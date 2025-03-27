import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Account.module.scss";
import Loyalty from "./Loyalty";
import {
  faBox,
  faCircleUser,
  faCrown,
  faGem,
  faHeart,
  faHome,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
// import UserInfo from "./UserInfo";
// import YourOrder from "./YourOrder";

function Account() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.Account}>
        <aside className={styles.sideBar}>
          <div className="userInfo">
            <p>
              Xin chào, <strong>Nguyễn Công</strong>
              <FontAwesomeIcon className={styles.crown} icon={faCrown} />
            </p>
          </div>
          <nav className={styles["account-menu"]}>
            <ul>
              <li className={styles.active}>
                <FontAwesomeIcon className={styles.icon} icon={faGem} />
                Thông tin Loyalty
              </li>
              <li>
                <FontAwesomeIcon className={styles.icon} icon={faCircleUser} />
                Thông tin cá nhân
              </li>
              <li>
                <FontAwesomeIcon icon={faBox} className={styles.icon} />
                Đơn hàng của bạn
              </li>
              <li>
                <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                Sản phẩm yêu thích
              </li>
              <li>
                <FontAwesomeIcon icon={faHome} className={styles.icon} />
                Địa chỉ giao hàng
              </li>
              <li className={styles.new}>
                <FontAwesomeIcon className={styles.icon} icon={faTicket} />
                Mã giảm giá
              </li>
            </ul>
          </nav>
        </aside>
        <main className={styles["account-content"]}>
          <Loyalty />
          {/* <UserInfo /> */}
          {/* <YourOrder /> */}
        </main>
      </div>
    </div>
  );
}

export default Account;
