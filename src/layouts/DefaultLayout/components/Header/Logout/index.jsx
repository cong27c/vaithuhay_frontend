import styles from "./Logout.module.scss";
import config from "@/config";
import { useNavigate } from "react-router-dom";
import {
  faRightToBracket,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "@/features/auth/authAsync";

function Logout() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const user = currentUser?.username;

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate(config.routes.home);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      {user ? (
        <Button
          draculaButton
          size="large"
          icon={faSignOutAlt}
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      ) : (
        <Button
          to={config.routes.login}
          draculaButton
          size="large"
          icon={faRightToBracket}
        >
          Đăng nhập
        </Button>
      )}
    </div>
  );
}

export default Logout;
