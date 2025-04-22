import styles from "./Logout.module.scss";
import config from "~/config";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutUser } from "~/Services/authServices";
import {
  faRightToBracket,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "~/features/auth/authSlice";

function Logout() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");
      dispatch(logoutSuccess());
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
