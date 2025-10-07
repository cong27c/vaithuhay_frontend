import { Outlet } from "react-router-dom";
import styles from "./authLayout.module.scss";

const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
