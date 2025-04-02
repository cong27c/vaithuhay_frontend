import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Address.module.scss";
import {
  faCircleUser,
  faHome,
  faPen,
  faPhone,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function Address() {
  return (
    <div className={styles.Address}>
      <div className={styles.header}>
        <div className={styles.in4}>
          <div className={styles.boxIn4}>
            <span>
              <FontAwesomeIcon className={styles.icon} icon={faCircleUser} />
            </span>
            Nguyễn Công
          </div>
          <div className={styles.boxIn4}>
            <span>
              <FontAwesomeIcon className={styles.icon} icon={faHome} />
            </span>
            Hà Nội
          </div>
          <div className={styles.boxIn4}>
            <span>
              <FontAwesomeIcon className={styles.icon} icon={faPhone} />
            </span>
            0987123jqk
          </div>
        </div>
        <div className={styles.listBtn}>
          <span className={styles.btn}>
            <FontAwesomeIcon icon={faPen} />
          </span>
          <span className={styles.btn}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.addBtn}>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>{" "}
          Bổ sung địa chỉ
        </div>
      </div>
    </div>
  );
}

export default Address;
