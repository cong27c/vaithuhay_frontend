import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Account.module.scss";
import Loyalty from "./Loyalty";
import UserInfo from "./UserInfo";
import YourOrder from "./YourOrder";

function Account() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.Account}>
        <aside className={styles.sideBar}>
          <div className="userInfo">
            <p>
              Xin chào, <strong>Nguyễn Công</strong>
              <FontAwesomeIcon className={styles.crown} icon="crown" />
            </p>
          </div>
          <nav className={styles["account-menu"]}>
            <ul>
              <li className={styles.active}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={["fas", "gem"]}
                />
                Thông tin Loyalty
              </li>
              <li>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={["fas", "circle-user"]}
                />
                Thông tin cá nhân
              </li>
              <li>
                <FontAwesomeIcon
                  icon={["fas", "box"]}
                  className={styles.icon}
                />
                Đơn hàng của bạn
              </li>
              <li>
                <FontAwesomeIcon
                  icon={["fas", "heart"]}
                  className={styles.icon}
                />
                Sản phẩm yêu thích
              </li>
              <li>
                <FontAwesomeIcon
                  icon={["fas", "home"]}
                  className={styles.icon}
                />
                Địa chỉ giao hàng
              </li>
              <li className={styles.new}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={["fas", "ticket"]}
                />
                Mã giảm giá
              </li>
            </ul>
          </nav>
        </aside>
        <main className={styles["account-content"]}>
          {/* <Loyalty /> */}
          {/* <UserInfo /> */}
          {/* <YourOrder /> */}
        </main>
      </div>
    </div>
  );
}

export default Account;
